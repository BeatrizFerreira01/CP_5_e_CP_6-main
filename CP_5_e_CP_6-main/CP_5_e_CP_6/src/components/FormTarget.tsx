import React, { useState } from 'react';
import { createTarget } from '../api';

interface FormTargetProps {
  onSubmit: (name: string) => void; 
}

const FormTarget: React.FC<FormTargetProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name);
    createTarget(name);
    setName(''); 
  };

  return (
    <form onSubmit={handleSubmit} className="form-target">
      <input
        type="text"
        placeholder="Nome do Target"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="target-input"
      />
      <button type="submit" className="save-target-button">Salvar Target</button>
    </form>
  );
};

export default FormTarget;
