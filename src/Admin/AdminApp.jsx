import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./Dashboard";
import NewsList from "./News/NewsList";
import AddNews from "./News/AddNews";
import EditNews from "./News/EditNews";
import { useState } from "react";

const AdminApp = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if current route should use full-screen layout (Dashboard and News pages)
  const isFullScreenRoute = ['/admin', '/admin/news', '/admin/news/add'].includes(location.pathname) ||
                           location.pathname.startsWith('/admin/news/edit');

  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

              <div className={`flex-1 transition-all duration-300 ${
                isFullScreenRoute ? 'lg:ml-64' : 'lg:ml-64'
              }`}>
                <Topbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-6">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="news" element={<NewsList />} />
                    <Route path="news/add" element={<AddNews />} />
                    <Route path="news/edit/:id" element={<EditNews />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminApp;
