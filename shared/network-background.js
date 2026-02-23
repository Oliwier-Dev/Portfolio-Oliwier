const THEME_STORAGE_KEY = 'portfolio-theme';
let isDarkMode = false;
let portfolioNetwork = null;

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupPortfolioNetwork();
    window.addEventListener('storage', handleThemeStorageChange);
});

function handleThemeStorageChange(event) {
    if (event.key !== THEME_STORAGE_KEY) {
        return;
    }

    isDarkMode = event.newValue === 'dark';
    applyTheme();
}

function initializeTheme() {
    try {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        isDarkMode = savedTheme === 'dark';
    } catch (_) {
        isDarkMode = false;
    }

    applyTheme();
}

function applyTheme() {
    document.body.classList.toggle('dark-mode', isDarkMode);

    if (portfolioNetwork) {
        portfolioNetwork.refreshPalette();
    }
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
        connectRadius: 110,
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
