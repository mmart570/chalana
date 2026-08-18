import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import JobsPage from './pages/JobsPage';
import CreateJobPage from './pages/CreateJobPage';
import JobDetailPage from './pages/JobDetailPage';

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <h1>CHALANA</h1>
      <Routes>
        <Route path="/" element={
          <>
            <CreateJobPage onJobCreated={() => setRefresh(r => r + 1)} />
            <hr />
            <JobsPage key={refresh} />
          </>
        } />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;