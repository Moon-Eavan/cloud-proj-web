import React, { useState } from 'react';
import Header from './components/Header/Header';
import DayView from './components/DayView/DayView';
import WeekView from './components/WeekView/WeekView';
import MonthView from './components/MonthView/MonthView';
import YearView from './components/YearView/YearView';
import Sidebar from './components/Sidebar/Sidebar';
import MainLayout from './components/MainLayout/MainLayout';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #f8f9fa;
  }
`;

function App() {
  const [currentView, setCurrentView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderView = () => {
    switch (currentView) {
      case 'day':
        return <DayView currentDate={currentDate} />;
      case 'week':
        return <WeekView currentDate={currentDate} />;
      case 'month':
        return <MonthView currentDate={currentDate} />;
      case 'year':
        return <YearView currentDate={currentDate} />;
      default:
        return <MonthView currentDate={currentDate} />;
    }
  };

  return (
    <>
      <GlobalStyle />
      <MainLayout
        sidebar={<Sidebar currentDate={currentDate} />}
        header={<Header 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          currentDate={currentDate}
          setCurrentDate={setCurrentDate} 
        />}
      >
        {renderView()}
      </MainLayout>
    </>
  );
}

export default App;

