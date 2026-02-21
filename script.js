// ===== UI ELEMENTS =====
const ui = {
    switchThemeBtn:     document.getElementById('switchThemeBtn'),
    viewMyWorkBtn:      document.getElementById('second-CTA-Btn-element'),
    arrowScroll:        document.getElementById('arrow-scroll-container'),
    toggleElements:     document.querySelectorAll('.toggle-nav-element'),
    whatIDOSection:     document.getElementById('what-I-Do-Section'),
    myWorkHeading:      document.getElementById('my-work-heading'),
    favicon:            document.getElementById('site-favicon')
};

// ===== ICONS =====
const sunSVG = `<svg class="theme-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="24" height="24" aria-hidden="true" focusable="false">
    <path d="M0 0 C0.92425781 0.87140625 1.84851563 1.7428125 2.80078125 2.640625 C17.10836046 16.80517774 24.12453792 35.4898343 25.03125 55.4375 C24.83589846 77.70757561 16.53751844 97.37389148 0.92578125 113.1640625 C-14.24914233 128.02233438 -34.70904318 136.18513875 -56 136 C-80.59986853 134.62240736 -99.4689403 124.37462309 -116.0859375 106.79296875 C-128.84886012 91.6911395 -134.97300911 70.97072554 -133.81640625 51.41015625 C-131.89190496 29.50830968 -122.13934818 11.62119391 -106 -3 C-101.14453587 -7.02811101 -96.08834215 -10.3313493 -90.4375 -13.125 C-89.75276611 -13.464104 -89.06803223 -13.80320801 -88.36254883 -14.15258789 C-58.85449194 -28.23128568 -23.6298708 -22.45016469 0 0 Z M-112.875 11.3125 C-125.92261794 28.19061128 -129.81146313 47.1661921 -128 68 C-125.33742161 87.90157119 -113.55321346 104.92916478 -97.93359375 117.00390625 C-80.24639114 129.03874052 -59.70886231 133.06730129 -38.68359375 129.33984375 C-19.39594899 124.69391472 -3.14863701 113.38478746 8 97 C18.82194822 78.94907642 22.38338595 58.55433121 17.4375 38 C10.98507066 17.61211561 -1.736241 1.30393195 -20.75 -8.8125 C-53.59396486 -24.08050528 -89.27210855 -15.80486598 -112.875 11.3125 Z " fill="currentColor" transform="translate(205,93)"/>
    <path d="M0 0 C3.97466149 0.50985547 5.8172051 1.34086723 8.48828125 4.31640625 C9.10832031 4.99445312 9.72835937 5.6725 10.3671875 6.37109375 C11.00914063 7.09425781 11.65109375 7.81742188 12.3125 8.5625 C13.6513674 10.03344136 14.99120077 11.5035041 16.33203125 12.97265625 C17.28650146 14.02670654 17.28650146 14.02670654 18.26025391 15.10205078 C20.27698847 17.30217631 22.36470907 19.41504991 24.5 21.5 C26.91297425 23.8715498 29.17229039 26.30686391 31.375 28.875 C34.11621449 32.06682509 37.00685888 35.04302977 40 38 C43.60087924 41.55736409 46.98846786 45.20012649 50.265625 49.0546875 C52.81652742 51.91583481 55.59881768 54.52476401 58.3984375 57.140625 C60.10886774 59.12639279 60.60340432 60.43912502 61 63 C58.83203125 63.83984375 58.83203125 63.83984375 56 64 C53.93770331 62.22747295 52.39171372 60.63650742 50.6875 58.5625 C49.71898711 57.44267735 48.74892775 56.32419038 47.77734375 55.20703125 C47.30538574 54.65611816 46.83342773 54.10520508 46.34716797 53.53759766 C44.57216567 51.51168891 42.68021774 49.62754123 40.75 47.75 C38.27436001 45.31437035 35.94355825 42.82756817 33.6875 40.1875 C30.77749568 36.79804417 27.67840441 33.635482 24.5 30.5 C20.76496433 26.81526785 17.22569692 23.0374407 13.82421875 19.04296875 C10.78473806 15.63901071 7.50045441 12.48180958 4.234375 9.296875 C0.4551126 5.41189897 0.4551126 5.41189897 -1 3 C-0.67 2.01 -0.34 1.02 0 0 Z " fill="currentColor" transform="translate(23,21)"/>
    <path d="M0 0 C0.495 1.485 0.495 1.485 1 3 C-4.4057884 8.4952224 -9.79247945 13.93076625 -15.65625 18.94140625 C-18.91983715 21.80792363 -22.08081861 24.77985698 -25.25 27.75 C-30.82668636 32.97404601 -36.42456205 38.1713197 -42.07421875 43.31640625 C-44.15605932 45.22591823 -46.21917854 47.14724503 -48.26953125 49.08984375 C-48.81005127 49.59749268 -49.35057129 50.1051416 -49.9074707 50.62817383 C-50.94147252 51.60003726 -51.97029477 52.57745203 -52.99291992 53.5612793 C-55.54228591 55.945062 -57.46915018 57.5836262 -61 58 C-61.7578125 55.75390625 -61.7578125 55.75390625 -62 53 C-60.3671875 50.96484375 -60.3671875 50.96484375 -57.875 48.9375 C-56.95203125 48.16019531 -56.0290625 47.38289063 -55.078125 46.58203125 C-54.57732422 46.16646973 -54.07652344 45.7509082 -53.56054688 45.32275391 C-50.83436274 43.01198018 -48.23790901 40.56209661 -45.625 38.125 C-44.5148005 37.09714016 -43.4041215 36.06979802 -42.29296875 35.04296875 C-41.46998291 34.28185791 -41.46998291 34.28185791 -40.63037109 33.50537109 C-36.59445596 29.77888821 -32.53982955 26.07274631 -28.48828125 22.36328125 C-26.47402331 20.51819983 -24.46151837 18.6712132 -22.44946289 16.82373047 C-21.44991767 15.90730584 -20.44912348 14.9922414 -19.44702148 14.07861328 C-16.91966598 11.77314552 -14.41472473 9.44938342 -11.94140625 7.0859375 C-11.44713135 6.62002197 -10.95285645 6.15410645 -10.44360352 5.67407227 C-9.08141759 4.38929112 -7.72791991 3.09531623 -6.375 1.80078125 C-4 0 -4 0 0 0 Z " fill="currentColor" transform="translate(272,26)"/>
    <path d="M0 0 C3.71936911 0.15237639 5.54962025 1.2695121 8.05859375 3.8515625 C9.19586074 5.09946973 10.3214988 6.35803908 11.4375 7.625 C12.68721678 9.00416294 13.93722478 10.38306204 15.1875 11.76171875 C15.82171875 12.4686084 16.4559375 13.17549805 17.109375 13.90380859 C20.01069338 17.1205854 22.97431921 20.27781398 25.9375 23.4375 C27.08746752 24.66905804 28.23720417 25.90083169 29.38671875 27.1328125 C33.33760084 31.36269623 37.29273278 35.58858982 41.25 39.8125 C41.89445068 40.50077881 42.53890137 41.18905762 43.20288086 41.89819336 C43.80108643 42.53635986 44.39929199 43.17452637 45.015625 43.83203125 C45.54446289 44.39639893 46.07330078 44.9607666 46.61816406 45.54223633 C47.72728872 46.71230405 48.85999649 47.85999649 50 49 C49.625 51.625 49.625 51.625 49 54 C45.14605951 53.45430931 43.72176699 51.92657212 41.25 49 C37.04612602 44.16105803 32.71846121 39.46831081 28.3125 34.8125 C26.9256021 33.34261693 25.53888464 31.87256359 24.15234375 30.40234375 C23.46253418 29.67128418 22.77272461 28.94022461 22.06201172 28.18701172 C18.82669425 24.75556797 15.59817582 21.31784865 12.375 17.875 C11.81981689 17.28436768 11.26463379 16.69373535 10.69262695 16.08520508 C9.11693541 14.40033326 7.55696976 12.70216921 6 11 C5.42926758 10.39188477 4.85853516 9.78376953 4.27050781 9.15722656 C3.71975586 8.55104492 3.16900391 7.94486328 2.6015625 7.3203125 C2.10221191 6.77906738 1.60286133 6.23782227 1.08837891 5.68017578 C0 4 0 4 0 0 Z " fill="currentColor" transform="translate(216,213)"/>
    <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C4.2256317 4.09570199 4.12108369 7.20751178 4.11352539 10.50292969 C4.11344986 11.60376892 4.11337433 12.70460815 4.11329651 13.83880615 C4.10813522 15.02121887 4.10297394 16.20363159 4.09765625 17.421875 C4.0962413 18.63699768 4.09482635 19.85212036 4.09336853 21.10406494 C4.08776988 24.98606831 4.0752176 28.86801406 4.0625 32.75 C4.05748483 35.38150958 4.05292195 38.01302007 4.04882812 40.64453125 C4.03780089 47.09637383 4.02106408 53.5481828 4 60 C2.68 60.66 1.36 61.32 0 62 C-2.64015811 59.35984189 -2.25304253 58.16377491 -2.25878906 54.48046875 C-2.26509338 53.32587158 -2.27139771 52.17127441 -2.27789307 50.98168945 C-2.2738446 49.72960693 -2.26979614 48.47752441 -2.265625 47.1875 C-2.26753845 45.90770264 -2.2694519 44.62790527 -2.27142334 43.30932617 C-2.27437382 40.59907207 -2.27007955 37.88894973 -2.26074219 35.17871094 C-2.24934753 31.70150769 -2.25590743 28.22461318 -2.26788712 24.74742126 C-2.27684425 21.43575596 -2.27057635 18.12417409 -2.265625 14.8125 C-2.26967346 13.56041748 -2.27372192 12.30833496 -2.27789307 11.01831055 C-2.27158875 9.86371338 -2.26528442 8.70911621 -2.25878906 7.51953125 C-2.25719788 6.49964111 -2.25560669 5.47975098 -2.25396729 4.42895508 C-2 2 -2 2 0 0 Z " fill="currentColor" transform="translate(149,4)"/>
    <path d="M0 0 C1.14570465 0.00141495 2.2914093 0.0028299 3.47183228 0.00428772 C7.11926928 0.00987045 10.76664415 0.02241984 14.4140625 0.03515625 C16.89192619 0.04017348 19.36979085 0.044736 21.84765625 0.04882812 C27.91147941 0.05983424 33.97526652 0.07655522 40.0390625 0.09765625 C40.6990625 1.41765625 41.3590625 2.73765625 42.0390625 4.09765625 C40.0390625 6.09765625 40.0390625 6.09765625 37.59664917 6.33816528 C36.05776535 6.33150345 36.05776535 6.33150345 34.48779297 6.32470703 C32.74621414 6.32448044 32.74621414 6.32448044 30.9694519 6.32424927 C29.71109528 6.3139267 28.45273865 6.30360413 27.15625 6.29296875 C25.87170929 6.29013885 24.58716858 6.28730896 23.26370239 6.28439331 C19.84743483 6.27675434 16.43133713 6.25710377 13.01513672 6.23498535 C9.52964577 6.21453249 6.0441274 6.2053928 2.55859375 6.1953125 C-4.28131981 6.173858 -11.1211205 6.13971896 -17.9609375 6.09765625 C-18.2909375 5.10765625 -18.6209375 4.11765625 -18.9609375 3.09765625 C-18.6309375 2.43765625 -18.3009375 1.77765625 -17.9609375 1.09765625 C-12.14622017 -0.45690064 -5.97176166 -0.02785615 0 0 Z " fill="currentColor" transform="translate(22.9609375,146.90234375)"/>
    <path d="M0 0 C1.32 0.66 2.64 1.32 4 2 C4.02531347 9.49307536 4.04285144 16.98613973 4.05493164 24.47924805 C4.05996662 27.02938245 4.06679496 29.57951395 4.07543945 32.12963867 C4.08754149 35.79086012 4.09323661 39.45204348 4.09765625 43.11328125 C4.10281754 44.2571077 4.10797882 45.40093414 4.11329651 46.579422 C4.11337204 47.64029526 4.11344757 48.70116852 4.11352539 49.79418945 C4.115746 50.72906693 4.11796661 51.6639444 4.12025452 52.62715149 C4 55 4 55 3 58 C1.515 58.495 1.515 58.495 0 59 C-2.59186836 56.40813164 -2.25285316 55.36173372 -2.25878906 51.75585938 C-2.26509338 50.66132446 -2.27139771 49.56678955 -2.27789307 48.43908691 C-2.2738446 47.25262573 -2.26979614 46.06616455 -2.265625 44.84375 C-2.26753845 43.63054077 -2.2694519 42.41733154 -2.27142334 41.1673584 C-2.27278634 38.59838657 -2.26908192 36.02940788 -2.26074219 33.46044922 C-2.2500446 29.51644496 -2.26063394 25.57289625 -2.2734375 21.62890625 C-2.27211593 19.13801982 -2.26955358 16.64713368 -2.265625 14.15625 C-2.27169769 12.37655823 -2.27169769 12.37655823 -2.27789307 10.56091309 C-2.27158875 9.46637817 -2.26528442 8.37184326 -2.25878906 7.24414062 C-2.25719788 6.27754517 -2.25560669 5.31094971 -2.25396729 4.31506348 C-2 2 -2 2 0 0 Z " fill="currentColor" transform="translate(149,235)"/>
    <path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C2.49895039 5.4311575 1.06423223 7.44373112 -2 10.625 C-5.27153789 14.11326438 -8.38597819 17.64142042 -11.375 21.375 C-15.05036577 25.92118414 -18.9064624 30.23148 -22.90039062 34.49487305 C-26.86766791 38.76137008 -30.42511938 43.2607575 -33.9296875 47.91796875 C-36.29803794 50.29972495 -37.70373812 50.70712656 -41 51 C-41 46.23869437 -40.18706669 45.53013803 -37.1875 42 C-35.95580078 40.5459375 -35.95580078 40.5459375 -34.69921875 39.0625 C-31.56278733 35.47276071 -28.33276964 31.97046477 -25.08642578 28.48022461 C-22.11375872 25.26906129 -19.30107728 21.97457911 -16.5625 18.5625 C-11.3542286 12.0853043 -5.68793198 6.0536535 0 0 Z " fill="currentColor" transform="translate(80,208)"/>
    <path d="M0 0 C1.44989319 0.00213753 1.44989319 0.00213753 2.92907715 0.00431824 C4.02361206 0.00124161 5.11814697 -0.00183502 6.24584961 -0.00500488 C8.02554138 0.00577339 8.02554138 0.00577339 9.84118652 0.01676941 C11.66100037 0.01745674 11.66100037 0.01745674 13.51757812 0.01815796 C16.08655778 0.02118342 18.65553555 0.02907842 21.2244873 0.04142761 C25.16840069 0.05966171 29.11207918 0.0619375 33.05603027 0.06169128 C35.54691773 0.06660714 38.03780359 0.07243575 40.52868652 0.07926941 C41.71514771 0.08038223 42.90160889 0.08149506 44.12402344 0.0826416 C45.21855835 0.08902145 46.31309326 0.09540131 47.4407959 0.10197449 C48.89068909 0.10769218 48.89068909 0.10769218 50.36987305 0.11352539 C52.68493652 0.24723816 52.68493652 0.24723816 54.68493652 1.24723816 C54.68493652 2.56723816 54.68493652 3.88723816 54.68493652 5.24723816 C51.68937116 6.74502084 48.62769633 6.37077808 45.34509277 6.34098816 C44.59526627 6.33740295 43.84543976 6.33381775 43.07289124 6.3301239 C33.75346775 6.26558537 24.43806651 6.00617461 15.12243652 5.74723816 C13.32100979 5.69885374 11.5195775 5.65067564 9.71813965 5.60270691 C5.37367121 5.48658435 1.02928645 5.36770984 -3.31506348 5.24723816 C-3.64506348 4.25723816 -3.97506348 3.26723816 -4.31506348 2.24723816 C-2.31506348 0.24723816 -2.31506348 0.24723816 0 0 Z " fill="currentColor" transform="translate(237.3150634765625,149.7527618408203)"/>
</svg>`;

