import React, { useState, useEffect } from 'react';
import TargetList from '../../src/components/TargetList.tsx';
import FormTarget from '../../src/components/FormTarget.tsx';
import FormTodo from '../../src/components/FormTodo.tsx';
import { getTargets, deleteTarget, createTodo } from '../../src/api.ts'; 
import '../index.css'; 

// Definindo a interface para um Target
interface Target {
  id: string;
  name: string;
}

const App: React.FC = () => {
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  const [targets, setTargets] = useState<Target[]>([]);
  const [todoDescription, setTodoDescription] = useState<string>(''); 

  useEffect(() => {
    fetchTargets();
  }, []);

  const fetchTargets = async () => {
    try {
      const response = await getTargets();
      setTargets(response.data); 
    } catch (error) {
      console.error('Error fetching targets:', error);
    }
  };

  const handleSelectTarget = (targetId: string) => {
    setSelectedTargetId(targetId);
  };

  const handleDeleteTarget = async (targetId: string) => {
    if (window.confirm('Tem certeza de que deseja excluir este target?')) {
      await deleteTarget(targetId);
      fetchTargets(); 
    }
  };

  const handleCreateTodo = async () => {
    if (todoDescription.trim() === '' || !selectedTargetId) return;
    await createTodo(selectedTargetId, todoDescription);
    setTodoDescription(''); 
  };

  return (
    <div className="container">
      {/* Seção de Clima */}
      <div className="weather-section">
        <div className="current-weather">
          <img src="/src/assets/react.svg" className="weather-icon" alt="React icon" /><br />
          <h5 className="description">
            CP 5 e 6 de Consumo de API TODO/TARGETS com design de Weather!<br /><br />
            Por: Beatriz Ferreira Cruz - RM555698
          </h5>
        </div>

        <div className="hourly-weather">
          <ul className="weather-list"></ul>
        </div>
      </div>

      <h1>Insira uma Localização</h1>

      <TargetList 
        targets={targets} 
        onSelect={handleSelectTarget} 
        onDelete={handleDeleteTarget}
      />

      <div className="actions-section">
        <h2>Gerenciar Targets e TODOs</h2>

        <div className="target-actions">
          <h3>Target</h3>
          <FormTarget onSubmit={fetchTargets} />
          <button onClick={() => console.log('Criar Target')}>Criar Target</button>
          <button onClick={() => console.log('Editar Target')}>Editar Target</button>
          <button onClick={() => console.log('Deletar Target')}>Deletar Target</button>
        </div>

        {selectedTargetId && (
          <div className="todo-actions">
            <h3>TODO</h3>
            <FormTodo 
              targetId={selectedTargetId} 
              onSubmit={handleCreateTodo} 
            />
            <input
              type="text"
              placeholder="Descrição do TODO"
              value={todoDescription}
              onChange={(e) => setTodoDescription(e.target.value)}
            />
            <button onClick={handleCreateTodo}>Criar TODO</button>
            <button onClick={() => console.log('Editar TODO')}>Editar TODO</button>
            <button onClick={() => console.log('Deletar TODO')}>Deletar TODO</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
