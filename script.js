'use strict';
/* Your WhatsApp number (international format, no + or spaces). Used by the contact form. */
var WHATSAPP_NUMBER = "923306740555";

/* LOGO: put your logo file in the same folder as index.html and name it
   logo.png (or logo.svg, logo.webp, logo.jpg). It appears automatically, unchanged. */
(function () {
  var names = ['logo.svg', 'logo.png', 'logo.webp', 'logo.jpg'];
  function tryNext(i) {
    if (i >= names.length) return;
    var im = new Image();
    im.onload = function () {
      document.querySelectorAll('.logo').forEach(function (a) {
        var c = im.cloneNode();
        c.alt = 'JA Solution'; c.decoding = 'async';
        c.width = im.naturalWidth; c.height = im.naturalHeight;
        a.replaceChildren(c);
      });
    };
    im.onerror = function () { tryNext(i + 1); };
    im.src = names[i];
  }
  tryNext(0);
})();

document.getElementById('y').textContent = new Date().getFullYear();

/* Mobile menu */
var mt = document.getElementById('mt'), links = document.getElementById('links');
function closeMenu() { links.classList.remove('open'); mt.setAttribute('aria-expanded', 'false'); }
mt.addEventListener('click', function () {
  var o = links.classList.toggle('open');
  mt.setAttribute('aria-expanded', o ? 'true' : 'false');
});
links.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });

/* Contact form opens WhatsApp with the details filled in */
document.getElementById('f').addEventListener('submit', function (e) {
  e.preventDefault();
  var d = new FormData(e.target);
  var t = 'Hi JA Solution, I would like a free marketing audit.\nName: ' + d.get('name') +
    '\nBusiness: ' + d.get('biz') + '\nService: ' + d.get('svc') + '\nGoals: ' + (d.get('note') || '-');
  window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(t), '_blank', 'noopener');
  document.getElementById('msg').textContent = 'Opening WhatsApp to send your request.';
});

/* Fade-in on scroll */
var io = new IntersectionObserver(function (es) {
  es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
}, { threshold: .12 });
document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
