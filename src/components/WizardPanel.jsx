import React from 'react';

import Title from './Title';
import Panel from './Panel';
import StepHeader from './StepHeader';

const WizardPanel = ({
  children,
  steps,
  groups,
  index,
  current,
}) => {
  const step = steps.find(({ id }) => id === current);
  const group = groups[step.group];

  return (
    <Panel
       header={
        <StepHeader
          currentStep={index + 1}
          stepCount={steps.length + 1} // + 1 here to account for the payments panel
          groupName={group}
        />
      }
    >
      <Title description={step.description}>{step.title}</Title>
      {children}
    </Panel>
  );
};

export default WizardPanel;
