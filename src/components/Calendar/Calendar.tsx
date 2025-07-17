import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br'; 

import './fullcalendar-custom.css';
import { useNavigate } from 'react-router-dom';

const Calendar = ({manutencoes = [], consultas = []}) => {
  const navigate = useNavigate();
  const handleEventClick = ({ event }) => {
    
    const { type, entityId } = event.extendedProps;

    if (type === 'm') {
      return navigate(`/manutencoes/${entityId}`);
    }
    
    if (type === 'c') {
      return navigate(`/consultas/${entityId}`);
    }
  };

  const handleDateClick = (arg: any) => {
    //
  };

  const manutencoesAgenda = manutencoes.map((manutencao) => {
    return {
      title: `${manutencao.paciente_nome} - Manutenção`,
      start: manutencao.data_hora,
      end: manutencao.data_hora_fim,
      extendedProps: {
        type: 'm',
        entityId: manutencao.id,
      },
      backgroundColor: '#34d399',
      borderColor: '#34d399'
    };
  });
  
  const consultasAgenda = consultas.map((consulta) => {
    return {
      title: `${consulta.paciente_nome} - Consulta`,
      start: consulta.data_hora,
      end: consulta.data_hora_fim,
      extendedProps: {
        type: 'c',
        entityId: consulta.id,
      },
      backgroundColor: '#f87171',
      borderColor: '#f87171'
    };
  });
  
  const events = [
    ...manutencoesAgenda,
    ...consultasAgenda
  ];

  return (
    <FullCalendar
      locale={ptBrLocale}
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