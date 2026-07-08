// Progressive enhancements. Anything here is optional polish: if this file
// fails to load or the browser lacks support, the page stays fully usable.

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll-reveal: sections fade + rise once as they enter the viewport.
  // We only opt in when motion is allowed and IntersectionObserver exists;
  // the .reveal-enabled hook on <html> is what activates the CSS, so without
  // JS every section renders at full opacity.
  if (reduceMotion || !('IntersectionObserver' in window)) {
    return;
  }

  var sections = document.querySelectorAll('main section:not(.panel-grid)');
  if (!sections.length) {
    return;
  }

  document.documentElement.classList.add('reveal-enabled');

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
