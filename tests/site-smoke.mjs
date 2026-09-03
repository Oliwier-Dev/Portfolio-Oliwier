import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ignoredDirs = new Set(['node_modules', '.git']);
const htmlFiles = [];
const jsFiles = [];
const siteOrigin = 'https://oliwier-mako.vercel.app';

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    if (entry.isFile() && extname(entry.name) === '.html') htmlFiles.push(fullPath);
    if (entry.isFile() && extname(entry.name) === '.js') jsFiles.push(fullPath);
  }
}

walk(root);
const failures = [];
const canonicalUrls = new Set();
const indexableUrls = new Set();

if (htmlFiles.length !== 17) failures.push(`Expected 17 HTML pages, found ${htmlFiles.length}`);

for (const file of htmlFiles) {
  const source = readFileSync(file, 'utf8');
  const label = relative(root, file);
  if (!/<title>[^<]+<\/title>/i.test(source)) failures.push(`${label}: missing title`);
  if (!/<meta\s+name=["']description["'][^>]+content=["'][^"']+/i.test(source)) failures.push(`${label}: missing meta description`);
  if (!/<meta\s+name=["']author["'][^>]+content=["']Oliwier Makowski Trusz["']/i.test(source)) failures.push(`${label}: missing canonical author identity`);

  const canonical = source.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
  if (!canonical?.startsWith(`${siteOrigin}/`)) failures.push(`${label}: missing absolute production canonical`);
  else if (canonicalUrls.has(canonical)) failures.push(`${label}: duplicate canonical ${canonical}`);
  else canonicalUrls.add(canonical);

  const robots = source.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i)?.[1] || '';
  if (!/noindex/i.test(robots) && canonical) indexableUrls.add(canonical);

  for (const match of source.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch {
      failures.push(`${label}: invalid JSON-LD`);
    }
  }

  const ids = [...source.matchAll(/\sid=["']([^"']+)["']/gi)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) failures.push(`${label}: duplicate ids ${[...new Set(duplicates)].join(', ')}`);

  for (const match of source.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const value = decodeURIComponent(match[1].split(/[?#]/)[0]);
    if (!value || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(value) || value.startsWith('/_vercel/')) continue;
    const target = value.startsWith('/') ? join(root, value.slice(1)) : resolve(dirname(file), value);
    if (!existsSync(target)) failures.push(`${label}: missing local reference ${match[1]}`);
  }
}

const portfolioSources = htmlFiles
  .filter((file) => !file.includes(`${join('legal', '')}`) && !file.includes(`${join('books', 'content')}`))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');

for (const pattern of [/\b(?:1[5-9]|twenty)[- ]?(?:year|years)[- ]?old\b/gi, /cdn\.tailwindcss\.com/gi, /network-background/gi, /switchThemeBtn/gi, /oliwier_mako/gi, /vellaro/gi]) {
  if (pattern.test(portfolioSources)) failures.push(`Forbidden active-page pattern: ${pattern}`);
}

const home = readFileSync(join(root, 'index.html'), 'utf8');
for (const required of ['Northline Cycle Works', 'Ask Oliwier', 'https://www.instagram.com/oliwiermako/']) {
  if (!home.includes(required)) failures.push(`Homepage missing required content: ${required}`);
}
for (const required of ['Oliwier Makowski Trusz', 'Oliwier Mako', '"@type": "ProfilePage"', '"@type": "Person"']) {
  if (!home.includes(required)) failures.push(`Homepage missing branded SEO signal: ${required}`);
}
if (!/<span class="hero-name hero-name--first">Oliwier<\/span>\s+<span class="hero-name hero-name--last">Mako<\/span>/i.test(home)) failures.push('Homepage name does not preserve a searchable word boundary');

const robotsPath = join(root, 'robots.txt');
const sitemapPath = join(root, 'sitemap.xml');
const llmsPath = join(root, 'llms.txt');
if (!existsSync(robotsPath) || !existsSync(sitemapPath) || !existsSync(llmsPath)) failures.push('Missing robots.txt, sitemap.xml, or llms.txt discovery surface');
else {
  const robotsSource = readFileSync(robotsPath, 'utf8');
  const sitemapSource = readFileSync(sitemapPath, 'utf8');
  const llmsSource = readFileSync(llmsPath, 'utf8');
  if (!robotsSource.includes(`Sitemap: ${siteOrigin}/sitemap.xml`) || !/Disallow:\s*\/api\//i.test(robotsSource)) failures.push('robots.txt is missing its sitemap declaration or API exclusion');
  const sitemapUrls = new Set([...sitemapSource.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
  for (const url of indexableUrls) if (!sitemapUrls.has(url)) failures.push(`sitemap.xml missing indexable canonical: ${url}`);
  for (const url of sitemapUrls) if (!indexableUrls.has(url)) failures.push(`sitemap.xml exposes a noindex or unknown URL: ${url}`);
  if (!llmsSource.includes('Oliwier Makowski Trusz') || !llmsSource.includes('Oliwier Mako')) failures.push('llms.txt is missing the full-name/public-name identity link');
}

const workIndex = readFileSync(join(root, 'other-pages', 'my-projects', 'index.html'), 'utf8');
for (const hiddenProject of ['Task Tracker', 'Reddit Client', 'Temperature Converter', 'Flash Cards Quiz']) {
  if (workIndex.includes(hiddenProject)) failures.push(`Work index exposes hidden earlier build: ${hiddenProject}`);
}

const assistantScript = readFileSync(join(root, 'other-pages', 'my-projects', 'ai-chat-project', 'script.js'), 'utf8');
if (/kb\.json|keyword|rankedarray/i.test(assistantScript)) failures.push('Ask Oliwier still contains simulated keyword-answer logic');
const assistantPage = readFileSync(join(root, 'other-pages', 'my-projects', 'ai-chat-project', 'index.html'), 'utf8');
const assistantStyles = readFileSync(join(root, 'other-pages', 'my-projects', 'ai-chat-project', 'style.css'), 'utf8');
if (!/\/api\/ask/i.test(assistantScript) || !/id=["']stop-button["']/i.test(assistantPage) || !/id=["']retry-button["']/i.test(assistantPage)) failures.push('Ask Oliwier is missing its live streaming controls');
if (!/id=["']send-button["'][^>]*aria-label=["']Send message["']/i.test(assistantPage) || !/class=["']icon-action send-action["']/i.test(assistantPage)) failures.push('Ask Oliwier is missing its compact accessible send control');
if (!/\.icon-action\[hidden\]\{display:none\}/i.test(assistantStyles) || !/\.composer textarea:focus-visible\{outline:0!important\}/i.test(assistantStyles)) failures.push('Ask Oliwier composer does not preserve hidden controls or its integrated focus ring');
if (!/\.message--user\{[^}]*padding:14px 18px/i.test(assistantStyles) || !/\.message--user p\{margin:0\}/i.test(assistantStyles)) failures.push('Ask Oliwier user messages do not preserve compact bubble spacing');
if (/localStorage|sessionStorage|innerHTML|insertAdjacentHTML/i.test(assistantScript)) failures.push('Ask Oliwier uses forbidden persistence or unsafe HTML rendering');

const askApiPath = join(root, 'api', 'ask.js');
if (!existsSync(askApiPath)) failures.push('Missing Ask Oliwier server endpoint');
else {
  const askApi = readFileSync(askApiPath, 'utf8');
  for (const required of ['openai/gpt-oss-120b', 'max_completion_tokens: 2048', "reasoning_effort: 'medium'", 'GROQ_API_KEY', 'public-profile.json']) {
    if (!askApi.includes(required)) failures.push(`Ask API missing contract value: ${required}`);
  }
}

const secretPattern = /(?:gsk_|sk-proj-)[A-Za-z0-9_-]{20,}/;
for (const file of jsFiles) {
  if (secretPattern.test(readFileSync(file, 'utf8'))) failures.push(`${relative(root, file)}: possible committed secret`);
}

for (const page of ['index.html', 'services.html', 'restorations.html', 'workshop.html', 'contact.html']) {
  const northlinePath = join(root, 'other-pages', 'my-projects', 'northline-cycle-works', page);
  if (!existsSync(northlinePath)) failures.push(`Missing Northline route: ${page}`);
}
const northlineRoot = join(root, 'other-pages', 'my-projects', 'northline-cycle-works');
const northlineOverview = readFileSync(join(northlineRoot, 'index.html'), 'utf8');
const northlineStyles = readFileSync(join(northlineRoot, 'northline.css'), 'utf8');
const northlineScript = readFileSync(join(northlineRoot, 'northline.js'), 'utf8');
if (!/data-detail-story/i.test(northlineOverview) || !/--story-progress/i.test(northlineStyles) || !/requestAnimationFrame\(updateDetailStory\)/i.test(northlineScript)) failures.push('Northline overview is missing its inspection-story presentation or scroll motion');

for (const file of jsFiles) {
  if (file.includes(`${join('node_modules', '')}`)) continue;
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (error) {
    failures.push(`${relative(root, file)}: JavaScript syntax check failed\n${error.stderr?.toString() || ''}`);
  }
}

if (failures.length) {
  console.error(`Site checks failed (${failures.length}):\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(`Site checks passed: ${htmlFiles.length} HTML pages, ${jsFiles.length} JavaScript files.`);
