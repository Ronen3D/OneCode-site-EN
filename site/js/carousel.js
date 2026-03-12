document.addEventListener('DOMContentLoaded', function () {
  var VISIBLE = 7;
  var SCROLL_COUNT = 5;
  var AUTOPLAY_MS = 5000;

  var track = document.querySelector('.carousel-track');
  var prevBtn = document.querySelector('.carousel-btn-prev');
  var nextBtn = document.querySelector('.carousel-btn-next');
  var wrapper = document.querySelector('.carousel-wrapper');
  if (!track || !prevBtn || !nextBtn) return;

  var slides = Array.from(track.children);
  var total = slides.length;
  if (total === 0) return;

  // Clone slides for infinite loop (3 copies)
  var cloneBefore = [];
  var cloneAfter = [];
  for (var i = 0; i < total; i++) {
    cloneBefore.push(slides[i].cloneNode(true));
    cloneAfter.push(slides[i].cloneNode(true));
  }
  cloneBefore.forEach(function (el) { track.insertBefore(el, track.firstChild); });
  cloneAfter.forEach(function (el) { track.appendChild(el); });

  var currentIndex = total; // start at first "real" set
  var isTransitioning = false;
  var autoplayTimer = null;

  function getVisibleCount() {
    var w = window.innerWidth;
    if (w <= 480) return 2;
    if (w <= 768) return 3;
    if (w <= 1024) return 5;
    return VISIBLE;
  }

  function updatePosition(animate) {
    var visible = getVisibleCount();
    var percent = -(currentIndex * (100 / visible));
    if (animate) {
      track.style.transition = 'transform 0.5s ease';
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = 'translateX(' + percent + '%)';
  }

  function snapIfNeeded() {
    if (currentIndex >= total * 2) {
      currentIndex -= total;
      updatePosition(false);
    } else if (currentIndex < 0) {
      currentIndex += total;
      updatePosition(false);
    }
  }

  track.addEventListener('transitionend', function () {
    isTransitioning = false;
    snapIfNeeded();
  });

  function goNext() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex += SCROLL_COUNT;
    updatePosition(true);
  }

  function goPrev() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex -= SCROLL_COUNT;
    updatePosition(true);
  }

  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(goNext, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);
  }

  // Init
  updatePosition(false);
  startAutoplay();

  window.addEventListener('resize', function () {
    updatePosition(false);
  });
});
