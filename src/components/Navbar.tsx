import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-900 to-blue-600">
      <div className="max-w-screen-xl mx-auto p-4 flex justify-center items-center">
        <span className="text-2xl font-semibold whitespace-nowrap text-white">Welcome to Workflow Editor</span>
      </div>
    </nav>
  );
};

export default Navbar;