document.addEventListener('DOMContentLoaded', function () {
  /* ===== Mobile menu toggle ===== */
  var menuBtn = document.querySelector('.mobile-menu-btn');
  var nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
      var isOpen = nav.classList.contains('nav-open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.setAttribute('aria-label', isOpen ? 'סגור תפריט' : 'פתח תפריט');
    });
  }

  /* ===== Back to top ===== */
  var backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    backBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===== Active nav highlighting ===== */
  var path = window.location.pathname;
  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    var href = link.pathname;
    if (!href) return;
    if (path === href || path === href.replace(/\/$/, '') || path.startsWith(href)) {
      link.classList.add('active');
    }
  });
});
