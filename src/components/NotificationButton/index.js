import React from 'react';
import { toast } from 'react-toastify';

const NotificationButton = ({ saleId }) => {
  const handleNotifyClick = () => {
    // Simulando uma notificação usando a biblioteca react-toastify.
    // Você pode substituir isso pela lógica de notificação real.
    toast.success(`Notificação enviada para a venda com o ID: ${saleId}`, {
      position: 'top-right',
      autoClose: 3000, // Fechar automaticamente após 3 segundos
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <button onClick={handleNotifyClick}>
      Notificar
    </button>
  );
};

export default NotificationButton;
