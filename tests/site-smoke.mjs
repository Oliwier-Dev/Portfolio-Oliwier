import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ignoredDirs = new Set(['node_modules', '.git']);
const htmlFiles = [];
const jsFiles = [];

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

if (htmlFiles.length !== 12) failures.push(`Expected 12 HTML pages, found ${htmlFiles.length}`);

for (const file of htmlFiles) {
  const source = readFileSync(file, 'utf8');
  const label = relative(root, file);
  if (!/<title>[^<]+<\/title>/i.test(source)) failures.push(`${label}: missing title`);
  if (!/<meta\s+name=["']description["'][^>]+content=["'][^"']+/i.test(source)) failures.push(`${label}: missing meta description`);

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
  .filter((file) => !file.includes(`${join('books', 'content')}`))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');

for (const pattern of [/16[- ]?year/gi, /16 years old/gi, /cdn\.tailwindcss\.com/gi, /network-background/gi, /switchThemeBtn/gi]) {
  if (pattern.test(portfolioSources)) failures.push(`Forbidden active-page pattern: ${pattern}`);
}

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
