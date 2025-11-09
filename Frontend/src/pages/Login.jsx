import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/client';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 rounded-xl bg-slate-900/60 border border-slate-800 p-6">
      <h2 className="text-xl font-bold">Sign In</h2>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
        {error && <div className="text-sm text-red-300 bg-red-900/30 border border-red-900 rounded-md px-3 py-2">{error}</div>}
        <label className="text-sm">
          Email
          <input className="mt-1 w-full rounded-md bg-slate-950 border border-slate-800 px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="text-sm">
          Password
          <input className="mt-1 w-full rounded-md bg-slate-950 border border-slate-800 px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
        </label>
        <button type="submit" className="mt-1 px-4 py-2 rounded-md bg-gradient-to-r from-brand to-brand-teal text-slate-900 font-bold">Sign In</button>
      </form>
      <p className="text-sm text-slate-400 mt-3">New here? <Link className="text-slate-200 underline" to="/signup">Create an account</Link></p>
    </div>
  );
}


