import React from 'react';
import styled from '@emotion/styled';

import theme from '../theme';

const StyledContent = styled.div`
  padding: 2rem;
  background: ${theme.palette.root.base};
  color: ${theme.palette.root.contrast};
`;

const StyledPanel = styled.div`
  width: 100%;
  max-width: 25rem;
  margin: 2rem auto;
  border-radius: 0.25rem;
  overflow: hidden;

  ${StyledContent} {
    min-width: 25rem;
    width: 60%;
  }
`;

const SplitPanel = ({ children }) => (
  <StyledPanel>
    <StyledContent>{children}</StyledContent>
  </StyledPanel>
);

export default SplitPanel;
