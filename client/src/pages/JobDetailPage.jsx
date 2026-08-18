import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [costs, setCosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h1>{job.client_name}</h1>
      <p>{job.description}</p>
      <p>Status: {job.status}</p>
      <p>Created: {new Date(job.created_at).toLocaleDateString()}</p>

      <h2>Costs</h2>
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