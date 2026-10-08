import { useEffect } from 'react';
import PersonajeCard from './PersonajeCard';

/**
 * Visor de personajes con navegación circular y atajos globales de teclado.
 *
 * @param {Object} props
 * @param {Object} props.personaje - Personaje activo actualmente seleccionado.
 * @param {number} props.total - Cantidad total de personajes en la colección.
 * @param {number} props.posicion - Índice visual de posición actual (1-indexed).
 * @param {Function} props.onSiguiente - Callback para avanzar al siguiente personaje.
 * @param {Function} props.onAnterior - Callback para retroceder al personaje anterior.
 * @param {Function} props.onEliminar - Callback para eliminar el personaje activo.
 * @param {boolean} props.loading - Indicador de estado de carga asíncrona.
 */
export default function PersonajesViewer({
  personaje,
  total,
  posicion,
  onSiguiente,
  onAnterior,
  onEliminar,
  loading,
}) {
  // TODO [Issue #4]: Implementar useEffect para atajos de teclado globales en window:
  // - Escuchar el evento 'keydown'.
  // - Si la tecla presionada es 'ArrowRight', invocar onSiguiente().
  // - Si la tecla presionada es 'ArrowLeft', invocar onAnterior().
  // - Retornar OBLIGATORIAMENTE la función de limpieza (cleanup) con window.removeEventListener('keydown', ...).

  if (loading) {
    return (
      <section className='viewer-card viewer-loading'>
        <div className='spinner' />
        <p>Cargando guerreros desde el servidor local...</p>
      </section>
    );
  }

  if (total === 0) {
    return (
      <section className='viewer-card viewer-vacio'>
        <h3>Colección vacía</h3>
        <p>No quedan guerreros registrados en el multiverso.</p>
        <p className='p-sugerencia'>¡Utiliza la opción de registrar para agregar uno nuevo!</p>
      </section>
    );
  }

  return (
    <section className='viewer-card'>
      {/* TODO [Issue #4]:
          1. Renderizar la barra de herramientas (<div className="viewer-toolbar">) mostrando la posición ({posicion} / {total})
             y la indicación de atajos de teclado.
          2. Renderizar el componente <PersonajeCard personaje={personaje} onEliminar={onEliminar} />.
          3. Renderizar los controles de navegación (<div className="viewer-navigation">)
             con los botones <button className="btn-nav btn-anterior"> y <button className="btn-nav btn-siguiente">
             vinculando sus eventos onClick a onAnterior y onSiguiente respectivamente.
      */}
      <div className='viewer-placeholder'>
        <p>
          Guerrero {posicion} de {total}
        </p>
        <PersonajeCard personaje={personaje} onEliminar={onEliminar} />
      </div>
    </section>
  );
}
