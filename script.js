// ===== UI ELEMENTS =====
const ui = {
    switchThemeBtn:  document.getElementById('switchThemeBtn'),
    arrowScroll:     document.getElementById('arrow-scroll-container'),
    servicesSection: document.getElementById('services-section'),
    favicon:         document.getElementById('site-favicon'),
    navMobileBtn:    document.getElementById('nav-mobile-btn'),
    navMobileMenu:   document.getElementById('nav-mobile-menu'),
    siteNav:         document.getElementById('site-nav')
};

// ===== ICONS =====
const sunSVG = `<svg class="theme-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="18" height="18" aria-hidden="true" focusable="false">
    <path d="M0 0 C0.92425781 0.87140625 1.84851563 1.7428125 2.80078125 2.640625 C17.10836046 16.80517774 24.12453792 35.4898343 25.03125 55.4375 C24.83589846 77.70757561 16.53751844 97.37389148 0.92578125 113.1640625 C-14.24914233 128.02233438 -34.70904318 136.18513875 -56 136 C-80.59986853 134.62240736 -99.4689403 124.37462309 -116.0859375 106.79296875 C-128.84886012 91.6911395 -134.97300911 70.97072554 -133.81640625 51.41015625 C-131.89190496 29.50830968 -122.13934818 11.62119391 -106 -3 C-101.14453587 -7.02811101 -96.08834215 -10.3313493 -90.4375 -13.125 C-89.75276611 -13.464104 -89.06803223 -13.80320801 -88.36254883 -14.15258789 C-58.85449194 -28.23128568 -23.6298708 -22.45016469 0 0 Z M-112.875 11.3125 C-125.92261794 28.19061128 -129.81146313 47.1661921 -128 68 C-125.33742161 87.90157119 -113.55321346 104.92916478 -97.93359375 117.00390625 C-80.24639114 129.03874052 -59.70886231 133.06730129 -38.68359375 129.33984375 C-19.39594899 124.69391472 -3.14863701 113.38478746 8 97 C18.82194822 78.94907642 22.38338595 58.55433121 17.4375 38 C10.98507066 17.61211561 -1.736241 1.30393195 -20.75 -8.8125 C-53.59396486 -24.08050528 -89.27210855 -15.80486598 -112.875 11.3125 Z " fill="currentColor" transform="translate(205,93)"/>
    <path d="M0 0 C3.97466149 0.50985547 5.8172051 1.34086723 8.48828125 4.31640625 C10.3671875 6.37109375 10.3671875 6.37109375 11.3671875 7.37109375 C12.6513674 8.76344136 14.99120077 11.5035041 16.33203125 12.97265625 C18.26025391 15.10205078 18.26025391 15.10205078 20.27698847 17.30217631 C22.36470907 19.41504991 24.5 21.5 24.5 21.5 C26.91297425 23.8715498 29.17229039 26.30686391 31.375 28.875 C34.11621449 32.06682509 37.00685888 35.04302977 40 38 C43.60087924 41.55736409 46.98846786 45.20012649 50.265625 49.0546875 C52.81652742 51.91583481 55.59881768 54.52476401 58.3984375 57.140625 C60.10886774 59.12639279 60.60340432 60.43912502 61 63 C58.83203125 63.83984375 58.83203125 63.83984375 56 64 C53.93770331 62.22747295 52.39171372 60.63650742 50.6875 58.5625 C47.77734375 55.20703125 47.77734375 55.20703125 46.34716797 53.53759766 C44.57216567 51.51168891 42.68021774 49.62754123 40.75 47.75 C38.27436001 45.31437035 35.94355825 42.82756817 33.6875 40.1875 C30.77749568 36.79804417 27.67840441 33.635482 24.5 30.5 C20.76496433 26.81526785 17.22569692 23.0374407 13.82421875 19.04296875 C7.50045441 12.48180958 4.234375 9.296875 4.234375 9.296875 C0.4551126 5.41189897 0.4551126 5.41189897 -1 3 C-0.67 2.01 -0.34 1.02 0 0 Z " fill="currentColor" transform="translate(23,21)"/>
    <path d="M0 0 C0.495 1.485 0.495 1.485 1 3 C-4.4057884 8.4952224 -9.79247945 13.93076625 -15.65625 18.94140625 C-22.08081861 24.77985698 -25.25 27.75 -25.25 27.75 C-30.82668636 32.97404601 -36.42456205 38.1713197 -42.07421875 43.31640625 C-48.26953125 49.08984375 -48.26953125 49.08984375 -52.99291992 53.5612793 C-55.54228591 55.945062 -57.46915018 57.5836262 -61 58 C-61.7578125 55.75390625 -61.7578125 55.75390625 -62 53 C-60.3671875 50.96484375 -60.3671875 50.96484375 -57.875 48.9375 C-55.078125 46.58203125 -55.078125 46.58203125 -53.56054688 45.32275391 C-50.83436274 43.01198018 -48.23790901 40.56209661 -45.625 38.125 C-42.29296875 35.04296875 -42.29296875 35.04296875 -40.63037109 33.50537109 C-36.59445596 29.77888821 -32.53982955 26.07274631 -28.48828125 22.36328125 C-24.46151837 18.6712132 -22.44946289 16.82373047 -19.44702148 14.07861328 C-16.91966598 11.77314552 -14.41472473 9.44938342 -11.94140625 7.0859375 C-9.08141759 4.38929112 -7.72791991 3.09531623 -6.375 1.80078125 C-4 0 -4 0 0 0 Z " fill="currentColor" transform="translate(272,26)"/>
    <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C4.2256317 4.09570199 4.12108369 7.20751178 4.11352539 10.50292969 C4.0625 32.75 4.0625 32.75 4 60 C2.68 60.66 1.36 61.32 0 62 C-2.64015811 59.35984189 -2.25304253 58.16377491 -2.25878906 54.48046875 C-2.265625 47.1875 -2.265625 47.1875 -2.27142334 43.30932617 C-2.27437382 40.59907207 -2.27007955 37.88894973 -2.26074219 35.17871094 C-2.26788712 24.74742126 -2.26788712 24.74742126 -2.265625 14.8125 C-2.27789307 11.01831055 -2.27789307 11.01831055 -2.25878906 7.51953125 C-2 2 -2 2 0 0 Z " fill="currentColor" transform="translate(149,4)"/>
    <path d="M0 0 C1.32 0.66 2.64 1.32 4 2 C4 43.11328125 4 43.11328125 4.11352539 49.79418945 C4.115746 50.72906693 4.11796661 51.6639444 4.12025452 52.62715149 C4 55 4 55 3 58 C1.515 58.495 1.515 58.495 0 59 C-2.59186836 56.40813164 -2.25285316 55.36173372 -2.25878906 51.75585938 C-2.265625 44.84375 -2.265625 44.84375 -2.27142334 41.1673584 C-2.27278634 38.59838657 -2.26908192 36.02940788 -2.26074219 33.46044922 C-2.2734375 21.62890625 -2.2734375 21.62890625 -2.265625 14.15625 C-2.27789307 10.56091309 -2.27789307 10.56091309 -2.25878906 7.24414062 C-2 2 -2 2 0 0 Z " fill="currentColor" transform="translate(149,235)"/>
    <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C2.49895039 5.4311575 1.06423223 7.44373112 -2 10.625 C-8.38597819 17.64142042 -11.375 21.375 -11.375 21.375 C-15.05036577 25.92118414 -18.9064624 30.23148 -22.90039062 34.49487305 C-33.9296875 47.91796875 -33.9296875 47.91796875 -41 51 C-41 46.23869437 -40.18706669 45.53013803 -37.1875 42 C-34.69921875 39.0625 -34.69921875 39.0625 -31.56278733 35.47276071 C-28.33276964 31.97046477 -25.08642578 28.48022461 -22.08642578 25.48022461 C-16.5625 18.5625 -16.5625 18.5625 -11.3542286 12.0853043 C-5.68793198 6.0536535 0 0 0 0 Z " fill="currentColor" transform="translate(80,208)"/>
    <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C2.99 9.75 2.99 9.75 -3.31506348 5.24723816 C-3.64506348 4.25723816 -3.97506348 3.26723816 -4.31506348 2.24723816 C-2.31506348 0.24723816 -2.31506348 0.24723816 0 0 Z " fill="currentColor" transform="translate(237.3150634765625,149.7527618408203)"/>
    <path d="M-17.9609375 1.09765625 C-12.14622017 -0.45690064 -5.97176166 -0.02785615 0 0 C1.44989319 0.00213753 2.92907715 0.00431824 2.92907715 0.00431824 C8.02361206 0.00124161 8.02361206 0.00124161 9.84118652 0.01676941 C16.08655778 0.01745674 18.65553555 0.02907842 21.2244873 0.04142761 C33.05603027 0.06169128 33.05603027 0.06169128 40.52868652 0.07926941 C44.12402344 0.0826416 44.12402344 0.0826416 47.4407959 0.10197449 C50.36987305 0.11352539 50.36987305 0.11352539 54.68493652 1.24723816 C54.68493652 2.56723816 54.68493652 3.88723816 54.68493652 5.24723816 C51.68937116 6.74502084 48.62769633 6.37077808 45.34509277 6.34098816 C33.75346775 6.26558537 24.43806651 6.00617461 15.12243652 5.74723816 C5.37367121 5.48658435 1.02928645 5.36770984 -3.31506348 5.24723816 C-3.64506348 4.25723816 -3.97506348 3.26723816 -4.31506348 2.24723816 C-2.31506348 0.24723816 -2.31506348 0.24723816 -17.9609375 1.09765625 Z " fill="currentColor" transform="translate(22.9609375,146.90234375)"/>
</svg>`;

