import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const YearViewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  overflow-y: auto;
  height: 100%;
`;

const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MonthName = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: ${props => (props.isHeader ? '#70757a' : '#3c4043')};
  background-color: ${props => (props.isToday ? '#1a73e8' : 'transparent')};
  color: ${props => (props.isToday ? 'white' : 'inherit')};
  border-radius: 50%;
  width: 24px;
  height: 24px;
`;

const MiniMonth = ({ year, month }) => {
  const [days, setDays] = useState([]);
  const today = new Date();
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

  useEffect(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const calendarDays = [];
    
    // Fill with empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push({ key: `empty-${i}` });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = year === today.getFullYear() && month === today.getMonth() && i === today.getDate();
      calendarDays.push({ day: i, isToday, key: i });
    }
    
    setDays(calendarDays);
  }, [year, month]);

  const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <MonthContainer>
      <MonthName>{monthName}</MonthName>
      <CalendarGrid>
        {dayHeaders.map(h => <Day key={h} isHeader>{h}</Day>)}
        {days.map(d => (
          <Day key={d.key} isToday={d.isToday}>
            {d.day}
          </Day>
        ))}
      </CalendarGrid>
    </MonthContainer>
  );
};

const YearView = ({ currentDate }) => {
  const year = currentDate.getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <YearViewContainer>
      {months.map(month => (
        <MiniMonth key={month} year={year} month={month} />
      ))}
    </YearViewContainer>
  );
};

export default YearView;
