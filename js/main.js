/* ============================================================
   THE QUILL & THE QUERY - shared behavior
   1. Constellation canvas (hero + pull-quote band)
   2. Gentle fade page transitions
   3. Publication row reveal on touch/keyboard
   All motion respects prefers-reduced-motion.
   ============================================================ */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- 1. Constellation ---------- */
  function constellation(canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var dark = canvas.getAttribute('data-variant') === 'dark';
    var density = parseInt(canvas.getAttribute('data-density'), 10) || 60;
    var dpr = window.devicePixelRatio || 1;

    var starColor = dark ? '232,224,240' : '97,78,110';
    var lineColor = dark ? '212,188,133' : '176,141,62';

    var stars = [];
    for (var i = 0; i < density; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.6 + Math.random() * 1.4,
        p: Math.random() * Math.PI * 2,
        s: 0.4 + Math.random() * 0.8
      });
    }

    var t = 0;
    var raf = null;

    function resize() {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      var w = canvas.offsetWidth;
      var h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // faint constellation lines between near stars
      for (var i = 0; i < stars.length; i++) {
        for (var j = i + 1; j < stars.length; j++) {
          var dx = (stars[i].x - stars[j].x) * w;
          var dy = (stars[i].y - stars[j].y) * h;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.strokeStyle = 'rgba(' + lineColor + ',' + ((1 - d / 110) * 0.18) + ')';
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(stars[i].x * w, stars[i].y * h);
            ctx.lineTo(stars[j].x * w, stars[j].y * h);
            ctx.stroke();
          }
        }
      }

      // twinkling stars (steady when motion is reduced)
      for (var k = 0; k < stars.length; k++) {
        var st = stars[k];
        var tw = reducedMotion.matches
          ? 0.7
          : 0.45 + 0.55 * Math.abs(Math.sin(t * st.s + st.p));
        ctx.fillStyle = 'rgba(' + starColor + ',' + (tw * 0.85) + ')';
        ctx.beginPath();
        ctx.arc(st.x * w, st.y * h, st.r, 0, Math.PI * 2);
        ctx.fill();
      }

      t += 0.012;
      if (!reducedMotion.matches) raf = requestAnimationFrame(draw);
    }

    function start() {
      if (raf) cancelAnimationFrame(raf);
      resize();
      draw();
    }

    window.addEventListener('resize', start);
    if (typeof reducedMotion.addEventListener === 'function') {
      reducedMotion.addEventListener('change', start);
    }
    start();
  }

  var canvases = document.querySelectorAll('canvas[data-constellation]');
  for (var c = 0; c < canvases.length; c++) constellation(canvases[c]);

  /* ---------- 2. Gentle fade page transitions ---------- */
  function reveal() {
    document.body.classList.add('is-loaded');
  }

  if (reducedMotion.matches) {
    reveal();
  } else {
    // double rAF so the initial (hidden) styles are committed first
    requestAnimationFrame(function () {
      requestAnimationFrame(reveal);
    });
  }

  // restore visibility when returning via back/forward cache
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) reveal();
  });

  document.addEventListener('click', function (e) {
    if (reducedMotion.matches) return;
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;

    var url;
    try { url = new URL(a.href, window.location.href); } catch (err) { return; }
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname) return; // same-page anchors

    e.preventDefault();
    document.body.classList.remove('is-loaded');
    setTimeout(function () { window.location.href = url.href; }, 320);
  });

  /* ---------- 3. Artwork fallback: dashed frame until the file exists ---------- */
  var artImgs = document.querySelectorAll('.art img');
  for (var a = 0; a < artImgs.length; a++) {
    (function (img) {
      var mark = function () {
        var fig = img.closest ? img.closest('.art') : img.parentElement;
        if (fig) fig.classList.add('img-missing');
      };
      if (img.complete && img.naturalWidth === 0) mark();
      else img.addEventListener('error', mark);
    })(artImgs[a]);
  }

  /* ---------- 4. Archive search ---------- */
  var search = document.getElementById('archive-search');
  if (search) {
    var allCards = document.querySelectorAll('.publist .pubcard');
    var emptyNote = document.getElementById('search-empty');
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      var shown = 0;
      for (var i = 0; i < allCards.length; i++) {
        var hit = !q || allCards[i].textContent.toLowerCase().indexOf(q) !== -1;
        allCards[i].hidden = !hit;
        if (hit) shown++;
      }
      if (emptyNote) emptyNote.hidden = shown > 0;
    });
  }

  /* ---------- 5. Publication rows: tap/keyboard reveal ---------- */
  var pubcards = document.querySelectorAll('.pubcard');
  for (var p = 0; p < pubcards.length; p++) {
    (function (card) {
      card.addEventListener('click', function () {
        card.classList.toggle('revealed');
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('revealed');
        }
      });
    })(pubcards[p]);
  }
})();
