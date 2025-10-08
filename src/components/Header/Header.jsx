import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: #fff;
  border-bottom: 1px solid #dadce0;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TodayButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  background-color: #fff;
  color: #3c4043;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f1f3f4;
  }
`;

const NavArrows = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #5f6368;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DateDisplay = styled.h2`
  font-size: 22px;
  font-weight: 400;
  color: #3c4043;
  margin: 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const ViewButtons = styled.div`
  display: flex;
  border: 1px solid #dadce0;
  border-radius: 4px;
  overflow: hidden;

  button {
    background-color: #fff;
    border: none;
    border-left: 1px solid #dadce0;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    color: #3c4043;

    &:first-child {
      border-left: none;
    }

    &.active {
      background-color: #e8f0fe;
      color: #1967d2;
    }

    &:hover:not(.active) {
      background-color: #f1f3f4;
    }
  }
`;


const Header = ({ currentView, setCurrentView, currentDate, setCurrentDate }) => {
  const formattedDate = `${currentDate.getFullYear()} ${currentDate.toLocaleString('en-US', { month: 'long' })}`;

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (currentView === 'year') {
      newDate.setFullYear(newDate.getFullYear() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (currentView === 'year') {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <TodayButton onClick={handleToday}>Today</TodayButton>
        <NavArrows>
          <ArrowButton onClick={handlePrev}>&lt;</ArrowButton>
          <ArrowButton onClick={handleNext}>&gt;</ArrowButton>
        </NavArrows>
        <DateDisplay>{formattedDate}</DateDisplay>
      </LeftSection>
      <RightSection>
        <ViewButtons>
          <button className={currentView === 'day' ? 'active' : ''} onClick={() => setCurrentView('day')}>Day</button>
          <button className={currentView === 'week' ? 'active' : ''} onClick={() => setCurrentView('week')}>Week</button>
          <button className={currentView === 'month' ? 'active' : ''} onClick={() => setCurrentView('month')}>Month</button>
          <button className={currentView === 'year' ? 'active' : ''} onClick={() => setCurrentView('year')}>Year</button>
        </ViewButtons>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
