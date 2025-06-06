import React, { useState } from 'react';

const AddCarForm: React.FC = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (year === '' || isNaN(Number(year))) {
      setStatus('Please enter a valid year');
      return;
    }

    const carData = {
      make,
      model,
      year: Number(year),
    };

    try {
      const res = await fetch('http://localhost:8000/api/cars/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData),
      });

      if (res.ok) {
        setStatus('Car added successfully!');
        setMake('');
        setModel('');
        setYear('');
      } else {
        setStatus('Failed to add car. Check backend and API.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Error adding car.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add a New Car</h2>
      {status && <p className="mb-2 text-sm text-blue-600">{status}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value === '' ? '' : Number(e.target.value))}
          required
          className="w-full border p-2 rounded"
          min={1886}  // The year of the first car invented
          max={new Date().getFullYear() + 1}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCarForm;