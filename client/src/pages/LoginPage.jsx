import { useState, useEffect } from 'react';
import axios from 'axios';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [displayed, setDisplayed] = useState('');
  const fullText = 'CHALANA';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        username,
        password
      });
      localStorage.setItem('chalana_token', res.data.token);
      onLogin();
    } catch (err) {
      setError('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-full max-w-sm">
        {/* Logo with typing animation */}
        <div className="text-center mb-10">
          <h1 style={{ fontFamily: 'monospace' }} className="text-5xl font-bold tracking-widest text-white mb-2">
            {displayed}
            <span className="animate-pulse text-blue-400">|</span>
          </h1>
          <p className="text-slate-400 text-sm uppercase tracking-widest" style={{ fontFamily: 'monospace' }}>
            Business Management
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400" style={{ fontFamily: 'monospace' }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="mt-2 w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ fontFamily: 'monospace' }}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-400" style={{ fontFamily: 'monospace' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-2 w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ fontFamily: 'monospace' }}
              />
            </div>
            {error && <p className="text-red-400 text-sm" style={{ fontFamily: 'monospace' }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white font-semibold uppercase tracking-widest text-sm py-3 rounded-lg hover:bg-blue-500 transition-colors mt-2"
              style={{ fontFamily: 'monospace' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;