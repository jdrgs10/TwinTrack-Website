(() => {
  'use strict';
  document.documentElement.classList.add('js-ready');
  const data = window.TWINTRACK;
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const closeMenu = () => { nav?.classList.remove('is-open'); menu?.setAttribute('aria-expanded', 'false'); };
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
  });
  nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
  window.matchMedia('(min-width: 1000px)').addEventListener('change', closeMenu);
  const setImage = (id, key) => {
    const element = document.getElementById(id);
    const screen = data?.screenshots[key];
    if (!element || !screen) return;
    element.srcset = `${screen.small} 480w, ${screen.src} 960w`;
    element.src = screen.small;
    element.alt = screen.alt;
    element.width = screen.width;
    element.height = screen.height;
  };
  const tabs = [...document.querySelectorAll('[data-screen-tab]')];
  const titles = { home: 'Your day, in context.', ai: 'Conversation, grounded in context.', profile: 'Your data. Your control.' };
  const activateTab = tab => {
    const key = tab.dataset.screenTab;
    tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
    document.getElementById('app-panel').setAttribute('aria-labelledby', tab.id);
    setImage('gallery-screen', key);
    document.getElementById('gallery-number').textContent = `0${tabs.indexOf(tab) + 1} / ${data.gallery[key].title.toUpperCase()}`;
    document.getElementById('gallery-title').textContent = titles[key];
    document.getElementById('gallery-copy').textContent = data.gallery[key].text;
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault(); activateTab(tabs[next]); tabs[next].focus();
    });
  });
  const captions = {
    whatifLight: 'Light example: study changes from 2h to 4h. The Dark example uses 2h to 3h; these are different scenarios, not an appearance-only comparison.',
    whatifDark: 'Dark example: study changes from 2h to 3h. The Light example uses 2h to 4h; the different estimates reflect different scenarios.'
  };
  document.querySelectorAll('input[name="scenario"]').forEach(input => input.addEventListener('change', () => {
    if (!input.checked) return;
    setImage('scenario-screen', input.value);
    document.getElementById('scenario-caption').textContent = captions[input.value];
  }));
  const video = document.querySelector('video');
  const videoError = () => { const message = document.querySelector('.video-error'); if (message) message.hidden = false; };
  video?.addEventListener('error', videoError);
  video?.querySelector('source')?.addEventListener('error', videoError);
})();
