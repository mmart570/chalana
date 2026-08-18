import { useState } from 'react';
import JobsPage from './pages/JobsPage';
import CreateJobPage from './pages/CreateJobPage';

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <h1>CHALANA</h1>
      <CreateJobPage onJobCreated={() => setRefresh(r => r + 1)} />
      <hr />
      <JobsPage key={refresh} />
    </div>
  );
}

export default App;