const menuButton=document.querySelector('.menu-button');
const mobileMenu=document.querySelector('.mobile-nav');
const cursor=document.querySelector('.cursor');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion&&'IntersectionObserver'in window)document.body.classList.add('motion-ready');
function closeMenu(){if(!menuButton||!mobileMenu)return;menuButton.setAttribute('aria-expanded','false');mobileMenu.setAttribute('aria-hidden','true');mobileMenu.classList.remove('is-open')}
function toggleMenu(){if(!menuButton||!mobileMenu)return;const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));mobileMenu.setAttribute('aria-hidden',String(!open));mobileMenu.classList.toggle('is-open',open)}
mobileMenu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
if(!reduceMotion&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.12,rootMargin:'0px 0px -7% 0px'});document.querySelectorAll('.reveal').forEach(element=>observer.observe(element))}else{document.querySelectorAll('.reveal').forEach(element=>element.classList.add('is-visible'))}
if(cursor&&window.matchMedia('(pointer: fine)').matches&&!reduceMotion){document.body.classList.add('has-cursor');window.addEventListener('pointermove',event=>{cursor.style.transform=`translate3d(${event.clientX}px, ${event.clientY}px, 0)`},{passive:true});document.querySelectorAll('.cursor-target').forEach(target=>{target.addEventListener('pointerenter',()=>cursor.classList.add('is-active'));target.addEventListener('pointerleave',()=>cursor.classList.remove('is-active'))})}
