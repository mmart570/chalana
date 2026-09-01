import { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import JobsPage from './pages/JobsPage';
import CreateJobPage from './pages/CreateJobPage';
import JobDetailPage from './pages/JobDetailPage';
import ToolsPage from './pages/ToolsPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [refresh, setRefresh] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('chalana_token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const handleLogin = () => {
    const t = localStorage.getItem('chalana_token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
    setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem('chalana_token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
  };

  if (!token) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-widest text-white hover:text-blue-400 transition-colors">
            CHALANA
          </Link>
          <div className="flex gap-6 text-sm font-medium">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors uppercase tracking-wide">
              Jobs
            </Link>
            <Link to="/tools" className="text-slate-300 hover:text-white transition-colors uppercase tracking-wide">
              Tools
            </Link>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-semibold uppercase tracking-wide text-slate-400 hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={
            <>
              <CreateJobPage onJobCreated={() => setRefresh(r => r + 1)} />
              <JobsPage key={refresh} />
            </>
          } />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/tools" element={<ToolsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;