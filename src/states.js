import React from 'react';
import { FormattedMessage } from 'react-intl';

const present = [
  {
    state: 'pending',
    title: <FormattedMessage
      id="Wizard.stepTitle.postalCode.title"
      defaultMessage="Check if demo1 is available in your area"
    />,
    description: <FormattedMessage
      id="Wizard.stepTitle.postalCode.description"
      defaultMessage="demo1 is in the process of launching. Please submit your postal code to see if we are available in your area."
    />,
  },
];

const past = [
  {
    state: 'pending',
  },
];

export {
  present,
  past,
};
