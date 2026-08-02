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

// Copy-to-clipboard for the skill URL. Kept in its own IIFE because the block
// above returns early when motion is reduced. Without JS (or without the
// async clipboard API) the element stays an ordinary link to SKILL.md, which
// is a perfectly good fallback — the file opens and the URL is in the bar.
(function () {
  'use strict';

  var link = document.querySelector('.agent-copy[data-copy]');
  if (!link || !navigator.clipboard || !navigator.clipboard.writeText) {
    return;
  }

  var label = link.querySelector('.agent-copy-label');
  if (!label) {
    return;
  }

  var idle = label.textContent;
  var timer = null;

  link.addEventListener('click', function (event) {
    event.preventDefault();
    navigator.clipboard.writeText(link.dataset.copy).then(function () {
      label.textContent = 'Copied';
      link.classList.add('is-copied');
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        label.textContent = idle;
        link.classList.remove('is-copied');
      }, 2000);
    }, function () {
      // Clipboard write refused (permissions, insecure origin) — fall back to
      // the link's normal behaviour rather than leaving the click dead.
      window.location.href = link.href;
    });
  });
})();
