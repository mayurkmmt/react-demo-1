import React from 'react';
import { css } from '@emotion/core';

const style = ({ size, clickable }) => css`
  width: ${size};
  height: ${size};
  cursor: ${clickable ? 'pointer' : 'inherit'};
  display: inline-block;

  svg {
    width: 100%;
    height: 100%;
  }
`;

// https://feathericons.com/

const CheckIcon = ({ size = '1.5rem', onClick, ...props }) => (
  <div
    className="demo1--icon"
    css={style({ size, clickable: typeof onClick !== 'undefined' })}
    onClick={onClick}
    {...props}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  </div>
);

export default CheckIcon;
