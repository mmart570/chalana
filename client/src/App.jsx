import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import JobsPage from './pages/JobsPage';
import CreateJobPage from './pages/CreateJobPage';
import JobDetailPage from './pages/JobDetailPage';
import ToolsPage from './pages/ToolsPage';

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Navbar */}
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center gap-8">
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
      </nav>

      {/* Page content */}
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