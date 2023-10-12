import React from 'react';

import {
  useRequestOrder,
  useOrderContext,
} from '../providers/OrderProvider';

import PaymentPanel from './PaymentPanel';
import ExtraPayment from './ExtraPayment';
import GenericOrderStatus from './GenericOrderStatus';
import ApprovalRequired from './ApprovalRequired';
import Loading from './Loading';

const StatusPage = ({
  code,
  vat,
  shipmentFee,
  locale,
  stripeKey,
}) => {
  const { order } = useOrderContext();
  const { loading } = useRequestOrder(code);

  if (loading) {
    return <Loading />;
  }

  switch (order.state) {
    case 'needs-payment': {
      return <PaymentPanel
        locale={locale}
        vat={vat}
        order={order}
        stripeKey={stripeKey}
      />;
    }
    case 'needs-extra-payment': {
      return <ExtraPayment
        locale={locale}
        vat={vat}
        shipmentFee={shipmentFee}
        order={order}
        stripeKey={stripeKey}
      />;
    }
    case 'requires-approval': {
      return <ApprovalRequired
        order={order}
        vat={vat}
        shipmentFee={shipmentFee}
      />;
    }
    default: {
      return <GenericOrderStatus
        order={order}
        vat={vat}
        shipmentFee={shipmentFee}
      />;
    }
  }
};

export default StatusPage;
