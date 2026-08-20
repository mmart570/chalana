import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    
    if (loading) return <p>Loading tools...</p>;
    
    const addTool = async (e) => {
        e.preventDefault();
        await axios.post(`${import.meta.env.VITE_API_URL}/tools`, { name: newToolName });
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tools`);
        setTools(res.data);
        setNewToolName('');
      };
    
      return (
    <div>
      <h1>Tools</h1>
      {tools.length === 0 ? (
        <p>No tools yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Job ID</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {tools.map(tool => (
              <tr key={tool.id}>
                <td>{tool.name}</td>
                <td>{tool.status}</td>
                <td>{tool.job_id}</td>
                <td>{new Date(tool.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      <div>
        <h2>Add Tool</h2>
        <form onSubmit={addTool}>
            <input
            type="text"
            value={newToolName}
            onChange={e => setNewToolName(e.target.value)}
            placeholder="Tool name"
            required
            />
            <button type="submit">Add Tool</button>
        </form>
      </div>
    </div>   

    );
}

export default ToolsPage