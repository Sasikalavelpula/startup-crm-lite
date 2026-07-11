import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, ArrowRight, ShieldAlert } from 'lucide-react';

/**
 * Register Page - User creation portal for Startup CRM Lite.
 * Includes client-side validations, error feedback, and styles matching the theme.
 */
const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Submission handler with validation checks
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validations
    if (password.length < 6) {
      const errMsg = 'Password must be at least 6 characters long';
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    if (password !== confirmPassword) {
      const errMsg = 'Passwords do not match';
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Creating account...');

    try {
      await register(name, email, password);
      toast.success('Account created successfully!', { id: toastId });
      // Redirect to dashboard page
      navigate('/');
    } catch (err) {
      console.error('Registration form submit failure:', err);
      // Unpack response error payload message
      const errMsg = err.response?.data?.message || err.message || 'Failed to register account';
      setError(errMsg);
      toast.error(errMsg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-200 relative overflow-hidden select-none font-roboto">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Decorative background blob shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>

      {/* Register Card frame */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-xl relative z-10 transition-colors duration-200 animate-scale-up">
        {/* Brand logo header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/20 mb-3">
            S
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Get Started</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">Create an account to access the CRM</p>
        </div>

        {/* Validation/API error panel */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-start gap-2.5 animate-fade-in">
            <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="font-medium leading-relaxed">{error}</span>
          </div>
        )}

        {/* Form elements */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name input */}
          <div className="space-y-1.25">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider block">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-text min-h-[44px]"
              />
            </div>
          </div>

          {/* Email input */}
          <div className="space-y-1.25">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-text min-h-[44px]"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1.25">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-text min-h-[44px]"
              />
            </div>
          </div>

          {/* Confirm Password input */}
          <div className="space-y-1.25">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider block">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-text min-h-[44px]"
              />
            </div>
          </div>

          {/* Submission button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 px-5 bg-primary hover:bg-primary/95 text-white font-semibold text-sm rounded-xl transition-all duration-155 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/20 active:scale-98 min-h-[44px] mt-2 ${
              loading ? 'opacity-80 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 text-center border-t border-gray-150 dark:border-gray-700 pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary hover:text-primary/90 font-bold hover:underline transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
