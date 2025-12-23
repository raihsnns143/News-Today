import { useEffect, useState } from "react";
import StatCard from "./components/StatCard";
import { api } from "./services/api";
import { BarChart3, Calendar, Clock, TrendingUp, FileText, Users } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats.php");
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded-lg w-64 mb-6 lg:mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded w-16 mb-2"></div>
                  <div className="h-2 bg-gray-300 rounded w-12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                <span className="hidden sm:inline">Welcome back, Admin! 👋</span>
                <span className="sm:hidden">Welcome! 👋</span>
              </h1>
              <p className="text-base lg:text-lg text-gray-600 hidden sm:block">
                Here's what's happening with your news portal today
              </p>
            </div>

            <div className="flex items-center gap-6 bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={20} />
                <span className="font-medium">{currentDate}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={20} />
                <span className="font-medium">{currentTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total News" value={stats.news || 0} />
          <StatCard title="Categories" value={stats.categories || 0} />
          <StatCard title="Reporters" value={stats.reporters || 0} />
          <StatCard title="Views Today" value={stats.views || 0} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={24} className="text-indigo-600" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <BarChart3 size={20} />
              <span className="font-medium">View Analytics</span>
            </button>
            <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <FileText size={20} />
              <span className="font-medium">Add News</span>
            </button>
            <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Users size={20} />
              <span className="font-medium">Manage Users</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
