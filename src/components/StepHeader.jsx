import React from 'react';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

import theme from '../theme';

const StyledHeader = styled.div`
  margin-top: 1rem;
`;

const StyledHeaderTitle = styled.div`
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledGroupName = styled.div`
  font-weight: ${theme.typography.normal.medium};
  text-transform: uppercase;
`;

const StyledStepNumber = styled.div`
  color: ${theme.palette.faded1.base};
  font-size: 0.8rem;
  text-align: center;
  margin-top .5rem;
`;

const StyledProgress = styled.div`
  position: relative;
  height: 0.1rem;
  border-radius: 0.2rem;
  background: #eee;
  background: ${theme.palette.faded3.base};

  &:after {
    display: block;
    content: '';
    border-radius: inherit;
    position: absolute;
    left: 0;
    top: -0.1rem;
    height: 0.3rem;
   border-radius: 0.3rem;
    background: ${theme.palette.primary.base};
    width: ${(props) => props.percentage}%;
    transition: width 300ms ease-in-out;
  }
`;

const Progress = ({ step, steps }) => (
  <StyledProgress percentage={(step / steps) * 100} />
);

const StepHeader = ({ groupName, currentStep, stepCount }) => (
  <StyledHeader>
    <StyledHeaderTitle>
      {/* <StyledGroupName>{groupName}</StyledGroupName> */}
    </StyledHeaderTitle>
    <Progress step={currentStep} steps={stepCount} />
    <StyledStepNumber>
        <FormattedMessage
          id="StepHeader.header.stepProgress"
          defaultMessage="Step {currentStep} of {stepCount}"
          values={{ currentStep, stepCount }}
        />
      </StyledStepNumber>
  </StyledHeader>
);

export default StepHeader;
