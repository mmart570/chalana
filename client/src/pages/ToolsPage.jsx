import { useState, useEffect } from 'react';
import axios from 'axios';

function ToolsPage() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newToolName, setNewToolName] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/tools`)
      .then(res => {
        setTools(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const addTool = async (e) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_API_URL}/tools`, { name: newToolName });
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/tools`);
    setTools(res.data);
    setNewToolName('');
  };

  if (loading) return <p className="text-slate-500 text-sm">Loading tools...</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 uppercase tracking-wide mb-6">Tools</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Add tool form */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">Add Tool</h3>
          <form onSubmit={addTool} className="flex gap-3">
            <input
              type="text"
              value={newToolName}
              onChange={e => setNewToolName(e.target.value)}
              placeholder="Tool name"
              required
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-slate-900 text-white text-sm font-semibold uppercase tracking-wide px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </form>
        </div>

        {/* Tool count */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center gap-4">
          <div className="bg-slate-100 rounded-lg p-3">
            <span className="text-2xl">🔧</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">{tools.length}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Tools</p>
          </div>
        </div>
      </div>

      {/* Tools list */}
      <div className="mt-6 bg-white border border-slate-200 rounded-xl overflow-hidden">
        {tools.length === 0 ? (
          <p className="text-slate-400 text-sm p-6">No tools yet.</p>
        ) : (
          <div>
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                className={`flex items-center justify-between px-6 py-4 ${index !== tools.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <div>
                  <p className="font-semibold text-slate-900">{tool.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{new Date(tool.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  {tool.job_id && (
                    <span className="text-xs text-slate-400 font-mono">{tool.job_id.slice(0, 8)}...</span>
                  )}
                  <span className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${
                    tool.status === 'available'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-amber-50 text-amber-600'
                  }`}>
                    {tool.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ToolsPage;