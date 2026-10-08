#!/usr/bin/env bash

# scripts/classroom-check.sh - Autograding script for Classmoji.io & GitHub Classroom
# Programación II - Ejercitación: Eventos y Formularios en React (Dragon Ball Hub)

set -u

command="${1:-all}"

error_exit() {
  echo "ERROR: $1" >&2
  exit 1
}

success_exit() {
  echo "CORRECTO"
  exit 0
}

# Limpia comentarios multilínea y de una línea en un archivo JS/JSX y colapsa espacios en blanco
clean_code() {
  local file="$1"
  local NODE_BIN=""
  if command -v node >/dev/null 2>&1; then
    NODE_BIN="node"
  elif command -v node.exe >/dev/null 2>&1; then
    NODE_BIN="node.exe"
  fi

  if [[ -n "$NODE_BIN" && -f "$file" ]]; then
    "$NODE_BIN" -e "
      const fs = require('fs');
      try {
        let code = fs.readFileSync('$file', 'utf8');
        code = code.replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ');
        code = code.replace(/\/\*[\s\S]*?\*\//g, ' ');
        code = code.replace(/\/\/.*$/gm, ' ');
        code = code.replace(/\s+/g, ' ');
        process.stdout.write(code);
      } catch (e) {
        process.exit(1);
      }
    "
  elif [[ -f "$file" ]]; then
    tr '\n' ' ' < "$file" | sed -e 's|//.*$||g'
  else
    echo ""
  fi
}

check_structure() {
  required_files=(
    "package.json"
    "index.html"
    "vite.config.js"
    ".eslintrc.json"
    ".stylelintrc.json"
    ".prettierrc.js"
    "server/server.js"
    "server/data/personajes.json"
    "src/main.jsx"
    "src/App.jsx"
    "src/index.css"
    "src/App.css"
    "src/components/Navbar.jsx"
    "src/components/PersonajeCard.jsx"
    "src/components/PersonajesViewer.jsx"
    "src/components/FormularioPersonaje.jsx"
  )

  for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
      error_exit "Falta el archivo obligatorio: $file"
    fi
  done

  # Verificar hook useInput (.js o .jsx)
  if [ ! -f "src/hooks/useInput.js" ] && [ ! -f "src/hooks/useInput.jsx" ]; then
    error_exit "Falta el hook obligatorio src/hooks/useInput.js (o .jsx)"
  fi

  return 0
}

check_backend_api() {
  if [ ! -f "server/server.js" ]; then
    error_exit "El archivo server/server.js no existe."
  fi

  local code
  code=$(clean_code "server/server.js")

  if ! echo "$code" | grep -q "express"; then
    error_exit "server/server.js debe requerir o importar express."
  fi

  if ! echo "$code" | grep -q "cors"; then
    error_exit "server/server.js debe configurar el middleware cors."
  fi

  if ! echo "$code" | grep -q "/api/personajes"; then
    error_exit "server/server.js debe declarar la ruta base /api/personajes."
  fi

  if ! echo "$code" | grep -q "post"; then
    error_exit "server/server.js debe implementar el método POST para crear personajes."
  fi

  if ! echo "$code" | grep -q "201"; then
    error_exit "server/server.js debe retornar código de estado HTTP 201 al crear un personaje."
  fi

  if ! echo "$code" | grep -q "delete"; then
    error_exit "server/server.js debe implementar el método DELETE para eliminar personajes."
  fi

  if [ ! -s "server/data/personajes.json" ]; then
    error_exit "server/data/personajes.json no contiene datos o está vacío."
  fi

  return 0
}

check_react_router() {
  if [ ! -f "src/App.jsx" ]; then
    error_exit "No existe src/App.jsx."
  fi

  local app_code
  app_code=$(clean_code "src/App.jsx")

  if ! echo "$app_code" | grep -qE "import\s+.*(BrowserRouter|Router).*from\s+['\"]react-router-dom['\"]"; then
    error_exit "En src/App.jsx no se importa BrowserRouter (o Router) desde 'react-router-dom'."
  fi

  if ! echo "$app_code" | grep -qE "import\s+.*Routes.*from\s+['\"]react-router-dom['\"]"; then
    error_exit "En src/App.jsx no se importa Routes desde 'react-router-dom'."
  fi

  if ! echo "$app_code" | grep -qE "import\s+.*Route.*from\s+['\"]react-router-dom['\"]"; then
    error_exit "En src/App.jsx no se importa Route desde 'react-router-dom'."
  fi

  if ! echo "$app_code" | grep -qE "<(BrowserRouter|Router)"; then
    error_exit "En src/App.jsx no se está renderizando el componente <BrowserRouter> (o <Router>)."
  fi

  if ! echo "$app_code" | grep -qE "<Routes"; then
    error_exit "En src/App.jsx no se está renderizando el contenedor <Routes>."
  fi

  if ! echo "$app_code" | grep -qE "<Route"; then
    error_exit "En src/App.jsx no se están definiendo rutas con el componente <Route>."
  fi

  local nav_code
  nav_code=$(clean_code "src/components/Navbar.jsx")

  if ! echo "$nav_code" | grep -qE "import\s+.*(NavLink|Link).*from\s+['\"]react-router-dom['\"]"; then
    error_exit "En src/components/Navbar.jsx no se importa NavLink o Link desde 'react-router-dom'."
  fi

  return 0
}

check_use_input() {
  local hook_file="src/hooks/useInput.js"
  if [ ! -f "$hook_file" ]; then
    hook_file="src/hooks/useInput.jsx"
  fi

  local code
  code=$(clean_code "$hook_file")

  if ! echo "$code" | grep -q "useState"; then
    error_exit "El hook useInput debe utilizar useState para gestionar el valor del input."
  fi

  if ! echo "$code" | grep -E -q "return\s*\["; then
    error_exit "El hook useInput debe retornar un arreglo con la tupla [value, onChange, reset]."
  fi

  return 0
}

check_personaje_card() {
  local card_file="src/components/PersonajeCard.jsx"
  if [ ! -f "$card_file" ]; then
    error_exit "No existe el componente $card_file."
  fi

  local code
  code=$(clean_code "$card_file")

  if ! echo "$code" | grep -q "personaje"; then
    error_exit "PersonajeCard.jsx debe recibir la prop 'personaje'."
  fi

  if ! echo "$code" | grep -q "onEliminar"; then
    error_exit "PersonajeCard.jsx debe recibir el callback 'onEliminar'."
  fi

  if ! echo "$code" | grep -E -q "onEliminar\(\s*personaje\.id"; then
    error_exit "PersonajeCard.jsx debe pasar 'personaje.id' como argumento al invocar onEliminar."
  fi

  return 0
}

check_keyboard_cleanup() {
  local viewer_file="src/components/PersonajesViewer.jsx"
  if [ ! -f "$viewer_file" ]; then
    error_exit "No existe el componente $viewer_file."
  fi

  local code
  code=$(clean_code "$viewer_file")

  if ! echo "$code" | grep -q "useEffect"; then
    error_exit "PersonajesViewer.jsx debe utilizar useEffect para los atajos de teclado."
  fi

  if ! echo "$code" | grep -q "addEventListener"; then
    error_exit "PersonajesViewer.jsx debe registrar el listener con window.addEventListener."
  fi

  if ! echo "$code" | grep -q "removeEventListener"; then
    error_exit "PersonajesViewer.jsx debe implementar la función de limpieza (cleanup) con window.removeEventListener."
  fi

  return 0
}

check_controlled_form() {
  local form_file="src/components/FormularioPersonaje.jsx"
  if [ ! -f "$form_file" ]; then
    error_exit "No existe el componente $form_file."
  fi

  local code
  code=$(clean_code "$form_file")

  if ! echo "$code" | grep -q "preventDefault"; then
    error_exit "FormularioPersonaje.jsx debe invocar e.preventDefault() en el manejador del formulario."
  fi

  if ! echo "$code" | grep -q "trim"; then
    error_exit "FormularioPersonaje.jsx debe limpiar espacios con .trim() al validar."
  fi

  if ! echo "$code" | grep -E -q "method:\s*['\"]POST['\"]"; then
    error_exit "FormularioPersonaje.jsx debe realizar una petición fetch con method 'POST'."
  fi

  return 0
}

check_build() {
  echo "Ejecutando verificación de build con Vite..."
  npm run build > /dev/null 2>&1 || error_exit "Falló la compilación de producción con 'npm run build'."
  return 0
}

case "$command" in
  structure-check)
    check_structure
    success_exit
    ;;
  backend-api)
    check_backend_api
    success_exit
    ;;
  react-router)
    check_react_router
    success_exit
    ;;
  use-input)
    check_use_input
    success_exit
    ;;
  personaje-card)
    check_personaje_card
    success_exit
    ;;
  keyboard-cleanup)
    check_keyboard_cleanup
    success_exit
    ;;
  controlled-form)
    check_controlled_form
    success_exit
    ;;
  build-check)
    check_build
    success_exit
    ;;
  all)
    check_structure
    check_backend_api
    check_react_router
    check_use_input
    check_personaje_card
    check_keyboard_cleanup
    check_controlled_form
    check_build
    success_exit
    ;;
  *)
    error_exit "Subcomando desconocido: $command. Opciones válidas: structure-check, backend-api, react-router, use-input, personaje-card, keyboard-cleanup, controlled-form, build-check, all."
    ;;
esac
