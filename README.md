# Ejercitación: Eventos y Formularios en React (Dragon Ball Character Hub)

![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![React Router](https://img.shields.io/badge/React_Router-6.x-red.svg)
![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg)
![Express](https://img.shields.io/badge/Express-4.x-black.svg)
![Classroom](https://img.shields.io/badge/GitHub_Classroom-Autograding-success.svg)

Bienvenido a la ejercitación práctica sobre **Manejo de Eventos y Formularios en React con React Router y Backend Express** de la cátedra de **Programación II** (Ingeniería en Informática / Licenciatura en Sistemas).

En esta actividad integrarás de manera práctica todos los conceptos vistos hasta el momento: enrutamiento declarativo en Single Page Applications con **React Router**, manejo de eventos sintéticos, componentes controlados, validaciones de usuario, y consumo de una API REST construida en **Express** con datos auténticos del universo de **Dragon Ball** (scraped de [Dragon Ball API](https://web.dragonball-api.com/)).

---

## 🎯 Objetivos de Aprendizaje

1. **Enrutamiento declarativo con React Router (`react-router-dom`):**
   - Configurar `BrowserRouter`, `Routes` y `Route` en `App.jsx`.
   - Navegación sin recargas entre el Visor (`/`) y el Formulario de Alta (`/nuevo`) con `NavLink`.
   - Definir ruta comodín (`*`) para páginas no encontradas (404).
2. **Eventos sintéticos en React:** Dominar `onClick`, `onChange`, `onSubmit` y la prevención de comportamientos por defecto (`e.preventDefault()`).
3. **Paso de parámetros a manejadores de eventos:** Pasar argumentos dinámicos (como el ID del guerrero) a los callbacks: `(id, e) => handleEliminar(id, e)`.
4. **Formularios con componentes controlados:** Enlazar el valor del input al estado de React (`value` + `onChange`).
5. **Reutilización de Custom Hooks:** Utilizar el hook `useInput` (suministrado resuelto por la cátedra en `src/hooks/useInput.js`) para gestionar `value`, `onChange` y la función de limpieza `reset`.
6. **Validaciones en cliente:** Validar requisitos de entrada (`trim()`, longitud mínima) antes de despachar solicitudes al backend.
7. **Consumo de API REST Full-Stack (GET, POST, DELETE):**
   - Cargar datos al montar el componente con `useEffect` (`GET /api/personajes`).
   - Crear nuevos guerreros enviando un payload JSON con `fetch` (`POST /api/personajes`).
   - Eliminar guerreros seleccionados mediante `fetch` (`DELETE /api/personajes/:id`).
8. **Ciclo de vida y limpieza de eventos:** Escuchar atajos globales de teclado (`keydown`) y desuscribir correctamente el listener en la función _cleanup_ de `useEffect`.

---

## 🏗️ Arquitectura de la Solución

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

## 🚀 Puesta en Marcha

### 1. Clonar el repositorio e instalar dependencias

```bash
npm install
```

### 2. Iniciar el servidor backend (Express)

El backend corre en `http://localhost:3000` y expone los endpoints de la API:

```bash
npm run server
```

> 💡 **Nota:** Deja esta terminal corriendo en segundo plano o ábrela en una pestaña secundaria de tu terminal.

### 3. Iniciar el servidor de desarrollo del Frontend (Vite)

En otra terminal, ejecuta:

```bash
npm run dev
```

La aplicación se abrirá en tu navegador en `http://localhost:5173`.

---

## 📋 Matriz de Entregas y Commits Sugeridos

Trabaja de manera incremental resolviendo una Issue a la vez. Cada componente cuenta con comentarios `// TODO:` detallados para orientar tu desarrollo. Al completar los criterios de cada issue, realiza el commit indicando `Closes #n`:

| Issue # | Título de la Tarea                                                   | Criterios Clave de Aceptación                                                                                                                                                                               | Commit sugerido                                                                        |
| :-----: | :------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| **#1**  | **Servidor Express y Colección de Datos**                            | Configurar `server/server.js`, middlewares `cors` y `express.json`, datos en `server/data/personajes.json`, y endpoints `GET`, `POST` (status 201) y `DELETE`.                                              | `feat: configurar servidor express con endpoints GET POST DELETE (Closes #1)`          |
| **#2**  | **Enrutamiento con React Router y Barra de Navegación**              | Configurar `BrowserRouter`, `Routes` y `Route` en `src/App.jsx`. En `src/components/Navbar.jsx`, renderizar enlaces con `NavLink` hacia `'/'` y `'/nuevo'`, y ruta comodín `*`.                             | `feat: configurar react router rutas y navbar (Closes #2)`                             |
| **#3**  | **Componente `PersonajeCard` y Paso de Argumentos**                  | En `src/components/PersonajeCard.jsx`, recibir `{ personaje, onEliminar }`, renderizar datos del guerrero y vincular botón de eliminación pasando el ID: `onClick={(e) => onEliminar(personaje.id, e)}`.    | `feat: implementar componente presentacional PersonajeCard con argumentos (Closes #3)` |
| **#4**  | **Visor de Guerreros: Carga Inicial (`GET`) y Teclado con Limpieza** | En `src/App.jsx`, usar `useEffect` con `fetch` para cargar personajes. En `PersonajesViewer.jsx` implementar navegación circular y listener `keydown` con **función de limpieza** `removeEventListener`.    | `feat: integrar peticion GET inicial y visor con navegacion de teclado (Closes #4)`    |
| **#5**  | **Formulario Controlado, Validaciones y Creación (`POST`)**          | En `src/components/FormularioPersonaje.jsx`, conectar inputs con `useInput` o `useState`, validar nombre (`trim().length >= 3`), `e.preventDefault()`, enviar `POST` con `fetch` y reiniciar con `reset()`. | `feat: implementar formulario controlado validaciones y peticion POST (Closes #5)`     |
| **#6**  | **Eliminación con Parámetros, Integración y Build**                  | Conectar eliminación en `App.jsx`, ajustar notificaciones visuales, y verificar que `npm run build` y linters compilen sin advertencias.                                                                    | `feat: integrar eliminacion con parametros y validar build (Closes #6)`                |

---

## 🧪 Autoevaluación y Calidad de Código

Puedes evaluar tu progreso en cualquier momento ejecutando el script de autograding localmente:

### Evaluación granular por tarea:

```bash
# 1. Verificar integridad de la estructura
bash scripts/classroom-check.sh structure-check

# 2. Verificar endpoints del backend Express
bash scripts/classroom-check.sh backend-api

# 3. Verificar enrutamiento con React Router
bash scripts/classroom-check.sh react-router

# 4. Verificar custom hook useInput (provisto por la cátedra)
bash scripts/classroom-check.sh use-input

# 5. Verificar componente PersonajeCard y pase de argumentos
bash scripts/classroom-check.sh personaje-card

# 6. Verificar listener de teclado y cleanup en el visor
bash scripts/classroom-check.sh keyboard-cleanup

# 7. Verificar formulario controlado, validaciones y POST
bash scripts/classroom-check.sh controlled-form

# 8. Verificar compilación de producción con Vite
bash scripts/classroom-check.sh build-check
```

### Evaluación completa de todas las entregas:

```bash
npm test
# o bien:
bash scripts/classroom-check.sh all
```

### Linters y Formateo:

```bash
# Validar reglas de estilo y sintaxis
npm run lint

# Formatear el código con Prettier
npm run format
```
