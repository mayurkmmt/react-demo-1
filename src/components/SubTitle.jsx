import React from 'react';
import styled from '@emotion/styled';

import theme from '../theme';

const StyledTitle = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.0rem;
  font-weight: ${theme.typography.normal.medium};
  color: ${theme.palette.faded1.base};
  text-transform: uppercase;
`;

const SubTitle = ({
  children,
  ...props
}) => (
  <StyledTitle {...props}>{children}</StyledTitle>
);

export default SubTitle;
