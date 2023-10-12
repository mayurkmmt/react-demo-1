import React from 'react';
import styled from '@emotion/styled';

import theme from '../theme';

const StyledButton = styled.button`
  padding: ${(props) => (props.slim ? '0.2rem 0.5rem;' : '1rem 1.5rem')};
  border-radius: 0.25rem;
  border: 0;
  cursor: pointer;
    padding: 10px 56px 10px 23px;
   background-color: #02BB4F;
   background-image: url('https://uploads-ssl.webflow.com/604879ea796f10df82a6b2ca/6049e95aa862eca535eb18d2_arrow-white.svg');
   background-position: 87% 50%;
   background-size: auto 50%;
   background-repeat: no-repeat;
   -webkit-transition: all 300ms ease;
   transition: all 300ms ease;
   font-family: 'Avenirnextltpro demi', sans-serif;
   font-size: 18px;
   line-height: 1.6;
   font-weight: 400;
   box-shadow: none;
   border: none;


  ${(props) => (props.design === 'default' && `
    color: ${theme.palette.primary.contrast};
 &:hover {
      background-color: #01AC48;
   background-position: 92% 50%;
  `)}

  ${(props) => (props.design === 'secondary' && `
    font-family: 'Avenirnextltpro', sans-serif;
    background: ${theme.palette.faded.base};
    color: ${theme.palette.faded.contrast};
  `)}

  ${(props) => (props.design === 'invisible' && `
    background: ${theme.palette.faded3.base};
    color: ${theme.palette.faded3.contrast};
  `)}

  ${(props) => (props.design === 'accent' && `
    background: ${theme.palette.accent.base};
    color: ${theme.palette.accent.contrast};
  `)}

  ${(props) => (props.design === 'text' && `
    color: inherit;
    background: transparent;

    &:hover {
      background: ${theme.palette.faded3.base};

    }
  `)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button = ({
  design = 'default',
  slim = false,
  children,
  ...props
}) => (
  <StyledButton design={design} slim={slim} {...props}>{children}</StyledButton>
);

export default Button;
