// Лаб 6: theme товч болон flip товчнууд
(function () {
  'use strict';

  var root = document.documentElement;
  var themeBtn = document.getElementById('theme-toggle');
  var flipAllBtn = document.getElementById('flip-all');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));

  /* ---------- Theme (dark mode) ---------- */
  function systemPrefersDark() {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  function setTheme(theme, save) {
    root.setAttribute('data-theme', theme);
    themeBtn.setAttribute('aria-pressed', String(theme === 'dark'));
    if (save) {
      try { localStorage.setItem('lab6-theme', theme); } catch (e) { /* хадгалах боломжгүй бол алгасна */ }
    }
  }

  var stored = null;
  try { stored = localStorage.getItem('lab6-theme'); } catch (e) { stored = null; }
  if (stored === 'dark' || stored === 'light') {
    setTheme(stored, false);
  } else {
    themeBtn.setAttribute('aria-pressed', String(systemPrefersDark()));
  }

  themeBtn.addEventListener('click', function () {
    var current = root.getAttribute('data-theme') || (systemPrefersDark() ? 'dark' : 'light');
    setTheme(current === 'dark' ? 'light' : 'dark', true);
  });

  /* ---------- Flip cards ---------- */
  function setFlipped(card, flipped) {
    var btn = card.querySelector('.flip-btn');
    card.classList.toggle('is-flipped', flipped);
    btn.setAttribute('aria-pressed', String(flipped));
    btn.textContent = flipped ? 'Зураг руу буцах' : 'Дэлгэрэнгүй';
  }

  function updateFlipAll() {
    var allFlipped = cards.every(function (c) { return c.classList.contains('is-flipped'); });
    flipAllBtn.setAttribute('aria-pressed', String(allFlipped));
    flipAllBtn.textContent = allFlipped ? 'Бүгдийг буцаах' : 'Бүгдийг эргүүлэх';
  }

  cards.forEach(function (card) {
    var btn = card.querySelector('.flip-btn');
    var flip = card.querySelector('.flip');

    btn.addEventListener('click', function () {
      setFlipped(card, !card.classList.contains('is-flipped'));
      updateFlipAll();
    });

    // Зураг дээр дарахад мөн эргэнэ (хулгана, мэдрэгч)
    flip.addEventListener('click', function () {
      setFlipped(card, !card.classList.contains('is-flipped'));
      updateFlipAll();
    });
  });

  flipAllBtn.addEventListener('click', function () {
    var allFlipped = cards.every(function (c) { return c.classList.contains('is-flipped'); });
    cards.forEach(function (card) { setFlipped(card, !allFlipped); });
    updateFlipAll();
  });
})();
