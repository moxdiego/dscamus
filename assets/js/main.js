/*==================== IDIOMA ====================*/

var spanish = document.getElementById('fr_click'),
    english = document.getElementById('en_click'),
    fr_txt = document.querySelectorAll('#esp'),
    en_txt = document.querySelectorAll('#eng'),
    nb_fr = fr_txt.length,
    nb_en = en_txt.length;

spanish.addEventListener('click', function() {
    langue(spanish,english);
}, false);

english.addEventListener('click', function() {
    langue(english,spanish);
}, false);

function langue(langueOn,langueOff){
    if (!langueOn.classList.contains('current_lang')) {
        langueOn.classList.toggle('current_lang');
        langueOff.classList.toggle('current_lang');
    }
    if(langueOn.innerHTML == 'Esp'){
        afficher(fr_txt, nb_fr);
        cacher(en_txt, nb_en);
    }
    else if(langueOn.innerHTML == 'Eng'){
        afficher(en_txt, nb_en);
        cacher(fr_txt, nb_fr);
    }
}

function afficher(txt,nb){
    for(var i=0; i < nb; i++){
        txt[i].style.display = 'block';
    }
}
function cacher(txt,nb){
    for(var i=0; i < nb; i++){
        txt[i].style.display = 'none';
    }
}
function init(){
    langue(spanish,english);
}
init();


/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    if(this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

const canvas = document.getElementById('pcb-canvas');

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
  canvas.style.opacity = selectedTheme === 'dark' ? '0.4' : '0';
} else {
  document.body.classList.add(darkTheme)
  themeButton.classList.add(iconTheme)
  canvas.style.opacity = '0.4';
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    const isDark = document.body.classList.contains(darkTheme)
    canvas.style.opacity = isDark ? '0.4' : '0';
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== SCROLL REVEAL ANIMATION ====================*/
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '30px',
        duration: 2000,
        reset: true
    });

    sr.reveal(`.home__data, .home__img,
                .about__data, .about__img,
                .services__content, .menu__content,
                .app__data, .app__img,
                .contact__data, .contact__button,
                .footer__content`, {
        interval: 200
    });
}

/*==================== PCB CANVAS ====================*/
(function() {
  const canvas = document.getElementById('pcb-canvas');
  const ctx = canvas.getContext('2d');
  const COLOR = '#069C54';
  const NODES = 40;
  const SPEED = 0.3;
  let nodes = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initNodes() {
    nodes = [];
    for (let i = 0; i < NODES; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: Math.random() > 0.7 ? 4 : 2
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 160) {
          ctx.beginPath();
          ctx.strokeStyle = COLOR;
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = 1 - dist / 160;
          const mx = (nodes[i].x + nodes[j].x) / 2;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mx, nodes[i].y);
          ctx.lineTo(mx, nodes[j].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = COLOR;
      ctx.fill();
      if (n.r > 2) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 3, 0, Math.PI * 2);
        ctx.strokeStyle = COLOR;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.4;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });

    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initNodes(); });
  resize();
  initNodes();
  draw();
})();

/*==================== FAVICON DINAMICO CON SCROLL ====================*/
function actualizarFaviconScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
  const progreso = Math.round((scrollTop / scrollTotal) * 100);

  const r = Math.round(56 + (34 - 56) * (progreso / 100));
  const g = Math.round(189 + (197 - 189) * (progreso / 100));
  const b = Math.round(248 + (94 - 248) * (progreso / 100));
  const color = `rgb(${r},${g},${b})`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="10" fill="#0f172a"/>
    <rect x="8" y="44" width="48" height="6" rx="3" fill="#1e293b"/>
    <rect x="8" y="44" width="${Math.max(4, 48 * progreso / 100)}" height="6" rx="3" fill="${color}"/>
    <text x="32" y="36" font-family="monospace" font-size="20"
          fill="${color}" text-anchor="middle" font-weight="bold">${progreso}%</text>
  </svg>`;

  // Base64 — funciona tanto local como en producción
  const encoded = 'data:image/svg+xml;base64,' + btoa(svg);
  const link = document.getElementById('favicon-dinamico');
  link.href = encoded;
}

window.addEventListener('scroll', actualizarFaviconScroll);
window.addEventListener('load', actualizarFaviconScroll);