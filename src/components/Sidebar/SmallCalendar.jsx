import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  width: 100%;
`;

const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: 500;
  color: #333333;
  opacity: ${props => (props.isHeader ? '0.7' : '1')};
  padding: 5px;
  cursor: ${props => (props.isHeader ? 'default' : 'pointer')};
  border-radius: 99px;
  background-color: ${props => (props.isSelected ? '#0c41ff' : 'transparent')};
  color: ${props => (props.isSelected ? 'white' : '#333333')};
  opacity: ${props => (props.isNotInMonth ? '0.3' : '1')};

  &:hover {
    background-color: ${props => !props.isHeader && !props.isSelected && '#f0f0f0'};
  }
`;

const SmallCalendar = ({ currentDate }) => {
  const [date, setDate] = useState(currentDate);
  const [days, setDays] = useState([]);

  useEffect(() => {
    setDate(currentDate);
  }, [currentDate]);

  useEffect(() => {
    generateCalendar(date);
  }, [date]);

  const generateCalendar = (d) => {
    const year = d.getFullYear();
    const month = d.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const calendarDays = [];
    
    // Previous month's days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({ day: prevMonthDays - i, inMonth: false });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({ day: i, inMonth: true, selected: i === d.getDate() });
    }

    // Next month's days
    const remaining = 42 - calendarDays.length; // 6 weeks * 7 days
    for (let i = 1; i <= remaining; i++) {
      calendarDays.push({ day: i, inMonth: false });
    }
    
    setDays(calendarDays);
  };

  const dayHeaders = ['s', 'm', 't', 'w', 't', 'f', 's'];

  return (
    <CalendarContainer>
      <CalendarGrid>
        {dayHeaders.map(h => <Day key={h} isHeader>{h}</Day>)}
        {days.map((d, i) => (
          <Day key={i} isNotInMonth={!d.inMonth} isSelected={d.selected}>
            {String(d.day).padStart(2, '0')}
          </Day>
        ))}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default SmallCalendar;
