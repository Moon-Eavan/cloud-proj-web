import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MonthViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid #dadce0;
`;

const DayName = styled.div`
  text-align: center;
  padding: 10px 0;
  font-size: 11px;
  color: #70757a;
  font-weight: 500;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(120px, auto);
  flex-grow: 1;
  border-left: 1px solid #dadce0;
`;

const DayCell = styled.div`
  border-right: 1px solid #dadce0;
  border-bottom: 1px solid #dadce0;
  padding: 4px;
  font-size: 12px;
  color: ${props => (props.isNotInMonth ? '#b0b0b0' : '#3c4043')};
  background-color: ${props => (props.isNotInMonth ? '#f5f5f5' : '#fff')};
`;

const DayNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => (props.isToday ? '#1a73e8' : 'transparent')};
  color: ${props => (props.isToday ? 'white' : 'inherit')};
`;

const MonthView = ({ currentDate }) => {
  const [days, setDays] = useState([]);
  const today = new Date();

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const generateCalendar = (d) => {
    const year = d.getFullYear();
    const month = d.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const calendarDays = [];
    
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({ day: prevMonthDays - i, inMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = year === today.getFullYear() && month === today.getMonth() && i === today.getDate();
      calendarDays.push({ day: i, inMonth: true, isToday });
    }

    const remaining = 42 - calendarDays.length;
    for (let i = 1; i <= remaining; i++) {
      calendarDays.push({ day: i, inMonth: false });
    }
    
    setDays(calendarDays);
  };

  const dayHeaders = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <MonthViewContainer>
      <DayHeader>
        {dayHeaders.map(day => <DayName key={day}>{day}</DayName>)}
      </DayHeader>
      <CalendarGrid>
        {days.map((d, i) => (
          <DayCell key={i} isNotInMonth={!d.inMonth}>
            <DayNumber isToday={d.isToday}>{d.day}</DayNumber>
          </DayCell>
        ))}
      </CalendarGrid>
    </MonthViewContainer>
  );
};

export default MonthView;
