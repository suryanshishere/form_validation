import React from 'react';
import { useLocation, Link } from 'react-router-dom';

interface SuccessState {
  [key: string]: string | boolean;
}

const Success: React.FC = () => {
  const location = useLocation();
  const state = location.state as SuccessState | null;

  if (!state) {
    return (
      <div className="text-center py-10">
        <Link to="/" className="text-blue-600">Go Back</Link>
      </div>
    );
  }

  return (
    <article className="bg-white shadow rounded-lg p-6">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Submission Successful</h2>
      </header>
      <dl className="space-y-2">
        {Object.entries(state).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <dt className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</dt>
            <dd className="text-gray-900">{value.toString()}</dd>
          </div>
        ))}
      </dl>
      <footer className="mt-6"><Link to="/" className="text-blue-600">Edit Details</Link></footer>
    </article>
  );
};

export default Success;
