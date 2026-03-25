export function initFadeUp(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const elements = document.querySelectorAll<HTMLElement>('[data-fade-up]');
  if (!elements.length) return;

  // Apply stagger delays for elements inside data-stagger-parent containers
  document.querySelectorAll<HTMLElement>('[data-stagger-parent]').forEach((parent) => {
    const children = parent.querySelectorAll<HTMLElement>(':scope > [data-fade-up], :scope > * [data-fade-up]');
    children.forEach((child, index) => {
      const delay = Math.min(index * 80, 400);
      child.setAttribute('data-fade-delay', String(delay));
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target as HTMLElement;
        const delay = el.getAttribute('data-fade-delay');

        el.style.willChange = 'transform, opacity';

        if (delay) {
          el.style.transitionDelay = `${delay}ms`;
        }

        el.classList.add('visible');
        observer.unobserve(el);

        el.addEventListener('transitionend', () => {
          el.style.willChange = '';
          el.style.transitionDelay = '';
        }, { once: true });
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}
