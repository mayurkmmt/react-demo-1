import React from 'react';
import styled from '@emotion/styled';

import theme from '../theme';

const StyledTitleWrapper = styled.div`
  margin-bottom: ${(props) => (props.reducedMargin ? '0.5rem' : '2rem')};
`;

const StyledTitle = styled.div`
  margin-bottom: 0.5rem;
  font-family: ${theme.typography.headers.family};
  font-size: 1rem;
  font-weight: ${theme.typography.normal.bold};
`;

const StyledDescription = styled.div`
  color: ${theme.palette.faded.base};
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const Title = ({
  children,
  description,
  reducedMargin = true,
  ...props
}) => (
  <StyledTitleWrapper reducedMargin={reducedMargin}>
    <StyledTitle {...props}>{children}</StyledTitle>
    {typeof description !== 'undefined' && <StyledDescription>{description}</StyledDescription>}
  </StyledTitleWrapper>
);

export default Title;
