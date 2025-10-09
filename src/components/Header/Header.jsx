import React, { useState, useRef, useEffect } from 'react';
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
  border: 1px solid #0C41FF;
  border-radius: 4px;
  background-color: #fff;
  color: #0C41FF;
  font-size: 14px;
  cursor: pointer;
  height: 35px;
  font-weight: 500;

  &:hover {
    background-color: #e8f0fe;
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

const ViewSelectorContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ViewSelectorButton = styled.button`
  background-color: #fff;
  border: 1px solid #0C41FF;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #0C41FF;
  height: 35px;
  font-weight: 500;

  &:hover {
    background-color: #e8f0fe;
  }
`;

const DropdownArrow = styled.span`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #0C41FF;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #dadce0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 100;
  width: 120px;
  margin-top: 4px;
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f1f3f4;
  }

  &.active {
    background-color: #e8f0fe;
    color: #1967d2;
  }
`;


const Header = ({ currentView, setCurrentView, currentDate, setCurrentDate }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const formattedDate = `${currentDate.getFullYear()} ${currentDate.toLocaleString('en-US', { month: 'long' })}`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

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

  const handleViewChange = (view) => {
    setCurrentView(view);
    setDropdownOpen(false);
  };

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <HeaderContainer>
      <LeftSection>
        <TodayButton onClick={handleToday}>Today</TodayButton>
        <NavArrows>
          <ArrowButton onClick={handlePrev}>&lt;</ArrowButton>
          <ArrowButton onClick={handleNext}>&gt;</ArrowButton>
        </NavArrows>
        <DateDisplay>{formattedDate}</DateDisplay>
        <ViewSelectorContainer ref={dropdownRef}>
          <ViewSelectorButton onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <span>{capitalize(currentView)}</span>
            <DropdownArrow />
          </ViewSelectorButton>
          {isDropdownOpen && (
            <DropdownMenu>
              <DropdownItem className={currentView === 'day' ? 'active' : ''} onClick={() => handleViewChange('day')}>Day</DropdownItem>
              <DropdownItem className={currentView === 'week' ? 'active' : ''} onClick={() => handleViewChange('week')}>Week</DropdownItem>
              <DropdownItem className={currentView === 'month' ? 'active' : ''} onClick={() => handleViewChange('month')}>Month</DropdownItem>
              <DropdownItem className={currentView === 'year' ? 'active' : ''} onClick={() => handleViewChange('year')}>Year</DropdownItem>
            </DropdownMenu>
          )}
        </ViewSelectorContainer>
      </LeftSection>
      <RightSection>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
