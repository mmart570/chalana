import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/jobs`)
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-slate-500 text-sm">Loading jobs...</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 uppercase tracking-wide mb-4">Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-slate-500 text-sm">No jobs yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {jobs.map(job => (
            <Link
              to={`/jobs/${job.id}`}
              key={job.id}
              className="bg-white border border-slate-200 rounded-xl px-6 py-4 flex items-center justify-between hover:border-blue-400 hover:shadow-sm transition-all"
            >
              <div>
                <p className="font-semibold text-slate-900">{job.client_name}</p>
                <p className="text-sm text-slate-500 mt-0.5">{job.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wide bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                  {job.status}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(job.created_at).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobsPage;