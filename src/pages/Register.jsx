import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../common/Container';
import { FaUser, FaEnvelope, FaLock, FaChevronRight, FaCheck } from 'react-icons/fa';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (!agree) {
      alert('You must agree to the Terms & Conditions.');
      return;
    }

    register(name, email, password);
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
            <span className="font-semibold text-black dark:text-white">Register</span>
          </div>
          <h1 className="font-bold text-3xl text-gray-900 dark:text-zinc-100">Create Account</h1>
        </div>

        <div className="max-w-md mx-auto bg-gray-50 dark:bg-zinc-900 p-8 border border-gray-200 dark:border-zinc-800 rounded-sm">
          {success ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-sm text-center space-y-2">
              <FaCheck className="text-3xl text-emerald-600 mx-auto" />
              <h3 className="font-bold text-lg">Account Created!</h3>
              <p className="text-xs">Welcome to Orebi! Redirecting to shop...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-zinc-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                  />
                  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
              </div>

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
                    placeholder="alex@example.com"
                    className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                  />
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
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

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 dark:text-zinc-300 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-sm text-gray-900 dark:text-zinc-100 outline-none focus:border-black dark:focus:border-white"
                  />
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 dark:text-zinc-400 pt-1">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="accent-black"
                />
                <span>I agree to the Terms & Privacy Policy</span>
              </label>

              <button
                type="submit"
                className="w-full py-3.5 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Create Account
              </button>

              <p className="text-xs text-center text-gray-600 dark:text-zinc-400 pt-4">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-black dark:text-white hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Register;
