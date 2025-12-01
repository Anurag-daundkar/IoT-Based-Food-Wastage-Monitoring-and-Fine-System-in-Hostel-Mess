import React, { useEffect, useState } from 'react';
import { firebaseService } from '../../services/firebaseService';

const ThresholdPage = () => {
  const [value, setValue] = useState('');
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      const v = await firebaseService.getThreshold();
      setCurrent(v);
      setValue(String(v));
    })();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const num = Number(value);
    if (!Number.isFinite(num) || num <= 0) {
      setMsg('Please enter a valid positive number');
      return;
    }
    setLoading(true);
    setMsg('');
    const ok = await firebaseService.setThreshold(num);
    if (ok) {
      setCurrent(num);
      setMsg('Threshold updated successfully');
    } else {
      setMsg('Failed to update threshold');
    }
    setLoading(false);
  };

  return (
    <div className="flex-1 ml-64">
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Smart Sentinel Admin Panel</h1>
      </header>

      <main className="p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Threshold Weight</h2>
              <p className="text-gray-600">Set the global threshold used for fine and detection logic</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-2">Current Threshold</div>
              <div className="flex items-baseline gap-2">
                <div className="text-5xl font-extrabold text-green-600">{current ?? '—'}</div>
                <div className="text-gray-600">grams</div>
              </div>
              <div className="mt-4 h-2 bg-green-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${Math.min(100, (Number(current)||0)/10)}%` }} />
              </div>
              <div className="text-xs text-gray-500 mt-2">Visualization scaled at 10g = 1%</div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Threshold (grams)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g. 500"
                      required
                    />
                    <span className="text-gray-700">g</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quick Presets</label>
                  <div className="flex flex-wrap gap-2">
                    {[250, 500, 750, 1000].map((p) => (
                      <button type="button" key={p} onClick={() => setValue(String(p))} className="px-3 py-2 rounded-lg border text-sm hover:bg-green-50">
                        {p} g
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {loading ? 'Saving...' : 'Save Threshold'}
                </button>
                {msg && (
                  <div className={`text-sm ${msg.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{msg}</div>
                )}
              </form>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About Threshold</h3>
            <p className="text-sm text-gray-600">
              The threshold is stored in Firebase under a dedicated node named <span className="font-mono">Threshold</span>.
              The system reads this value to decide when to apply fines or trigger alerts.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThresholdPage;
