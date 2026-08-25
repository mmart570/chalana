import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  const [invoice, setInvoice] = useState(null);

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

  if (loading) return <p className="text-slate-500 text-sm">Loading...</p>;
  if (!job) return <p className="text-slate-500 text-sm">Job not found.</p>;

  const total = costs.reduce((sum, c) => sum + parseFloat(c.amount), 0);

  const addCosts = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/job-costs`, {
        job_id: id, type, description, amount
      });
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/job-costs/${id}`);
      setCosts(res.data);
      setDescription('');
      setAmount('');
    } catch (err) {
      console.error(err);
    }
  };

  const generateInvoice = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/invoices`, { job_id: id });
      setInvoice(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const markPaid = async () => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/invoices/${invoice.id}`, {
        payment_status: 'paid'
      });
      setInvoice(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Back link */}
      <Link to="/" className="text-xs font-semibold uppercase tracking-wide text-slate-400 hover:text-blue-500 transition-colors mb-6 inline-block">
        ← Back to Jobs
      </Link>

      {/* Job header */}
      <div className="bg-white border border-slate-200 rounded-xl px-6 py-5 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{job.client_name}</h1>
            <p className="text-slate-500 mt-1">{job.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
              {job.status}
            </span>
            <span className="text-xs text-slate-400">{new Date(job.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Add cost form */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">Add Cost</h2>
          <form onSubmit={addCosts} className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="labor">Labor</option>
                <option value="material">Material</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={2}
                className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
                className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-slate-900 text-white text-sm font-semibold uppercase tracking-wide px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Cost
            </button>
          </form>
        </div>

        {/* Costs list */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">Costs</h2>
          {costs.length === 0 ? (
            <p className="text-slate-400 text-sm">No costs yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {costs.map(cost => (
                <div key={cost.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide bg-blue-50 text-blue-600 px-2 py-0.5 rounded mr-2">
                      {cost.type}
                    </span>
                    <span className="text-sm text-slate-700">{cost.description}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">${parseFloat(cost.amount).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">Total</span>
            <span className="text-xl font-bold text-slate-900">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Invoice */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">Invoice</h2>
        {!invoice ? (
          <button
            onClick={generateInvoice}
            className="bg-slate-900 text-white text-sm font-semibold uppercase tracking-wide px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Generate Invoice
          </button>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-slate-900">${parseFloat(invoice.total_amount).toFixed(2)}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mt-1">{invoice.payment_status}</p>
            </div>
            {invoice.payment_status !== 'paid' && (
              <button
                onClick={markPaid}
                className="bg-green-600 text-white text-sm font-semibold uppercase tracking-wide px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Mark Paid
              </button>
            )}
            {invoice.payment_status === 'paid' && (
              <span className="text-sm font-semibold uppercase tracking-wide bg-green-50 text-green-600 px-4 py-2 rounded-lg">
                ✓ Paid
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetailPage;