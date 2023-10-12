import React from 'react';
import { FormattedMessage } from 'react-intl';

import PaymentForm from './PaymentForm';
import Panel from './Panel';
import Title from './Title';

const PaymentPanel = ({
  locale,
  order,
  vat,
  stripeKey,
}) => (
  <Panel>
    <Title
      description={<FormattedMessage id="ExtraPayment.description" defaultMessage="An extra payment is required to proceed with the order." />}
    >
      Extra payment
    </Title>
    <PaymentForm
      order={order}
      vat={vat}
      locale={locale}
      stripeKey={stripeKey}
    />
  </Panel>
);

export default PaymentPanel;
