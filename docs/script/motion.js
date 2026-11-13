/**
 * WikIA - transições com JavaScript nativo (Web Animations API).
 * Sem bibliotecas externas. Respeita "reduzir movimento" do sistema.
 */
(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const timing = 'cubic-bezier(0.22, 1, 0.36, 1)';
  let navigationId = 0;
  let leaving = null;

  function animateEntry(page) {
    if (reducedMotion.matches || !page.animate) return;

    page.animate([
      { opacity: 0, transform: 'translateY(14px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 340, easing: timing });

    const pieces = page.querySelectorAll(
      '.hero-grid, .section-title, .grid > .card, .article, .about, .verify'
    );
    pieces.forEach((element, index) => {
      element.animate([
        { opacity: 0, transform: 'translateY(12px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 460,
        delay: Math.min(index, 9) * 42,
        easing: timing,
        fill: 'backwards'
      });
    });
  }

  function activate(target) {
    document.querySelectorAll('.page').forEach(page => {
      page.classList.toggle('active', page === target);
    });
    window.scrollTo(0, 0);
    animateEntry(target);
  }

  function showPage(target) {
    if (!target) return;
    const requestId = ++navigationId;

    // Cliques rápidos não deixam animações antigas mudarem a página.
    if (leaving) {
      leaving.cancel();
      leaving = null;
    }

    const previous = document.querySelector('.page.active');
    if (!previous || previous === target || reducedMotion.matches || !previous.animate) {
      activate(target);
      return;
    }

    leaving = previous.animate([
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-7px)' }
    ], { duration: 130, easing: 'ease-in', fill: 'forwards' });

    leaving.finished.then(() => {
      if (requestId !== navigationId) return;
      leaving.cancel();
      leaving = null;
      activate(target);
    }).catch(() => {});
  }

  function setMobileMenu(open) {
    const nav = document.getElementById('nav');
    const button = document.querySelector('.menu-toggle');
    if (!nav || !button) return;
    nav.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  function initializeMenu() {
    const nav = document.getElementById('nav');
    const button = document.querySelector('.menu-toggle');
    if (!nav || !button) return;
    button.addEventListener('click', () => {
      setMobileMenu(!nav.classList.contains('open'));
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) setMobileMenu(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        setMobileMenu(false);
        button.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !button.contains(event.target)) {
        setMobileMenu(false);
      }
    });
  }

  window.WikIAMotion = { showPage, setMobileMenu };
  initializeMenu();
})();
