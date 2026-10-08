// TODO [Issue #2]: Importar NavLink de 'react-router-dom'

/**
 * Barra de navegación principal de la aplicación utilizando React Router.
 * Permite alternar entre el Visor de Guerreros ('/') y el Formulario de Alta ('/nuevo').
 */
export default function Navbar() {
  return (
    <header className='app-header'>
      <div className='header-brand'>
        <span className='dragon-ball-icon'>⭐</span>
        <div>
          <h1>Dragon Ball Character Hub</h1>
          <p className='header-subtitle'>
            Eventos sintéticos, formularios controlados, React Router y API Express
          </p>
        </div>
      </div>

      <nav className='nav-links' aria-label='Navegación principal'>
        {/* TODO [Issue #2]:
            Reemplazar estos elementos por componentes <NavLink> de react-router-dom:
            - <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-btn nav-btn-active' : 'nav-btn')}>
                🥋 Visor de Guerreros
              </NavLink>
            - <NavLink to="/nuevo" className={({ isActive }) => (isActive ? 'nav-btn nav-btn-active' : 'nav-btn')}>
                ➕ Registrar Guerrero
              </NavLink>
        */}
        <span className='nav-btn'>🥋 Visor de Guerreros</span>
        <span className='nav-btn'>➕ Registrar Guerrero</span>
      </nav>
    </header>
  );
}
