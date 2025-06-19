
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br'; // aqui está a mágica

import './fullcalendar-custom.css';
import { useNavigate } from 'react-router-dom';


const Calendar = ({manutencoes = []}) => {
  const navigate = useNavigate();
  const handleEventClick = ({ event }) => {
    
    const { type, entityId } = event.extendedProps;

    if (type === 'm') {
      console.log(`Manutenção clicada: ${entityId}`);
      return navigate(`/manutencoes/${entityId}`);
    }

    // Pode abrir um modal de edição, por exemplo
  };

  const handleDateClick = (arg: any) => {
    
    // Aqui você pode abrir um modal para agendar, por exemplo
  };

  const manutencoesAgenda = manutencoes.map((manutencao) => {
    return {
      title: `${manutencao.paciente_nome} - ${manutencao.dentista_nome}`,
      start: manutencao.data_hora,
      end: manutencao.data_hora_fim,
      extendedProps: {
        type: 'm',
        entityId: manutencao.id,
      }
    };
  });
  
  const events = [
    ...manutencoesAgenda,
    // Adicione outros eventos aqui, se necessário
  ];

  return (
    <FullCalendar
      locale={ptBrLocale} // Definindo o idioma para português do Brasil
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      events={events}
      dateClick={handleDateClick}
      eventClick={handleEventClick} 
      editable={true}
      selectable={true}
    />
  );
};

export default Calendar;