const moonSVG = `<svg class="theme-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="18" height="18" aria-hidden="true" focusable="false">
    <path d="M0 0 C23.90249954 21.08640046 38.91425423 52.68216487 40.91015625 84.421875 C40.93980469 85.27265625 40.96945313 86.1234375 41 87 C41.03996094 87.97453125 41.07992187 88.9490625 41.12109375 89.953125 C41.87355895 125.89440408 27.90620839 158.34155776 3.25 184.1875 C-17.00594191 203.67665547 -46.03096087 219.1763328 -74.6875 219.25 C-76.12611546 219.18887522 -77.56477541 219.11610806 -79 219 C-79 215 -79 215 -77.234375 212.984375 C-76.41453125 212.24703125 -75.5946875 211.5096875 -74.75 210.75 C-47.25581983 184.18782593 -32.39107177 144.51911134 -31.6484375 106.70922852 C-31.37151364 63.62160601 -46.43424669 25.29873707 -76 -6 C-76.69480469 -6.74765625 -77.38960937 -7.4953125 -78.10546875 -8.265625 C-83.31355524 -13.6919009 -88.97671546 -18.24822962 -94.984375 -22.73828125 C-97.70061388 -24.77546041 -100.36092341 -26.86430283 -103 -29 C-102.67 -29.99 -102.34 -30.98 -102 -32 C-64.0230953 -36.80069224 -28.86226106 -24.66056826 0 0 Z M-90 -27 C-86.49615485 -23.44491032 -82.88805508 -20.03769607 -79.1875 -16.6875 C-77.59735972 -15.22979071 -76.00985977 -13.76926521 -74.42333984 -12.30761719 C-73.24216979 -11.22248051 -72.05365326 -10.14534682 -70.86328125 -9.0703125 C-41.37474804 18.74905845 -27.65838033 60.36487088 -25.87109375 99.84765625 C-25.02467664 139.96782717 -39.92624789 177.20204143 -64.77734375 208.1640625 C-66.96132797 210.75619675 -66.96132797 210.75619675 -68 213 C-36.3118508 208.19621143 -7.75301403 191.82900143 11.64526367 166.06713867 C21.98658458 151.7870465 28.90307827 136.11067311 33 119 C33.24492187 117.98679688 33.48984375 116.97359375 33.7421875 115.9296875 C39.68628465 85.39494188 32.60981392 52.71480372 15.61572266 26.89697266 C-3.51795707 -0.95683781 -30.39829468 -18.44484381 -63.3515625 -25.7421875 C-72.20503776 -27.34591875 -81.04015756 -27.1931463 -90 -27 Z " fill="currentColor" transform="translate(178,55)"/>
</svg>`;

