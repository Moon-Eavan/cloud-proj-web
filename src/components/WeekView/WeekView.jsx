import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const WeekViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DayHeader = styled.div`
  display: grid;
  grid-template-columns: 50px repeat(7, 1fr);
  border-bottom: 1px solid #dadce0;
`;

const DayHeaderCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`;

const DayName = styled.div`
  font-size: 11px;
  color: #70757a;
  font-weight: 500;
  margin-bottom: 4px;
`;

const DayNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 14px;
  background-color: ${props => (props.isToday ? '#1a73e8' : 'transparent')};
  color: ${props => (props.isToday ? 'white' : '#3c4043')};
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 50px repeat(7, 1fr);
  grid-template-rows: repeat(24, 60px);
  flex-grow: 1;
  border-left: 1px solid #dadce0;
`;

const TimeLabelCell = styled.div`
  position: relative;
  grid-column: 1;
  grid-row: ${props => props.hour + 1} / span 1;
  border-right: 1px solid #dadce0;
`;

const TimeLabel = styled.div`
  position: absolute;
  right: 8px;
  top: -8px;
  font-size: 10px;
  color: #70757a;
`;

const DayColumn = styled.div`
  grid-column: ${props => props.day + 2};
  grid-row: 1 / span 24;
  border-right: 1px solid #dadce0;
  position: relative;
`;

const HourLine = styled.div`
  border-bottom: 1px solid #e0e0e0;
  height: 60px;
  box-sizing: border-box;
`;

const Event = styled.div`
  position: absolute;
  left: 2px;
  right: 2px;
  top: ${props => props.start * 60}px;
  height: ${props => props.duration * 60}px;
  background-color: ${props => props.color || '#039be5'};
  border-radius: 4px;
  color: white;
  padding: 2px 4px;
  font-size: 12px;
  overflow: hidden;
  z-index: 1;
`;


const WeekView = ({ currentDate }) => {
  const [weekDays, setWeekDays] = useState([]);
  const today = new Date();

  useEffect(() => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push({
        date: day,
        isToday: day.toDateString() === today.toDateString()
      });
    }
    setWeekDays(days);
  }, [currentDate]);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dayHeaders = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Placeholder events
  const events = [
    { id: 1, day: 1, title: 'Daily Standup', start: 8, duration: 0.5, color: '#2c5a41' },
    { id: 2, day: 2, title: 'Budget Review', start: 9, duration: 1.5, color: '#be1a1a' },
    { id: 3, day: 4, title: 'Project Sync', start: 11, duration: 1, color: '#039be5' },
  ];

  return (
    <WeekViewContainer>
      <DayHeader>
        <div /> {/* Spacer for time labels */}
        {weekDays.map((day, i) => (
          <DayHeaderCell key={i}>
            <DayName>{dayHeaders[day.date.getDay()]}</DayName>
            <DayNumber isToday={day.isToday}>{day.date.getDate()}</DayNumber>
          </DayHeaderCell>
        ))}
      </DayHeader>
      <TimeGrid>
        {hours.map(hour => (
          <TimeLabelCell key={hour} hour={hour}>
            {hour > 0 && <TimeLabel>{hour}:00</TimeLabel>}
          </TimeLabelCell>
        ))}
        {Array.from({ length: 7 }).map((_, dayIndex) => (
          <DayColumn key={dayIndex} day={dayIndex}>
            {hours.map(hour => <HourLine key={hour} />)}
            {events.filter(e => e.day === dayIndex).map(event => (
              <Event key={event.id} start={event.start} duration={event.duration} color={event.color}>
                {event.title}
              </Event>
            ))}
          </DayColumn>
        ))}
      </TimeGrid>
    </WeekViewContainer>
  );
};

export default WeekView;
