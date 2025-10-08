import React from 'react';
import styled from 'styled-components';

const DayViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: 1px solid #dadce0;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(24, 60px);
  flex-grow: 1;
  position: relative;
`;

const TimeLabel = styled.div`
  position: absolute;
  left: -50px;
  top: ${props => props.hour * 60}px;
  transform: translateY(-50%);
  font-size: 10px;
  color: #70757a;
  width: 40px;
  text-align: right;
`;

const HourLine = styled.div`
  border-bottom: 1px solid #e0e0e0;
  grid-row: ${props => props.hour + 1};
  grid-column: 1;
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
      <TimeGrid>
        {hours.map(hour => (
          <React.Fragment key={hour}>
            <TimeLabel hour={hour}>{hour === 0 ? '' : `${hour}:00`}</TimeLabel>
            <HourLine hour={hour} />
          </React.Fragment>
        ))}
        {events.map(event => (
          <Event key={event.id} start={event.start} duration={event.duration} color={event.color}>
            {event.title}
          </Event>
        ))}
      </TimeGrid>
    </DayViewContainer>
  );
};

export default DayView;
