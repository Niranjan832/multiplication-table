import React, { useState } from 'react';

export default function MultiplicationTable() {
  const [number, setNumber] = useState('');
  const [upto, setUpto] = useState('');
  const [table, setTable] = useState([]);
  const [error, setError] = useState('');

  const handleGenerate = (e) => {
    e?.preventDefault();
    setError('');

    const n = Number(number);
    const u = Number(upto);

    if (!Number.isFinite(n) || Number.isNaN(n)) {
      setError('Please enter a valid number to multiply.');
      setTable([]);
      return;
    }
    if (!Number.isFinite(u) || Number.isNaN(u) || u <= 0) {
      setError('Please enter a valid positive multiplier limit (e.g. 10).');
      setTable([]);
      return;
    }

    const newTable = [];
    for (let i = 1; i <= u; i++) {
      newTable.push({
        multiplier: i,
        product: n * i,
      });
    }

    setTable(newTable);
  };

  const handleClear = () => {
    setNumber('');
    setUpto('');
    setTable([]);
    setError('');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Multiplication Table Generator</h1>

      <form onSubmit={handleGenerate} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Number</label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter number (e.g. 7)"
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Multiply till</label>
            <input
              type="number"
              value={upto}
              onChange={(e) => setUpto(e.target.value)}
              placeholder="Enter limit (e.g. 12)"
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Generate
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Clear
          </button>
        </div>
      </form>

      {table.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">Table for {number}</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 text-left">#</th>
                <th className="border px-3 py-2 text-left">Expression</th>
                <th className="border px-3 py-2 text-left">Product</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row) => (
                <tr key={row.multiplier}>
                  <td className="border px-3 py-2">{row.multiplier}</td>
                  <td className="border px-3 py-2">{`${number} × ${row.multiplier}`}</td>
                  <td className="border px-3 py-2">{row.product}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