const moonSVG = `<svg class="theme-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="24" height="24" aria-hidden="true" focusable="false">
    <path d="M0 0 C23.90249954 21.08640046 38.91425423 52.68216487 40.91015625 84.421875 C40.93980469 85.27265625 40.96945313 86.1234375 41 87 C41.03996094 87.97453125 41.07992187 88.9490625 41.12109375 89.953125 C41.87355895 125.89440408 27.90620839 158.34155776 3.25 184.1875 C-17.00594191 203.67665547 -46.03096087 219.1763328 -74.6875 219.25 C-76.12611546 219.18887522 -77.56477541 219.11610806 -79 219 C-79 215 -79 215 -77.234375 212.984375 C-76.41453125 212.24703125 -75.5946875 211.5096875 -74.75 210.75 C-47.25581983 184.18782593 -32.39107177 144.51911134 -31.6484375 106.70922852 C-31.37151364 63.62160601 -46.43424669 25.29873707 -76 -6 C-76.69480469 -6.74765625 -77.38960937 -7.4953125 -78.10546875 -8.265625 C-83.31355524 -13.6919009 -88.97671546 -18.24822962 -94.984375 -22.73828125 C-97.70061388 -24.77546041 -100.36092341 -26.86430283 -103 -29 C-102.67 -29.99 -102.34 -30.98 -102 -32 C-64.0230953 -36.80069224 -28.86226106 -24.66056826 0 0 Z M-90 -27 C-86.49615485 -23.44491032 -82.88805508 -20.03769607 -79.1875 -16.6875 C-77.59735972 -15.22979071 -76.00985977 -13.76926521 -74.42333984 -12.30761719 C-73.24216979 -11.22248051 -72.05365326 -10.14534682 -70.86328125 -9.0703125 C-41.37474804 18.74905845 -27.65838033 60.36487088 -25.87109375 99.84765625 C-25.02467664 139.96782717 -39.92624789 177.20204143 -64.77734375 208.1640625 C-66.96132797 210.75619675 -66.96132797 210.75619675 -68 213 C-36.3118508 208.19621143 -7.75301403 191.82900143 11.64526367 166.06713867 C21.98658458 151.7870465 28.90307827 136.11067311 33 119 C33.24492187 117.98679688 33.48984375 116.97359375 33.7421875 115.9296875 C39.68628465 85.39494188 32.60981392 52.71480372 15.61572266 26.89697266 C-3.51795707 -0.95683781 -30.39829468 -18.44484381 -63.3515625 -25.7421875 C-72.20503776 -27.34591875 -81.04015756 -27.1931463 -90 -27 Z " fill="currentColor" transform="translate(178,55)"/>
</svg>`;

