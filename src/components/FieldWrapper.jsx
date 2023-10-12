import React from 'react';
import styled from '@emotion/styled';

import theme from '../theme';

const Label = styled.div`
  margin-bottom: 0.5rem;
  font-weight: ${theme.typography.normal.medium};
`;

const Help = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: ${theme.palette.faded1.base};
`;

const ErrorMessage = styled.div`
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: ${theme.palette.danger.base};
`;

const StyledHorizontalField = styled.div`
  display: flex;
  input {
    margin-right: 1rem;
  }
`;

const StyledPromoField = styled.div`
  display: flex;

  ${(props) => (props.detached && 'margin-top: 2.5rem;')};

  input {
    display: block;
    margin-right: 1rem;
    border: 2px solid ${theme.palette.faded2.base};
    border-radius: 0.3rem;
    box-sizing: border-box;
    padding: 0.75rem 1rem;
    line-height: 1;
    width: ${(props) => (props.reducedInput ? '6rem' : '100%')};
    font-family: inherit;
    font-size: 1rem;
  }

  button {
    padding: 1rem 1.5rem;
  }
  
  input:focus {
  border: 2px solid ${theme.palette.primary.base};
  outline: none;
  }

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const StyledFieldWrapper = styled.label`
  display: block;
  margin-bottom: 1.5rem;
  ${(props) => (props.detached && 'margin-top: 2.5rem;')};
  ${(props) => (props.hiddenInput && 'display:none')};
  input {
    display: block;
    border: 2px solid ${theme.palette.faded2.base};
    border-radius: 0.3rem;
    box-sizing: border-box;
    padding: 1rem 1rem;
    line-height: 1;
    width: ${(props) => (props.reducedInput ? '6rem' : '100%')};
    font-family: inherit;
    font-size: 1.1rem;
  }
  
  input:focus {
  border: 2px solid ${theme.palette.primary.base};
  outline: none;
  }

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const FieldWrapper = ({
  children,
  detached = false,
  reducedInput = false,
  hiddenInput = false,
  ...props
}) => (
  <StyledFieldWrapper reducedInput={reducedInput} hiddenInput={hiddenInput} detached={detached} {...props}>
    {children}
  </StyledFieldWrapper>
);

export default FieldWrapper;
export {
  Label,
  Help,
  ErrorMessage,
  StyledHorizontalField,
  StyledPromoField,
};