// ===== STATE =====
let isDarkMode = false;
const THEME_STORAGE_KEY = 'portfolio-theme';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', init);

function init() {
    initializeTheme();
    setupThemeSwitcher();
    setupArrowScroll();
    setupMobileNav();
    setupNavAnchorClose();
    setupHeroTextLoadAnimation();
    setupRoadmapTextRevealOnScroll();
    setupSectionReveal();
    setupStatsAnimation();
}

// ===== EVENT LISTENERS =====
function setupThemeSwitcher() {
    if (ui.switchThemeBtn) {
        ui.switchThemeBtn.addEventListener('click', toggleTheme);
    }
}

function setupArrowScroll() {
    if (ui.arrowScroll) {
        ui.arrowScroll.addEventListener('click', scrollToServices);
    }
}

function setupMobileNav() {
    if (!ui.navMobileBtn || !ui.navMobileMenu) return;

    ui.navMobileBtn.addEventListener('click', () => {
        const isOpen = ui.navMobileMenu.classList.toggle('is-open');
        ui.navMobileBtn.setAttribute('aria-expanded', String(isOpen));
        ui.navMobileMenu.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!ui.siteNav || ui.siteNav.contains(e.target)) return;
        closeMobileMenu();
    });
}

function setupNavAnchorClose() {
    if (!ui.navMobileMenu) return;
    const links = ui.navMobileMenu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function closeMobileMenu() {
    if (!ui.navMobileMenu) return;
    ui.navMobileMenu.classList.remove('is-open');
    if (ui.navMobileBtn) {
        ui.navMobileBtn.setAttribute('aria-expanded', 'false');
    }
    ui.navMobileMenu.setAttribute('aria-hidden', 'true');
}

// ===== FUNCTIONS =====
function toggleTheme() {
    isDarkMode = !isDarkMode;
    applyTheme(true);
}

function scrollToServices() {
    const target = ui.servicesSection;
    if (!target) return;

    const navHeight = ui.siteNav ? ui.siteNav.offsetHeight : 64;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: 'smooth' });
}

