/**
 * Componente presentacional para la tarjeta de un personaje de Dragon Ball.
 *
 * @param {Object} props
 * @param {Object} props.personaje - Objeto con datos del personaje (id, name, race, ki, affiliation, image, description).
 * @param {Function} props.onEliminar - Callback para eliminar el personaje recibiendo (id, event).
 */
export default function PersonajeCard({ personaje, onEliminar }) {
  if (!personaje) {
    return (
      <div className='card-vacia'>
        <p>No hay guerrero seleccionado.</p>
      </div>
    );
  }

  // TODO [Issue #3]: Definir URL de imagen por defecto de respaldo (ej: 'https://dragonball-api.com/characters/goku_normal.webp')

  return (
    <article className='personaje-card'>
      {/* TODO [Issue #3]:
          1. Renderizar <div className="card-media"> con la imagen del personaje (src={personaje.image})
             y el badge de ki (<span className="ki-badge">⚡ Ki: {personaje.ki}</span>).
          2. Renderizar <div className="card-body"> con el nombre (<h2 className="personaje-nombre">{personaje.name}</h2>),
             los badges de raza y afiliación, y la descripción (<p className="personaje-descripcion">).
          3. Renderizar el botón de eliminación (<button type="button" className="btn-eliminar">)
             pasando el ID del personaje como argumento al callback onEliminar:
             onClick={(e) => onEliminar(personaje.id, e)}
      */}
      <div className='card-placeholder'>
        <h2 className='personaje-nombre'>{personaje.name}</h2>
        <p className='personaje-descripcion'>
          Completa la implementación de PersonajeCard.jsx siguiendo la Issue #3.
        </p>
      </div>
    </article>
  );
}
