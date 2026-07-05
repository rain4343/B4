import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';

export default function Login() {
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message ?? 'هەڵەیەک ڕوویدا');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', fontFamily: "'Noto Kufi Arabic', sans-serif" }}
    >
      {/* Card */}
      <div className="w-full max-w-md mx-4">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="لۆگۆ" className="w-28 h-28 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">ئی-ڕێکار</h1>
          <p className="text-slate-400 mt-1 text-sm">سیستەمی ب.پ.شارباژێڕ</p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl p-8 shadow-2xl" style={{ background: '#1e293b', border: '1px solid #334155' }}>
          <h2 className="text-lg font-semibold text-white mb-6 text-center">چوونەژوورەوە</h2>

          {error && (
            <div className="mb-4 rounded-lg px-4 py-3 text-sm text-red-200" style={{ background: '#450a0a', border: '1px solid #7f1d1d' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                ناوی بەکارهێنەر
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="ناوی بەکارهێنەرەکەت بنووسە"
                className="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:ring-2"
                style={{
                  background: '#0f172a',
                  border: '1px solid #334155',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#0d6efd'; }}
                onBlur={(e) => { e.target.style.borderColor = '#334155'; }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                ووشەی نهێنی
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition"
                style={{ background: '#0f172a', border: '1px solid #334155' }}
                onFocus={(e) => { e.target.style.borderColor = '#0d6efd'; }}
                onBlur={(e) => { e.target.style.borderColor = '#334155'; }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
              style={{ background: '#0d6efd' }}
              onMouseOver={(e) => !loading && ((e.target as HTMLElement).style.opacity = '0.9')}
              onMouseOut={(e) => ((e.target as HTMLElement).style.opacity = '1')}
            >
              {loading ? 'چاوەڕێ بکە...' : 'چوونەژوورەوە'}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          ئی-ڕێکار &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
