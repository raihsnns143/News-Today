import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Shield, Loader } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      // Simple token validation - you might want to validate with your API
      if (token) {
        // Here you could add token validation logic
        // For now, just check if token exists
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <Shield size={32} className="text-white animate-pulse" />
          </div>
          <div className="flex items-center gap-2 text-white">
            <Loader size={20} className="animate-spin" />
            <span className="text-lg font-medium">Verifying access...</span>
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
