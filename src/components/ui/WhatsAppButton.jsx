import { Button } from "@chakra-ui/react";
import { whatsappLink } from "../../config/brand";
import { trackWhatsApp } from "../../lib/analytics";

/**
 * Default polimórfico: el Button de Chakra renderizado como ancla. Un WhatsApp
 * siempre es un link a otro dominio, nunca un <button>.
 */
const ButtonLink = (props) => <Button as="a" {...props} />;

/**
 * El único WhatsApp del sitio.
 *
 * Deliberadamente NO impone estilos: `as` acepta cualquier componente que sepa
 * renderizar un ancla con style props —`chakra.a`, `MotionLink`, un `Button`—
 * y todo lo demás se reenvía tal cual. Lo único que unifica son las tres cosas
 * que no se pueden olvidar: el href armado con el número de marca, el
 * `target="_blank"` y el disparo del evento.
 *
 * El valor no está en los dos call sites de hoy, sino en que el próximo nazca
 * medido sin que haya que acordarse.
 *
 * Por qué `target="_blank"`: al abrirse una pestaña nueva la página actual
 * sigue viva y gtag llega a despachar el evento. Navegando en la misma pestaña
 * el navegador puede cortar la petición a mitad de camino.
 *
 * @param origen  'contacto' | 'planes' — en qué parte de la UI está el botón.
 * @param plan    'basica' | 'pro' | 'premium' | 'ninguno' — solo cuando el
 *                click nace de una tarjeta de precios.
 * @param mensaje Texto ya cargado en el chat. Sin él va el preset de la marca.
 */
const WhatsAppButton = ({
  as,
  origen,
  plan = "ninguno",
  mensaje,
  onClick,
  children,
  ...props
}) => {
  // Se resuelve acá y no en el destructuring: como parámetro, el linter no lo
  // da por usado dentro del JSX y lo marca como muerto.
  const Component = as ?? ButtonLink;

  const handleClick = (event) => {
    trackWhatsApp({ origen, plan });
    // El onClick propio del call site se respeta: medir no es motivo para
    // pisarle el comportamiento a quien use el componente.
    onClick?.(event);
  };

  return (
    <Component
      href={whatsappLink(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      {...props}
    >
      {children}
    </Component>
  );
};

export default WhatsAppButton;
