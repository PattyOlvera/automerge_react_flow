import React, { useState, useEffect, useRef, useCallback } from 'react';
import mermaid from 'mermaid';

interface Node {
  id: string;
  label: string;
}

const MermaidEditor: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'A', label: 'Start' },
    { id: 'B', label: 'Process_1' },
    { id: 'C', label: 'End' }
  ]);
  const [newNodeLabel, setNewNodeLabel] = useState<string>('');
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      securityLevel: 'loose',
      theme: 'default',
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true
      }
    });
  }, []);

  const renderDiagram = useCallback(() => {
    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = '';
      mermaid.render('mermaid-diagram', generateMermaidCode()).then((result) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = result.svg;
        }
      });
    }
  }, [nodes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      renderDiagram();
    }, 100);
    return () => clearTimeout(timer);
  }, [renderDiagram]);

  const addNode = (): void => {
    if (newNodeLabel.trim() !== '') {
      const newId = String.fromCharCode(65 + nodes.length);
      const newNode: Node = { id: newId, label: newNodeLabel.replace(/\s+/g, '_') };
      setNodes([...nodes.slice(0, -1), newNode, nodes[nodes.length - 1]]);
      setNewNodeLabel('');
    }
  };

  const generateMermaidCode = (): string => {
    let code = 'flowchart LR\n';
    for (let i = 0; i < nodes.length - 1; i++) {
      code += `    ${nodes[i].id}[${nodes[i].label}] --> ${nodes[i + 1].id}[${nodes[i + 1].label}]\n`;
    }
    return code;
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-4 flex space-x-2 items-center w-full">
        <input
          type="text"
          value={newNodeLabel}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewNodeLabel(e.target.value)}
          placeholder="Enter node label"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mb-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          onClick={addNode}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Node
        </button>
      </div>
      <div ref={mermaidRef} className="mermaid bg-gray-100 p-4 rounded flex-grow overflow-auto w-full"></div>
    </div>
  );
};

export default MermaidEditor;