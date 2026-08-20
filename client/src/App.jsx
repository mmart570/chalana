import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import JobsPage from './pages/JobsPage';
import CreateJobPage from './pages/CreateJobPage';
import JobDetailPage from './pages/JobDetailPage';
import ToolsPage from './pages/ToolsPage';

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <h1>CHALANA</h1>
      <nav>
        <Link to="/">Jobs</Link> | <Link to="/tools">Tools</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <>
            <CreateJobPage onJobCreated={() => setRefresh(r => r + 1)} />
            <hr />
            <JobsPage key={refresh} />
            <hr />
            <ToolsPage key={refresh} />
          </>
        } />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/tools" element={<ToolsPage />} />
      </Routes>
    </div>
  );
}

export default App;