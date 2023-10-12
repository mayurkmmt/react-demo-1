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

// https://commons.wikimedia.org/wiki/File:OOjs_UI_icon_newWindow-ltr.svg

const CheckIcon = ({ size = '1.5rem', onClick, ...props }) => (
  <div
    className="demo1--icon"
    css={style({ size, clickable: typeof onClick !== 'undefined' })}
    onClick={onClick}
    {...props}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M17 17H3V3h5V1H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-2z"/><path d="M19 1h-8l3.29 3.29-5.73 5.73 1.42 1.42 5.73-5.73L19 9V1z"/></svg>
  </div>
);

export default CheckIcon;
