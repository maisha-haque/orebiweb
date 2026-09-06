import React from 'react';
import Container from '../common/Container';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="py-24 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 min-h-[70vh] flex items-center justify-center transition-colors">
      <Container>
        <div className="max-w-md mx-auto text-center space-y-4">
          <h1 className="text-8xl font-black text-gray-900 dark:text-zinc-100 tracking-widest">404</h1>
          <h2 className="text-xl font-bold text-gray-800 dark:text-zinc-200">Page Not Found</h2>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="pt-4">
            <Link
              to="/"
              className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider inline-block hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Error;