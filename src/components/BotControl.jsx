import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const BotControl = () => {
  const [status, setStatus] = useState('Desconectado');
  const [numero, setNumero] = useState(null);

  const startBot = async () => {
    try {
      const response = await fetch('http://localhost:5000/start');
      if (response.ok) {
        setStatus('Conectando...');
      } else {
        setStatus('Erro ao conectar');
      }
    } catch (error) {
      console.error('Erro ao conectar com o bot:', error);
      setStatus('Erro ao conectar');
    }
  };

  useEffect(() => {
    socket.on('botConnected', (number) => {
      setStatus('Conectado');
      setNumero(number);
    });

    return () => {
      socket.off('botConnected');
    };
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Controle do Bot</h2>
      <div className="text-center mb-4">
        <p>Status: <span className="font-semibold">{status}</span></p>
        {numero && (
          <p>Conectado ao número: <span className="font-semibold">{numero}</span></p>
        )}
      </div>
      <button
        onClick={startBot}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Iniciar Bot
      </button>
    </div>
  );
};

export default BotControl;
