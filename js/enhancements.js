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

// Highlights carousel (home). The track is a scroll-snap row, so the slides
// already swipe on touch and scroll with a trackpad on their own; this adds the
// arrows, the dots and arrow-key support on top. The .carousel-enabled hook on
// <html> is what reveals the controls and hides the native scrollbar, so
// without JS the reader keeps the scrollbar and loses nothing else.
//
// Position is read back from the track's own scrollLeft rather than tracked in
// a variable, so a swipe, a trackpad scroll and a tab into an off-screen link
// all keep the dots honest.
(function () {
  'use strict';

  var root = document.querySelector('.highlights');
  if (!root) {
    return;
  }

  var track = root.querySelector('.highlight-track');
  var slides = root.querySelectorAll('.highlight-slide');
  var dots = root.querySelectorAll('.highlight-dot');
  var arrows = root.querySelectorAll('.highlight-arrow');

  // One slide is not a carousel, and the controls would only mislead.
  if (!track || slides.length < 2) {
    return;
  }

  document.documentElement.classList.add('carousel-enabled');

  var current = -1;

  // The slide whose left edge sits closest to the scroll position. Measuring
  // beats counting: the gap, the padding and any sub-pixel rounding are all
  // already baked into offsetLeft.
  function nearest() {
    var best = 0;
    var min = Infinity;
    for (var i = 0; i < slides.length; i++) {
      var distance = Math.abs(slides[i].offsetLeft - track.scrollLeft);
      if (distance < min) {
        min = distance;
        best = i;
      }
    }
    return best;
  }

  function sync() {
    var index = nearest();
    if (index === current) {
      return;
    }
    current = index;

    for (var i = 0; i < dots.length; i++) {
      if (i === index) {
        dots[i].setAttribute('aria-current', 'true');
      } else {
        dots[i].removeAttribute('aria-current');
      }
    }

    // Nothing to reach past either end, so the arrow pointing there stops
    // being a control — announced with aria-disabled rather than the `disabled`
    // attribute, which would take the button out of the tab order under the
    // reader who had just pressed it and drop their focus to the page.
    for (var a = 0; a < arrows.length; a++) {
      var forward = arrows[a].dataset.dir === '1';
      var spent = forward ? index === slides.length - 1 : index === 0;
      arrows[a].setAttribute('aria-disabled', String(spent));
    }
  }

  // scrollTo without an explicit behaviour follows the CSS, which is `smooth`
  // site-wide and forced to `auto` under prefers-reduced-motion.
  function goTo(index) {
    var clamped = Math.max(0, Math.min(slides.length - 1, index));
    track.scrollTo({ left: slides[clamped].offsetLeft });
  }

  for (var a = 0; a < arrows.length; a++) {
    arrows[a].addEventListener('click', function (event) {
      if (event.currentTarget.getAttribute('aria-disabled') === 'true') {
        return;
      }
      goTo(nearest() + Number(event.currentTarget.dataset.dir));
    });
  }

  for (var d = 0; d < dots.length; d++) {
    dots[d].addEventListener('click', function (event) {
      goTo(Number(event.currentTarget.dataset.slide));
    });
  }

  root.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      goTo(nearest() - 1);
    } else if (event.key === 'ArrowRight') {
      goTo(nearest() + 1);
    } else {
      return;
    }
    event.preventDefault();
  });

  var pending = false;
  track.addEventListener('scroll', function () {
    if (pending) {
      return;
    }
    pending = true;
    window.requestAnimationFrame(function () {
      pending = false;
      sync();
    });
  });

  // A resize changes every offsetLeft, so the snapped slide can end up a few
  // pixels off its own edge; re-reading the position puts the dots back.
  window.addEventListener('resize', sync);

  sync();
})();

// Copy-to-clipboard for the skill URL. Kept in its own IIFE, like each block
// above, because every one of them returns early on its own terms — the reveal
// when motion is reduced, the carousel when the page has no track to drive.
// Without JS (or without the
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
