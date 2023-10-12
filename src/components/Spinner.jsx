import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import theme from '../theme';

const spin = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const sizes = {
  small: '1.0rem',
  medium: '1.6rem',
  large: '2.4rem',
  fluid: '100%',
};

const StyledSpinner = styled.div`
  width: ${(props) => sizes[props.size] || props.size};
  height: ${(props) => sizes[props.size] || props.size};
  color: ${theme.palette.primary.base};
  display: inline-block;
  position: relative;

  svg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: ${spin} 1000ms infinite linear;
  }
`;

const Spinner = ({
  size = 'medium',
  ...props
}) => (
  <StyledSpinner
    size={size}
    {...props}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.3}
        strokeDasharray={62.83185307179586}
        strokeDashoffset={31.41592653589793}
        strokeWidth="4"
        strokeLinecap="round"
        transform="rotate(-90 12 12)"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeDasharray={62.83185307179586}
        strokeDashoffset={31.41592653589793}
        strokeWidth="4"
        strokeLinecap="round"
        transform="rotate(90 12 12)"
      />
    </svg>
  </StyledSpinner>
);

export default Spinner;
