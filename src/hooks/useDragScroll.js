import { useCallback, useRef } from "react";

/**
 * Umbral (px) a partir del cual un gesto deja de ser un click y pasa a ser un
 * arrastre. Sin él, el temblor de la mano al hacer click abriría el modal
 * justo cuando el usuario quería mover el carrusel, o al revés.
 */
const DRAG_THRESHOLD = 6;

/**
 * Arrastrar con el mouse un contenedor que ya scrollea en horizontal.
 *
 * El touch no se toca: el navegador ya lo resuelve con inercia y snap propios,
 * y reimplementarlo a mano siempre sale peor. Esto es solo para el mouse, que
 * de fábrica no tiene forma de empujar una fila horizontal.
 *
 * Mientras dura el arrastre se apaga el scroll-snap: si queda activo, el
 * navegador re-imanta la fila en cada frame y el gesto se siente trabado.
 *
 * `wasDragged()` lo consulta el hijo en su `onClick` para no abrir nada cuando
 * el gesto terminó siendo un arrastre.
 */
export const useDragScroll = (ref) => {
  const gesture = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });

  const onPointerDown = useCallback(
    (e) => {
      const el = ref.current;
      if (!el || e.pointerType === "touch" || e.button !== 0) return;

      gesture.current = {
        active: true,
        startX: e.clientX,
        startScroll: el.scrollLeft,
        moved: 0,
      };
      el.style.scrollSnapType = "none";
    },
    [ref],
  );

  const onPointerMove = useCallback(
    (e) => {
      const el = ref.current;
      const g = gesture.current;
      if (!el || !g.active) return;

      const dx = e.clientX - g.startX;
      g.moved = Math.max(g.moved, Math.abs(dx));
      if (g.moved > DRAG_THRESHOLD) el.scrollLeft = g.startScroll - dx;
    },
    [ref],
  );

  const endDrag = useCallback(() => {
    gesture.current.active = false;
    if (ref.current) ref.current.style.scrollSnapType = "";
  }, [ref]);

  /**
   * Consulta y consume: leerlo deja el gesto en cero. Si el flag quedara
   * colgado, el siguiente Enter sobre una card ya enfocada con el teclado se
   * interpretaría como el final de aquel arrastre y no abriría nada.
   */
  const wasDragged = useCallback(() => {
    const dragged = gesture.current.moved > DRAG_THRESHOLD;
    gesture.current.moved = 0;
    return dragged;
  }, []);

  return {
    wasDragged,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerLeave: endDrag,
      onPointerCancel: endDrag,
    },
  };
};

export default useDragScroll;
