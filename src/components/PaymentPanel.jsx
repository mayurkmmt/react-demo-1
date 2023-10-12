import React from 'react';
import { FormattedMessage } from 'react-intl';

import { steps } from '../steps';

import PaymentForm from './PaymentForm';
import Panel from './Panel';
import StepHeader from './StepHeader';

const PaymentPanel = ({
  locale,
  order,
  vat,
  stripeKey,
}) => (
  <Panel>
    <StepHeader
      groupName={<FormattedMessage id="PaymentPanel.groupName" defaultMessage="Payment" />}
      currentStep={steps.length + 1}
      stepCount={steps.length + 1}
    />
    <PaymentForm
      order={order}
      vat={vat}
      locale={locale}
      stripeKey={stripeKey}
    />
  </Panel>
);

export default PaymentPanel;
