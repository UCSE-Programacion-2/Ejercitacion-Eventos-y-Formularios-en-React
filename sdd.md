# SDD: Ejercitación — Eventos y Formularios en React: Gestión e Interactividad (Dragon Ball Character Hub)

Este documento define la especificación técnica, pedagógica y evaluativa bajo la metodología **Spec Driven Development (SDD)** para la ejercitación correspondiente a la cátedra de **Programación II**.

---

## 1. 🎯 Ficha Técnica y Objetivos Pedagógicos

- **Cátedra:** Programación II — Ingeniería en Informática / Licenciatura en Sistemas.
- **Unidad temática:** Unidad 4 — Librería React.js (Manejo de eventos sintéticos, formularios controlados, validaciones de usuario, custom hooks, enrutamiento con React Router y consumo de APIs REST con `useEffect` y `fetch`).
- **Clase asociada:** Clase 39 (según Cronograma) — _Eventos y Formularios en React: Gestión e Interactividad_ (con integración de Clase 38 _Navegación en React: Creación de Rutas con React Router_ y Clase 37 _Peticiones Asíncronas con React_).
- **Repositorio de referencia visto en clase:** `Formularios-en-React` (`MyLittleForm.jsx`, `Personajes.jsx`, `useInput.jsx`, `usePersonaje.jsx`), `contenidos.md` y `Ejercitacion-React-Router`.
- **Fuente de Datos API:** Scrapeado y provisión local desde [Dragon Ball API](https://web.dragonball-api.com/) (`https://dragonball-api.com/api/characters`).
- **Backend de referencia:** Servidor local Express en `server/server.js` (siguiendo el modelo probado en las ejercitaciones de `Frontend-JS`).
- **Estrategia pedagógica:** **Integración Isomórfica Full-Stack con Plantilla Guiada (Stubs Pedagógicos)**. El alumno recibe el backend Express funcional, los datos scrapeados y el custom hook `useInput` resuelto para su libre reutilización. Su rol como desarrollador consiste en implementar la solución en React: el enrutamiento con React Router, el componente presentacional con eventos y paso de argumentos, el visor con atajos de teclado y limpieza de eventos, y el formulario controlado con validaciones y peticiones asíncronas POST.

### Objetivos de Aprendizaje:

1. **Enrutamiento declarativo con React Router (`react-router-dom`):**
   - Configurar `BrowserRouter`, `Routes` y `Route` en el componente principal.
   - Proveer navegación fluida sin recargas mediante `NavLink` o `Link` en la barra de navegación.
   - Definir rutas para el Visor (`/`), el Formulario de Alta (`/nuevo`) y ruta comodín (`*`) para páginas no encontradas.
2. **Manejar eventos sintéticos en React (`SyntheticEvent`):**
   - Nombrado de eventos en camelCase (`onClick`, `onChange`, `onSubmit`).
   - Prevención expresa de comportamientos por defecto mediante `e.preventDefault()`.
   - Paso de argumentos personalizados a manejadores de eventos (ej. `(id, e) => handleEliminar(id, e)`).
3. **Construir formularios con componentes controlados:**
   - Vincular el valor de los inputs al estado de React (`value={...}`).
   - Actualizar el estado ante cada cambio utilizando el evento `onChange={...}`.
4. **Reutilizar Custom Hooks de control de entrada:**
   - Utilizar el hook `useInput` suministrado por la cátedra para simplificar el estado, los manejadores y el reseteo (`reset`).
5. **Implementar validaciones robustas antes del envío:**
   - Validar longitud mínima y eliminación de espacios en blanco al inicio (`trim()`).
   - Evitar envíos innecesarios o defectuosos al backend mostrando retroalimentación visual al usuario ante errores de validación.
6. **Consumir APIs REST (GET, POST y DELETE) desde React:**
   - Realizar peticiones asíncronas de lectura (`GET`) con `fetch` dentro de `useEffect` al montar el componente.
   - Enviar datos en formato JSON mediante peticiones de creación (`POST`) al despachar el evento `onSubmit`.
   - Despachar peticiones de eliminación (`DELETE`) pasando el identificador del guerrero.
7. **Manejar el ciclo de vida y limpieza de eventos globales:**
   - Suscribir atajos de teclado (`keydown` para navegación con flechas) y desuscribirlos estrictamente en la función de limpieza (_cleanup_) de `useEffect`.
8. **Garantizar la calidad de código y compilación de producción:**
   - Cumplir las reglas canónicas de linters (**ESLint Airbnb**, **Stylelint 16**, **Prettier**) y asegurar un empaquetado sin errores con **Vite** (`npm run build`).

---

## 2. 🌌 Dominio y Alcance Funcional

### Contexto Profesional:

Se desarrollará **Dragon Ball Character Hub**, una aplicación interactiva de gestión y visualización de guerreros y personajes del universo Dragon Ball. La aplicación consta de una interfaz SPA en React comunicada con una API REST en Node.js/Express con datos auténticos de la saga (Goku, Vegeta, Piccolo, Trunks, Freeza, Cell, etc.).

### Servidor Backend (`server/server.js`):

El backend se ejecuta en `http://localhost:3000` con CORS habilitado y persistencia en un archivo local `server/data/personajes.json`.

**Endpoints de la API:**

- `GET /api/personajes`: Devuelve la lista completa de personajes.
- `GET /api/personajes/:id`: Devuelve un personaje individual por su identificador numérico.
- `POST /api/personajes`: Recibe un payload JSON `{ name, race, ki, affiliation, image, description }`, valida los datos obligatorios, asigna un nuevo `id` numérico, lo agrega a la colección y responde con status `201` y el objeto creado.
- `DELETE /api/personajes/:id`: Elimina el personaje por `id` y responde con status `200` y confirmación.

---

## 3. 🏗️ Arquitectura de Componentes y Flujo de Rutas

### Árbol Jerárquico de Componentes:

```text
BrowserRouter
 └── App (Estado: personajes, currentIndex, loading, notificacion)
      │
      ├── Navbar (NavLink a '/' y '/nuevo')
      │
      ├── Banner de Notificación condicional
      │
      ├── Routes
      │    ├── Route path='/' -> PersonajesViewer (Navegación circular y teclado con cleanup)
      │    │                          └── PersonajeCard (Avatar, badges, acción con ID)
      │    │
      │    ├── Route path='/nuevo' -> FormularioPersonaje (Inputs controlados, validación y POST)
      │    │
      │    └── Route path='*' -> 404 Not Found con Link hacia '/'
      │
      └── Footer (Créditos y Dragon Ball API)
```

---

## 4. 📋 Matriz de Issues de GitHub Classroom

| Issue # | Título de la Issue                                                   | Requerimiento Técnico y Criterios de Aceptación                                                                                                                                                                                                                                                                                           | Commit sugerido                                                                        |
| :-----: | :------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| **#1**  | **Servidor Express y Datos de Dragon Ball**                          | - Configurar `server/server.js` con dependencias `express` y `cors`.<br>- Datos scrapeados en `server/data/personajes.json`.<br>- Implementar `GET /api/personajes`, `GET /api/personajes/:id`, `POST /api/personajes` (con validación de campos y status 201) y `DELETE /api/personajes/:id`.<br>- Configurar scripts en `package.json`. | `feat: configurar servidor express con endpoints GET POST DELETE (Closes #1)`          |
| **#2**  | **Enrutamiento con React Router y Barra de Navegación**              | - Configurar `BrowserRouter`, `Routes` y `Route` en `src/App.jsx`.<br>- En `src/components/Navbar.jsx`, renderizar enlaces con `NavLink` hacia `'/'` y `'/nuevo'`.<br>- Configurar ruta de inicio (`/`), ruta de creación (`/nuevo`) y ruta comodín (`*`) con enlace a `/`.                                                               | `feat: configurar react router rutas y navbar (Closes #2)`                             |
| **#3**  | **Componente `PersonajeCard` y Paso de Argumentos**                  | - En `src/components/PersonajeCard.jsx`, recibir `{ personaje, onEliminar }`.<br>- Renderizar avatar, nombre, badges de ki y raza.<br>- Vincular botón de eliminación pasando el identificador como argumento: `onClick={(e) => onEliminar(personaje.id, e)}`.                                                                            | `feat: implementar componente presentacional PersonajeCard con argumentos (Closes #3)` |
| **#4**  | **Visor de Guerreros: Carga Inicial (`GET`) y Teclado con Limpieza** | - En `src/App.jsx`, usar `useEffect` con dependencias `[]` para consumir `GET /api/personajes` con `fetch`.<br>- En `src/components/PersonajesViewer.jsx`, implementar navegación circular (`onSiguiente`, `onAnterior`).<br>- Escuchar `keydown` en `window` y retornar función de limpieza obligatoria con `removeEventListener`.       | `feat: integrar peticion GET inicial y visor con navegacion de teclado (Closes #4)`    |
| **#5**  | **Formulario Controlado, Validaciones y Creación (`POST`)**          | - En `src/components/FormularioPersonaje.jsx`, conectar inputs con `useInput` o `useState`.<br>- Prevenir recarga con `e.preventDefault()`.<br>- Validar nombre (`trim().length >= 3`) y raza.<br>- Enviar datos con `fetch` método `POST`, notificar vía `onPersonajeCreado` y reiniciar con `reset()`.                                  | `feat: implementar formulario controlado validaciones y peticion POST (Closes #5)`     |
| **#6**  | **Eliminación con Parámetros, Integración y Validación de Build**    | - En `src/App.jsx`, conectar `handleEliminar` enviando `DELETE /api/personajes/:id` y actualizando el estado.<br>- Asegurar estilos en `src/App.css` e `index.css`.<br>- Validar compilación limpia con `npm run build` y linters con `npm run lint`.                                                                                     | `feat: integrar eliminacion con parametros y validar build (Closes #6)`                |

---

## 5. 🧪 Estrategia de Autoevaluación (`scripts/classroom-check.sh`)

| Subcomando         | Propósito                          | Criterio de Verificación POSIX                                                                                                                                                                                                                                          | Salida Éxito        | Salida Fallo                                                      |
| :----------------- | :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ | :---------------------------------------------------------------- |
| `structure-check`  | Integridad de archivos             | Verifica existencia de `server/server.js`, `server/data/personajes.json`, `src/hooks/useInput.js`, `src/components/Navbar.jsx`, `src/components/PersonajeCard.jsx`, `src/components/PersonajesViewer.jsx`, `src/components/FormularioPersonaje.jsx`, configs y linters. | `CORRECTO` (exit 0) | Mensaje con archivo faltante (exit 1)                             |
| `backend-api`      | API Express                        | Valida endpoints `GET /api/personajes`, `POST /api/personajes` (201) y `DELETE /api/personajes/:id`.                                                                                                                                                                    | `CORRECTO` (exit 0) | Mensaje con endpoint faltante (exit 1)                            |
| `react-router`     | Enrutamiento declarativo           | Valida importación y renderizado de `BrowserRouter`, `Routes` y `Route` en `App.jsx`, y `NavLink`/`Link` en `Navbar.jsx`.                                                                                                                                               | `CORRECTO` (exit 0) | Mensaje indicando router o rutas faltantes (exit 1)               |
| `use-input`        | Hook `useInput`                    | Valida que `useInput.js` use `useState` y retorne `[value, onChange, reset]`.                                                                                                                                                                                           | `CORRECTO` (exit 0) | Mensaje de firma incorrecta (exit 1)                              |
| `personaje-card`   | Tarjeta y paso de argumentos       | Valida recepción de props y pase de `personaje.id` en el evento `onEliminar`.                                                                                                                                                                                           | `CORRECTO` (exit 0) | Mensaje indicando falta de props o evento sin argumentos (exit 1) |
| `keyboard-cleanup` | Listener de ventana y cleanup      | Valida `useEffect` con `addEventListener('keydown')` y desuscripción con `removeEventListener`.                                                                                                                                                                         | `CORRECTO` (exit 0) | Mensaje señalando falta de cleanup (exit 1)                       |
| `controlled-form`  | Formulario controlado y validación | Valida `e.preventDefault()`, validación de espacios con `.trim()` y petición con `method: 'POST'`.                                                                                                                                                                      | `CORRECTO` (exit 0) | Mensaje acusando falta de validación o POST ausente (exit 1)      |
| `build-check`      | Compilación Vite                   | Ejecuta `npm run build` verificando compilación limpia en `dist/`.                                                                                                                                                                                                      | `CORRECTO` (exit 0) | Mensaje con log de fallo de Vite (exit 1)                         |
| `all`              | Suite completa                     | Ejecuta todos los subcomandos en orden secuencial.                                                                                                                                                                                                                      | `CORRECTO` (exit 0) | Detiene en el primer fallo                                        |
