import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [costs, setCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('labor');
  const [amount, setAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/jobs/${id}`),
      axios.get(`${import.meta.env.VITE_API_URL}/job-costs/${id}`)
    ]).then(([jobRes, costsRes]) => {
      setJob(jobRes.data);
      setCosts(costsRes.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found.</p>;

  const total = costs.reduce((sum, c) => sum + parseFloat(c.amount), 0);

  const addCosts = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/job-costs`, {
        job_id: id,
        type,
        description,
        amount
      });
      // re-fetch costs after adding
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/job-costs/${id}`);
      setCosts(res.data);
      setDescription('');
      setAmount('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>{job.client_name}</h1>
      <p>{job.description}</p>
      <p>Status: {job.status}</p>
      <p>Created: {new Date(job.created_at).toLocaleDateString()}</p>

      <h2>Costs</h2>
      <div>
        <h2>Add Cost</h2>
        <form onSubmit={addCosts}>
          <div>
            <label>Type</label>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="labor">Labor</option>
              <option value="material">Material</option>
            </select>
          </div>
          <br />
          <div>
              <label>Description</label><br />
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
          </div>
          <div>
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
            />
          </div>
            <br />
            <button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Submit'}
            </button>
        </form>
      </div>
      
      {costs.length === 0 ? (
        <p>No costs yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {costs.map(cost => (
              <tr key={cost.id}>
                <td>{cost.type}</td>
                <td>{cost.description}</td>
                <td>${parseFloat(cost.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p><strong>Total: ${total.toFixed(2)}</strong></p>
    </div>
  );
}

export default JobDetailPage;