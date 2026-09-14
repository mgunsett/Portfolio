import { useEffect, useRef } from "react";
import { trackEvent } from "../lib/analytics";

const UMBRAL = 0.5;

/**
 * Escalones en los que el observer avisa. Con un único threshold de 0.5 una
 * sección más alta que la pantalla no notificaría nunca en el rango útil: se
 * avisa al entrar (ratio ~0) y después recién al cruzar 0.5, que en ese caso no
 * ocurre jamás. Los escalones intermedios dan la oportunidad de evaluar la
 * segunda condición de abajo.
 *
 * Llegan hasta 1 y no hasta 0.5 a propósito: el navegador puede reportar
 * 0.4999999 justo al cruzar el umbral, y sin escalones por encima el observer
 * no volvería a avisar nunca. El evento se perdería en silencio.
 */
const ESCALONES = Array.from({ length: 21 }, (_, i) => i * 0.05);

/**
 * Dispara un evento la primera vez que el elemento entra en pantalla.
 *
 * Mide alcance, no interacción: responde "cuánta gente llega hasta acá",
 * incluidos los que solo scrollean y nunca tocan nada. Por eso el observer se
 * desconecta apenas dispara — una vez por carga de página, no una por cada vez
 * que la sección vuelve a cruzar el viewport.
 *
 * "Se vio" se cumple de dos maneras, y alcanza con cualquiera:
 *   - se ve la mitad del elemento, o
 *   - el elemento cubre la mitad de la pantalla.
 *
 * La segunda existe porque `intersectionRatio` se mide contra el alto total del
 * elemento: una sección de 3000px en una pantalla de 900 no puede superar 0.3
 * por más que la llene entera. Sin esa condición, medir secciones largas
 * —justamente las que interesan— sería imposible.
 *
 * Devuelve el ref para colgar del contenedor a observar.
 */
export const useVisibilidad = (nombreEvento, params) => {
  const ref = useRef(null);

  // Los params entran por ref para que un objeto literal en el render del
  // componente no vuelva a montar el observer en cada pasada. La asignación va
  // en su propio efecto —declarado antes que el del observer, así ya está al
  // día cuando este se monta— porque escribir un ref durante el render es
  // justamente lo que React desaconseja.
  const paramsRef = useRef(params);

  useEffect(() => {
    paramsRef.current = params;
  });

  useEffect(() => {
    const el = ref.current;
    // En un navegador sin IntersectionObserver simplemente no se mide: la
    // analítica nunca puede ser motivo de que la página se rompa.
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const mitadDelElemento = entry.intersectionRatio >= UMBRAL;
        const mitadDeLaPantalla =
          entry.intersectionRect.height >= window.innerHeight * UMBRAL;

        if (!mitadDelElemento && !mitadDeLaPantalla) return;

        trackEvent(nombreEvento, paramsRef.current);
        observer.disconnect();
      },
      { threshold: ESCALONES },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [nombreEvento]);

  return ref;
};
