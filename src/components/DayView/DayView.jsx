import React from 'react';
import styled from 'styled-components';

const DayViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DayHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  border-bottom: 1px solid #dadce0;
  text-align: center;
  padding: 10px 0;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
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
  grid-column: 2;
  grid-row: 1 / span 24;
  position: relative;
`;

const HourLine = styled.div`
  border-bottom: 1px solid #e0e0e0;
  height: 60px;
  box-sizing: border-box;
`;

const Event = styled.div`
  position: absolute;
  left: 10px;
  right: 10px;
  top: ${props => props.start * 60}px;
  height: ${props => props.duration * 60}px;
  background-color: ${props => props.color || '#039be5'};
  border-radius: 4px;
  color: white;
  padding: 4px;
  font-size: 12px;
  overflow: hidden;
  z-index: 1;
`;

const DayView = ({ currentDate }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Placeholder events
  const events = [
    { id: 1, title: 'Daily Standup', start: 8, duration: 0.5, color: '#2c5a41' },
    { id: 2, title: 'Budget Review', start: 9, duration: 1.5, color: '#be1a1a' },
    { id: 3, title: 'Project Sync', start: 11, duration: 1, color: '#039be5' },
  ];

  return (
    <DayViewContainer>
      <DayHeader>
        <div /> {/* Spacer for time labels */}
        <div>{currentDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}</div>
      </DayHeader>
      <TimeGrid>
        {hours.map(hour => (
          <TimeLabelCell key={hour} hour={hour}>
            {hour > 0 && <TimeLabel>{hour}:00</TimeLabel>}
          </TimeLabelCell>
        ))}
        <DayColumn>
            {hours.map(hour => <HourLine key={hour} />)}
            {events.map(event => (
              <Event key={event.id} start={event.start} duration={event.duration} color={event.color}>
                {event.title}
              </Event>
            ))}
        </DayColumn>
      </TimeGrid>
    </DayViewContainer>
  );
};

export default DayView;
