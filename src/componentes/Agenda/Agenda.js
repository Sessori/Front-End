import { useState } from "react";
import { 
  addMonths, 
  subMonths, 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  isBefore
} from "date-fns";
import "./Agenda.css";

const Agenda = () => {
  const today = new Date(); // Data de hoje
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Impede voltar para meses anteriores ao atual
  const handlePrevMonth = () => {
    if (!isBefore(subMonths(currentDate, 1), startOfMonth(today))) {
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Corrigido: agora o calendário só exibe os dias dentro do mês atual
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  return (
    <div className="agenda-container">
      {/* Cabeçalho */}
      <div className="agenda-header">
        <button 
          onClick={handlePrevMonth} 
          className="agenda-nav-btn"
          disabled={isBefore(subMonths(currentDate, 1), startOfMonth(today))}
        >
          <img src="/icones/back.svg" alt="Mês anterior" className="agenda-icon" />
        </button>
        
        <h2>{format(currentDate, "MMMM yyyy")}</h2>

        <button onClick={handleNextMonth} className="agenda-nav-btn">
          <img src="/icones/next.svg" alt="Próximo mês" className="agenda-icon" />
        </button>
      </div>

      {/* Dias da Semana */}
      <div className="agenda-weekdays">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((day) => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>

      {/* Dias do Mês */}
      <div className="agenda-days">
        {daysInMonth.map((day, index) => {
          const isPast = isBefore(day, today) && !isSameDay(day, today); // Bloqueia dias passados

          return (
            <button
              key={index}
              onClick={() => !isPast && setSelectedDate(day)}
              className={`agenda-day ${isSameDay(day, selectedDate) ? "selected" : ""} ${isPast ? "disabled-day" : ""}`}
              disabled={isPast} // Impede seleção de dias passados
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Agenda;
