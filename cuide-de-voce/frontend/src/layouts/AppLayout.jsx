import Sidebar from '../components/Sidebar'

export default function AppLayout({ title, subtitle, children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        {(title || subtitle) && (
          <div className="topbar">
            <div style={{ flex: 1 }}>
              {title && <p className="topbar-title">{title}</p>}
            </div>
            {subtitle && <span className="topbar-subtitle">{subtitle}</span>}
          </div>
        )}
        <div className="page-content fade-in">
          {children}
        </div>
      </div>
    </div>
  )
}
