import React from 'react';
import styled from '@emotion/styled';

import theme from '../theme';

const StyledContent = styled.div`
`;

const StyledPanel = styled.div`
  padding: 0rem;
  background: ${theme.palette.root.base};
  color: ${theme.palette.root.contrast};
  width: 100%;
  border: 0px solid #ddd;
  max-width: 32.5rem;
  margin: 0 auto;
`;

const WizardPanel = ({
  children,
  header,
}) => (
  <StyledPanel>
    <StyledContent>
      {children}
    </StyledContent>
    {header}
  </StyledPanel>
);

export default WizardPanel;
