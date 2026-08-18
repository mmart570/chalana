import { useState } from 'react';
import axios from 'axios';

function CreateJobPage({ onJobCreated }) {
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/jobs`, {
        client_name: clientName,
        description: description,
      });
      setClientName('');
      setDescription('');
      if (onJobCreated) onJobCreated();
    } catch (err) {
      setError('Failed to create job. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>New Job</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Client Name</label><br />
          <input
            type="text"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Description</label><br />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Job'}
        </button>
      </form>
    </div>
  );
}

export default CreateJobPage;