function initializeTheme() {
    try {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        isDarkMode = savedTheme === 'dark';
    } catch (_) {
        isDarkMode = false;
    }
    applyTheme(false);
}

function applyTheme(withAnimation) {
    document.body.classList.toggle('dark-mode', isDarkMode);
    updateFavicon();

    if (ui.switchThemeBtn) {
        if (withAnimation) {
            ui.switchThemeBtn.classList.add('theme-switching');
        }

        ui.switchThemeBtn.setAttribute(
            'data-tooltip',
            isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
        );

        if (withAnimation) {
            setTimeout(() => {
                ui.switchThemeBtn.classList.remove('theme-switching');
            }, 150);
        }
    }

    try {
        localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    } catch (_) {
        // Ignore storage failures.
    }
}

function updateFavicon() {
    if (!ui.favicon) return;
    ui.favicon.href = isDarkMode
        ? './images/favicon/favicon-darkmode.png'
        : './images/favicon/favicon.png';
}

function setupHeroTextLoadAnimation() {
    const heroTextTargets = document.querySelectorAll(
        '#hero-section-content #hero-section-heading-text, ' +
        '#hero-section-content #hero-section-subheading-text, ' +
        '#hero-section-content #hero-section-content-CTA-Btns-container'
    );

    if (!heroTextTargets.length) return;

    heroTextTargets.forEach(el => el.classList.add('hero-load-text'));

    requestAnimationFrame(() => {
        heroTextTargets.forEach((el, idx) => {
            setTimeout(() => {
                el.classList.add('is-visible');
            }, idx * 120);
        });
    });
}

function setupRoadmapTextRevealOnScroll() {
    const textTargets = document.querySelectorAll(
        '#what-makes-me-different .different-section-heading, ' +
        '#what-makes-me-different .different-section-description'
    );

    if (!textTargets.length) return;

    textTargets.forEach(el => el.classList.add('reveal-on-scroll-text'));

    if (!('IntersectionObserver' in window)) {
        textTargets.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
    });

    textTargets.forEach(el => observer.observe(el));
}

// ===== SECTION REVEAL ON SCROLL =====
function setupSectionReveal() {
    const sections = document.querySelectorAll('section:not(#hero-section)');
    if (!sections.length) return;

    if (!('IntersectionObserver' in window)) {
        sections.forEach(s => s.classList.add('section-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target); // animate once
            }
        });
    }, {
        threshold: 0.06,
        rootMargin: '0px 0px -40px 0px'
    });

    sections.forEach(s => observer.observe(s));
}

// ===== STATS COUNTER ANIMATION =====
function setupStatsAnimation() {
    const statsContainer = document.querySelector('#philosophy-stats');
    if (!statsContainer) return;

    const statEls = statsContainer.querySelectorAll('.phil-stat-num[data-count]');
    if (!statEls.length) return;

    if (!('IntersectionObserver' in window)) {
        statEls.forEach(el => {
            el.textContent = el.dataset.count + (el.dataset.suffix || '');
        });
        return;
    }

    let triggered = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !triggered) {
                triggered = true;
                observer.disconnect();
                statEls.forEach((el, i) => {
                    setTimeout(() => animateCount(el), i * 140);
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsContainer);
}

function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    // Scale duration by target so 16 gets full 2600ms, smaller numbers are proportionally shorter
    const duration = Math.round(2600 * Math.sqrt(target / 16));
    const startTime = performance.now();

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3.5);

        if (progress < 1) {
            // Math.floor: number only advances when fully past the threshold,
            // so 15→16 stays on 15 until the very last frame
            const current = Math.floor(eased * target);
            const blur = (1 - eased) * 3.5;
            el.style.filter = blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : '';
            el.textContent = String(current);
            requestAnimationFrame(step);
        } else {
            el.textContent = target + suffix;
            el.style.filter = '';
        }
    }

    requestAnimationFrame(step);
}
