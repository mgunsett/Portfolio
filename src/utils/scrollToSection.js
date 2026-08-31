/** Alto del Navbar fijo: lo descontamos para que el título de la sección no quede tapado. */
export const NAVBAR_OFFSET = 76;

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Scroll suave a una sección por id, con easing propio.
 *
 * Está acá y no dentro del Hero porque ahora lo usan el Navbar, los dos heros
 * y el Footer. Si el usuario pidió menos movimiento, salta directo al destino.
 */
export const scrollToSection = (
  sectionId,
  { duration = 1600, offset = NAVBAR_OFFSET } = {},
) => {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const targetY = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - offset,
  );

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || duration === 0) {
    window.scrollTo(0, targetY);
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  const step = (currentTime) => {
    if (startTime === null) startTime = currentTime;

    const progress = Math.min((currentTime - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));

    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};
