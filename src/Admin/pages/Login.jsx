import { useState } from "react";
import { api } from "../services/api";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      alert("Email & password required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login.php", { email, password });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/admin";
      } else {
        alert("Invalid login credentials");
      }
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (


    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 px-4 relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 relative z-10 transform transition-all duration-300 hover:scale-105">
        
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Admin Portal
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Secure access to manage your news portal
          </p>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="text-sm font-medium text-slate-700 mb-2 block">Email Address</label>
          <div className="flex items-center border-2 border-slate-200 rounded-xl px-4 py-3 mt-1 text-slate-700 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-200">
            <Mail size={20} className="text-slate-400 mr-3" />
            <input
              type="email"
              placeholder="admin@newsportal.com"
              className="w-full outline-none bg-transparent placeholder-slate-400"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="text-sm font-medium text-slate-700 mb-2 block">Password</label>
          <div className="flex items-center border-2 border-slate-200 rounded-xl px-4 py-3 mt-1 text-slate-700 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-200">
            <Lock size={20} className="text-slate-400 mr-3" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full outline-none bg-transparent placeholder-slate-400"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="text-slate-400 hover:text-indigo-600 transition-colors duration-200 ml-2"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Signing In...
            </div>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Raihan News Portal
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Secure • Reliable • Fast
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
