import { useState } from 'react';
// 💡 TIP: Puedes importar el hook useInput provisto por la cátedra para simplificar el estado:
// import useInput from '../hooks/useInput';

/**
 * Formulario controlado para dar de alta un nuevo guerrero en el servidor Express.
 *
 * @param {Object} props
 * @param {Function} props.onPersonajeCreado - Callback que recibe el nuevo personaje creado por la API.
 */
export default function FormularioPersonaje({ onPersonajeCreado }) {
  // TODO [Issue #5]:
  // 1. Declarar inputs controlados para los campos: name, race, ki, affiliation, image, description
  //    (puedes usar el custom hook useInput('') o useState('')).
  // 2. Declarar estados locales para mensajes de validación y estado de envío (errorMsg, exitoMsg, enviando).
  // 3. Implementar el manejador de envío handleSubmit(e):
  //    a. Invocar e.preventDefault() para evitar que el navegador recargue la página.
  //    b. Validar que el nombre tenga al menos 3 caracteres tras eliminar espacios (.trim().length >= 3).
  //    c. Validar que la raza no esté vacía (.trim().length > 0).
  //    d. Si alguna validación falla, mostrar mensaje de error en pantalla y cancelar el envío.
  //    e. Si es válido, ejecutar fetch('http://localhost:3000/api/personajes', { method: 'POST', ... }).
  //    f. Al recibir respuesta exitosa (status 201), invocar onPersonajeCreado(nuevoPersonaje),
  //       mostrar mensaje de confirmación y reiniciar los campos del formulario con reset().

  return (
    <section className='formulario-card'>
      <div className='form-header'>
        <h3>➕ Registrar Nuevo Guerrero</h3>
        <p>Completa el formulario para enviar una petición POST al servidor Express.</p>
      </div>

      {/* TODO [Issue #5]:
          Renderizar las alertas de error/éxito si existen en el estado y construir el formulario:
          <form onSubmit={handleSubmit} className="form-grid">
            - Input de Nombre (obligatorio, id="input-nombre")
            - Select/Input de Raza (obligatorio, id="select-raza")
            - Input de Ki (id="input-ki")
            - Select/Input de Afiliación (id="select-afiliacion")
            - Input de URL de Imagen (id="input-imagen")
            - Textarea de Descripción (id="textarea-desc")
            - Botón de envío (<button type="submit" className="btn-submit">)
          </form>
      */}
      <div className='form-placeholder'>
        <p>Formulario listo para implementar por el alumno siguiendo la Issue #5.</p>
      </div>
    </section>
  );
}
