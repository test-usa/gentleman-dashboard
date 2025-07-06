// Error.tsx
import React from 'react';

const Error: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-lg text-gray-700">Oops! Something went wrong.</p>
      </div>
    </div>
  );
};

export default Error;
