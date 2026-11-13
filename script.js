'use strict';

/* Tema claro/escuro */
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Mudar para o tema claro' : 'Mudar para o tema escuro');
  themeMeta.setAttribute('content', theme === 'dark' ? '#05061a' : '#e9efff');
}
function savedTheme() {
  try { return localStorage.getItem('theme'); } catch (error) { return null; }
}
applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (error) { /* sem armazenamento: vale só para esta visita */ }
});
// Acompanha o sistema enquanto a pessoa não escolher um tema manualmente.
systemDark.addEventListener('change', event => {
  if (!savedTheme()) applyTheme(event.matches ? 'dark' : 'light');
});

/* Menu mobile */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.header nav');
function closeMenu() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
}
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

/* Filtros da galeria */
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    });
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
