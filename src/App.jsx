import { useState, useEffect } from 'react';
// TODO [Issue #2]: Importar BrowserRouter, Routes, Route, Link de 'react-router-dom'
import Navbar from './components/Navbar';
import PersonajesViewer from './components/PersonajesViewer';
import FormularioPersonaje from './components/FormularioPersonaje';
import './App.css';

export default function App() {
  const [personajes, setPersonajes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notificacion, setNotificacion] = useState('');

  // TODO [Issue #4]: Cargar la colección inicial mediante GET /api/personajes en un useEffect:
  // - Ejecutar fetch hacia 'http://localhost:3000/api/personajes'.
  // - Convertir respuesta a JSON y guardar en el estado 'personajes'.
  // - Manejar errores y finalizar estableciendo loading en false.

  // TODO [Issue #4]: Implementar navegación circular con handleSiguiente y handleAnterior:
  // - handleSiguiente: avanzar al índice (prev + 1) % personajes.length
  // - handleAnterior: retroceder al índice (prev - 1 + personajes.length) % personajes.length

  // TODO [Issue #6]: Implementar eliminación de personaje con handleEliminar(id, e):
  // - Prevenir recarga con e.preventDefault().
  // - Enviar petición DELETE a `http://localhost:3000/api/personajes/${id}`.
  // - Filtrar el personaje eliminado del estado y reajustar currentIndex.
  // - Mostrar notificación temporal en pantalla.

  // TODO [Issue #5]: Implementar handlePersonajeCreado(nuevoPersonaje):
  // - Agregar el nuevo personaje al arreglo de personajes en el estado.
  // - Establecer currentIndex para visualizar el nuevo guerrero agregado.
  // - Mostrar notificación de éxito.

  const personajeActivo = personajes[currentIndex] || null;

  return (
    <div className='app-container'>
      {/* TODO [Issue #2]:
          1. Envolver la estructura con <BrowserRouter>.
          2. Renderizar <Navbar /> para que se mantenga visible en todas las páginas.
          3. Mostrar el banner condicional de notificación si existe en el estado:
             {notificacion && <div className="notificacion-banner">...</div>}
          4. Configurar las rutas dentro de <main className="app-main-layout"><Routes>...</Routes></main>:
             - Ruta '/' -> <PersonajesViewer personaje={personajeActivo} total={personajes.length} posicion={currentIndex + 1} onSiguiente={handleSiguiente} onAnterior={handleAnterior} onEliminar={handleEliminar} loading={loading} />
             - Ruta '/nuevo' -> <FormularioPersonaje onPersonajeCreado={handlePersonajeCreado} />
             - Ruta '*' -> Mensaje 404 con enlace <Link to="/">Volver al Visor</Link>
          5. Renderizar <footer className="app-footer">.
      */}
      <Navbar />

      <main className='app-main-layout'>
        <PersonajesViewer
          personaje={personajeActivo}
          total={personajes.length}
          posicion={currentIndex + 1}
          onSiguiente={() => {}}
          onAnterior={() => {}}
          onEliminar={() => {}}
          loading={loading}
        />
        <FormularioPersonaje onPersonajeCreado={() => {}} />
      </main>

      <footer className='app-footer'>
        <p>
          Programación II — Cátedra de Informática. Datos integrados de{' '}
          <a href='https://web.dragonball-api.com/' target='_blank' rel='noopener noreferrer'>
            Dragon Ball API
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
