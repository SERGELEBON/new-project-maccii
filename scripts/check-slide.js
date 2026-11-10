(() => {
  const sections = document.querySelectorAll('section');
  const hero = sections[0];
  const slides = hero.querySelectorAll(':scope > div:first-child > div');
  const out = [];
  slides.forEach((s, i) => {
    const op = getComputedStyle(s).opacity;
    const h1 = s.querySelector('h1') ? s.querySelector('h1').textContent.slice(0, 40) : '(pas de h1)';
    out.push(i + ':' + op + ' ' + h1);
  });
  return out.join(' || ');
})()
