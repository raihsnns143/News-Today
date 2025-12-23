import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Plus,
  Settings,
  LogOut,
  Menu,
  X,
  Shield
} from "lucide-react";
import { useState, useEffect } from "react";

const Sidebar = ({ isOpen, onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Auto-collapse on mobile
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) { // lg breakpoint
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const menuItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      exact: true
    },
    {
      path: "/admin/news",
      label: "News Management",
      icon: FileText,
      exact: false
    },
    {
      path: "/admin/news/add",
      label: "Add Article",
      icon: Plus,
      exact: true
    }
  ];

  const isActive = (path, exact) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        h-screen bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-lg transition-all duration-300 fixed left-0 top-0 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                <Shield size={20} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">News Portal</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 hidden lg:block"
            >
              {isCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onClose()} // Close on mobile after navigation
                className={() => `
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                  ${active
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                  }
                `}
              >
                <Icon size={20} className={active ? 'text-white' : 'text-gray-500 group-hover:text-indigo-600'} />
                {!isCollapsed && (
                  <span className={`font-medium ${active ? 'text-white' : ''} hidden sm:inline`}>
                    {item.label}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/admin/login";
            }}
            className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="font-medium hidden sm:inline">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
