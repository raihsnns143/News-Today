import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-5 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-3">
          <NavLink
            to="/admin/dashboard"
            className="block hover:bg-slate-700 p-2 rounded"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/news"
            className="block hover:bg-slate-700 p-2 rounded"
          >
            Manage News
          </NavLink>

          <NavLink
            to="/admin/news/add"
            className="block hover:bg-slate-700 p-2 rounded"
          >
            Add News
          </NavLink>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/auth/login";
            }}
            className="w-full text-left hover:bg-red-600 p-2 rounded mt-6"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
