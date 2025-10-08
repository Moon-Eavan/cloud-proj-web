import React from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar/Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const MainLayout = ({ children, sidebar, header }) => {
  return (
    <LayoutContainer>
      {sidebar}
      <MainContent>
        {header}
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default MainLayout;
