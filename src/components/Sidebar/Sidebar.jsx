import React from 'react';
import styled from 'styled-components';
import SmallCalendar from './SmallCalendar';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #ffffff;
  border-right: 1px solid #dadce0;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const MonthDisplay = styled.div`
  padding: 10px 16px;
  font-size: 18px;
  font-weight: 500;
  color: #333333;
`;

const EventListContainer = styled.div`
  padding: 10px 16px;
`;

const EventHeader = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EventItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  border-radius: 6px;
  margin-bottom: 5px;
  font-size: 10px;
`;

const EventName = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
`;

const EventTime = styled.div`
  color: #333333;
  font-weight: 500;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const Sidebar = ({ currentDate }) => {
  const formattedMonth = currentDate.toLocaleString('default', { month: 'long' });

  return (
    <SidebarContainer>
      <MonthDisplay>{formattedMonth}</MonthDisplay>
      <SmallCalendar currentDate={currentDate} />
      <EventListContainer>
        <EventHeader>
          <span role="img" aria-label="calendar">🗓️</span> Today
        </EventHeader>
        <EventItem>
          <EventName><Dot color="#2c5a41" /> Daily Standup</EventName>
          <EventTime>08:00</EventTime>
        </EventItem>
        <EventItem>
          <EventName><Dot color="#be1a1a" /> Budget Review</EventName>
          <EventTime>09:00</EventTime>
        </EventItem>
        {/* ... more events */}
      </EventListContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