// ===== STATE =====
let isDarkMode = false;
const THEME_STORAGE_KEY = 'portfolio-theme';
let portfolioNetwork = null;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', init);

function init() {
    initializeTheme();
    setupPortfolioNetwork();
    setupThemeSwitcher();
    setupViewMyWorkScroll();
    setupArrowScroll();
    setupToggleElements();
    setupHeroTextLoadAnimation();
    setupRoadmapTextRevealOnScroll();
}

// ===== EVENT LISTENERS =====
function setupThemeSwitcher() {
    if (ui.switchThemeBtn) {
        ui.switchThemeBtn.addEventListener('click', toggleTheme);
    }
}

function setupViewMyWorkScroll() {
    if (ui.viewMyWorkBtn) {
        ui.viewMyWorkBtn.addEventListener('click', scrollToMyWork);
    }
}

function setupArrowScroll() {
    if (ui.arrowScroll) {
        ui.arrowScroll.addEventListener('click', scrollToWhatIDo);
    }
}

function setupToggleElements() {
    ui.toggleElements.forEach(element => {
        element.addEventListener('click', handleToggleClick);
    });
}

// ===== FUNCTIONS =====
function toggleTheme() {
    isDarkMode = !isDarkMode;
    applyTheme(true);
}

function scrollToMyWork() {
    if (ui.myWorkHeading) {
        ui.myWorkHeading.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToWhatIDo() {
    if (ui.whatIDOSection) {
        ui.whatIDOSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function handleToggleClick() {
    ui.toggleElements.forEach(el => el.classList.remove('active'));
    this.classList.add('active');
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

    if (portfolioNetwork) {
        portfolioNetwork.refreshPalette();
    }

    updateFavicon();

    if (ui.switchThemeBtn) {
        if (withAnimation) {
            ui.switchThemeBtn.classList.add('theme-switching');
        }

        if (isDarkMode) {
            ui.switchThemeBtn.innerHTML = sunSVG;
            ui.switchThemeBtn.setAttribute('data-tooltip', 'Switch to light mode');
        } else {
            ui.switchThemeBtn.innerHTML = moonSVG;
            ui.switchThemeBtn.setAttribute('data-tooltip', 'Switch to dark mode');
        }

        if (withAnimation) {
            setTimeout(() => {
                ui.switchThemeBtn.classList.remove('theme-switching');
            }, 150);
        }
    }

    try {
        localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    } catch (_) {
        // Ignore storage failures and keep runtime theme state only.
    }
}

function updateFavicon() {
    if (!ui.favicon) {
        return;
    }

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

    if (!heroTextTargets.length) {
        return;
    }

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
        '#what-makes-me-different .different-section-heading, #what-makes-me-different .different-section-description'
    );

    if (!textTargets.length) {
        return;
    }

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

function setupPortfolioNetwork() {
    const canvas = document.getElementById('portfolio-network-canvas');

    if (!canvas) {
        return;
    }

    portfolioNetwork = createPortfolioNetwork(canvas);
    portfolioNetwork.init();
}

function createPortfolioNetwork(canvas) {
    const config = {
        density: 'balanced',
        connectRadius: 100,
        maxLineAlpha: 0.5,
        lineWidth: 1.0,
        mobileMode: 'static'
    };

    const densityMap = {
        balanced: { pointsPer10000px: 3.2, min: 220, max: 760 }
    };

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
        return {
            init() {},
            refreshPalette() {}
        };
    }

    const hasFinePointer = window.matchMedia('(any-pointer: fine)').matches;
    const hasCoarsePointer = window.matchMedia('(any-pointer: coarse)').matches;
    const isCoarseOnly = hasCoarsePointer && !hasFinePointer;
    const staticMobile = config.mobileMode === 'static' && isCoarseOnly;

    let dotRGB = '122, 134, 149';
    let lineRGB = '89, 103, 122';
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrame = null;
    let resizeTimer = null;
    let dots = [];

    const pointer = {
        x: 0,
        y: 0,
        active: false
    };

    function densityConfig() {
        return densityMap[config.density] || densityMap.balanced;
    }

    function refreshPalette() {
        const bodyStyles = getComputedStyle(document.body);
        dotRGB = bodyStyles.getPropertyValue('--network-dot-rgb').trim() || '122, 134, 149';
        lineRGB = bodyStyles.getPropertyValue('--network-line-rgb').trim() || '89, 103, 122';

        if (dots.length) {
            drawFrame();
        }
    }

    function setCanvasSize() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function dotCount() {
        const preset = densityConfig();
        const area = width * height;
        const calculated = Math.round((area / 10000) * preset.pointsPer10000px);
        return Math.max(preset.min, Math.min(preset.max, calculated));
    }

    function createDots() {
        const count = dotCount();
        dots = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: 1 + Math.random() * 1.4,
            alpha: 0.20 + Math.random() * 0.35,
            vx: staticMobile ? 0 : (Math.random() - 0.5) * 0.12,
            vy: staticMobile ? 0 : (Math.random() - 0.5) * 0.12
        }));
    }

    function moveDots() {
        if (staticMobile) {
            return;
        }

        for (const dot of dots) {
            dot.x += dot.vx;
            dot.y += dot.vy;

            if (dot.x < -8) dot.x = width + 8;
            if (dot.x > width + 8) dot.x = -8;
            if (dot.y < -8) dot.y = height + 8;
            if (dot.y > height + 8) dot.y = -8;
        }
    }

    function drawDots() {
        for (const dot of dots) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(${dotRGB}, ${dot.alpha})`;
            ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function drawPointerConnections() {
        if (!pointer.active || staticMobile) {
            return;
        }

        const radius = config.connectRadius;
        const radiusSq = radius * radius;

        for (const dot of dots) {
            const dx = dot.x - pointer.x;
            const dy = dot.y - pointer.y;
            const distanceSq = dx * dx + dy * dy;

            if (distanceSq > radiusSq) {
                continue;
            }

            const distance = Math.sqrt(distanceSq);
            const falloff = Math.pow(1 - distance / radius, 2);
            const alpha = config.maxLineAlpha * falloff;

            if (alpha <= 0) {
                continue;
            }

            ctx.strokeStyle = `rgba(${lineRGB}, ${alpha})`;
            ctx.lineWidth = config.lineWidth;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(dot.x, dot.y);
            ctx.stroke();
        }
    }

    function drawFrame() {
        ctx.clearRect(0, 0, width, height);
        moveDots();
        drawDots();
        drawPointerConnections();
    }

    function render() {
        drawFrame();

        if (!staticMobile) {
            animationFrame = window.requestAnimationFrame(render);
        }
    }

    function start() {
        if (animationFrame) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }

        setCanvasSize();
        createDots();
        drawFrame();

        if (!staticMobile) {
            animationFrame = window.requestAnimationFrame(render);
        }
    }

    function onResize() {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
            start();
        }, 130);
    }

    function init() {
        const clearPointer = () => {
            pointer.active = false;
        };

        const setPointer = (event) => {
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.active = true;
        };

        refreshPalette();
        start();
        window.addEventListener('resize', onResize, { passive: true });

        if (!staticMobile) {
            if ('PointerEvent' in window) {
                window.addEventListener('pointermove', (event) => {
                    if (event.pointerType === 'touch') {
                        return;
                    }

                    setPointer(event);
                }, { passive: true });

                window.addEventListener('pointerleave', clearPointer, { passive: true });
            } else {
                window.addEventListener('mousemove', setPointer, { passive: true });
                window.addEventListener('mouseout', clearPointer);
            }

            window.addEventListener('blur', clearPointer);

            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    if (animationFrame) {
                        window.cancelAnimationFrame(animationFrame);
                        animationFrame = null;
                    }
                    clearPointer();
                    return;
                }

                if (!animationFrame) {
                    animationFrame = window.requestAnimationFrame(render);
                }
            });
        }
    }

    return {
        init,
        refreshPalette
    };
}
