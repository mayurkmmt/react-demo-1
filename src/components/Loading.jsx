import React from 'react';
import styled from '@emotion/styled';

import Spinner from './Spinner';

const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  max-height: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Loader = ({
  size,
  ...props
}) => (
  <StyledLoader {...props}>
    <Spinner />
  </StyledLoader>
);

export default Loader;
