import { NavLink, Outlet } from 'react-router-dom';
import QuickJump from './QuickJump';
import { useBibleIndex } from '../hooks/useStore';

const NAV = [
  { to: '/', label: 'Heute', icon: '🏠', end: true },
  { to: '/bibel', label: 'Bibel', icon: '📖', end: false },
  { to: '/suche', label: 'Suche', icon: '🔍', end: false },
  { to: '/ich', label: 'Ich', icon: '👤', end: false },
];

export default function Layout() {
  const { data: index } = useBibleIndex();

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__inner">
          <NavLink to="/" className="brand">
            <span className="brand__mark" aria-hidden="true">
              L
            </span>
            Lumina
            <span className="brand__sub">Bibel lesen und verstehen</span>
          </NavLink>

          <QuickJump index={index} />

          <nav className="mainnav" aria-label="Hauptbereiche">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `mainnav__link${isActive ? ' mainnav__link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="app__main">
        <Outlet />
      </main>

      <nav className="tabbar" aria-label="Hauptbereiche">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `tabbar__link${isActive ? ' tabbar__link--active' : ''}`}
          >
            <span className="tabbar__icon" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
