import React from 'react';
import Navbar from './components/Navbar';
import MermaidEditor from './components/MermaidEditor';

function App() {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-200">
      <Navbar />
      <main className="flex-grow p-4 overflow-hidden w-full">
        <MermaidEditor />
      </main>
    </div>
  );
}

export default App;