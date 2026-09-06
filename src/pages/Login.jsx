import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../common/Container';
import { FaUser, FaLock, FaChevronRight, FaCheck } from 'react-icons/fa';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in your email and password.');
      return;
    }
    login(email, password);
    setSuccess(true);
    setTimeout(() => {
      navigate('/shop');
    }, 1200);
  };

  const handleDemoLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('demo1234');
    login(demoEmail, 'demo1234');
    setSuccess(true);
    setTimeout(() => {
      navigate('/shop');
    }, 1200);
  };

  return (
    <div className="py-12 bg-white dark:bg-zinc-950 transition-colors min-h-screen">
      <Container>
        {/* Breadcrumb Header */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <FaChevronRight className="text-[9px]" />
            <span className="font-semibold text-black dark:text-white">Account Login</span>
          </div>
          <h1 className="font-bold text-3xl text-gray-900 dark:text-zinc-100">Sign In to Orebi</h1>
        </div>

        <div className="max-w-md mx-auto bg-gray-50 dark:bg-zinc-900 p-8 border border-gray-200 dark:border-zinc-800 rounded-sm">
          {success ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-sm text-center space-y-2">
              <FaCheck className="text-3xl text-emerald-600 mx-auto" />
              <h3 className="font-bold text-lg">Login Successful!</h3>
              <p className="text-xs">Redirecting to shop...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-zinc-300 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                  />
                  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-zinc-300 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                  />
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-zinc-400">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="accent-black"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link sent!"); }} className="text-gray-500 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Sign In
              </button>

              <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 space-y-2">
                <p className="text-xs text-center text-gray-500 dark:text-zinc-400">Or sign in with demo account:</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('customer@orebi.com')}
                    className="flex-1 py-1.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs font-semibold hover:bg-gray-100"
                  >
                    Demo Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('admin@orebi.com')}
                    className="flex-1 py-1.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs font-semibold hover:bg-gray-100"
                  >
                    Demo Admin
                  </button>
                </div>
              </div>

              <p className="text-xs text-center text-gray-600 dark:text-zinc-400 pt-4">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold text-black dark:text-white hover:underline">
                  Create One Now
                </Link>
              </p>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Login;
