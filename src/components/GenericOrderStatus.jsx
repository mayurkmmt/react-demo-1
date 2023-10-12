import React from 'react';
import { FormattedMessage } from 'react-intl';

import Panel from './Panel';
import OrderStatus from './OrderStatus';

const getGenericInfo = (state) => {
  switch (state) {
    case 'paid': {
      return {
        title: <FormattedMessage id="GenericOrderStatus.paid.title" defaultMessage="Order received" />,
        description: <FormattedMessage id="GenericOrderStatus.paid.description" defaultMessage="Your order has been received." />,
      };
    }
    case 'assigned-to-shop': {
      return {
        title: <FormattedMessage id="GenericOrderStatus.assigned-to-shop.title" defaultMessage="Order assigned" />,
        description: <FormattedMessage id="GenericOrderStatus.assigned-to-shop.description" defaultMessage="Your device has been assigned to the closest repair shop and will be picked up shortly." />,
      };
    }
    case 'transport-to-shop-requested': {
      return {
        title: <FormattedMessage id="GenericOrderStatus.transport-to-shop-requested.title" defaultMessage="Transport on its way" />,
        description: <FormattedMessage id="GenericOrderStatus.transport-to-shop-requested.description" defaultMessage="Transport is on its way to pick up the device!" />,
      };
    }
    case 'transport-to-shop-picked-up': {
      return {
        title: <FormattedMessage id="GenericOrderStatus.transport-to-shop-picked-up.title" defaultMessage="En route" />,
        description: <FormattedMessage id="GenericOrderStatus.transport-to-shop-picked-up.description" defaultMessage="Your device is on its way to the repair shop!" />,
      };
    }
    case 'transport-to-shop-delivered': {
      return {
        title: <FormattedMessage id="GenericOrderStatus.transport-to-shop-delivered.title" defaultMessage="Arrived at shop" />,
        description: <FormattedMessage id="GenericOrderStatus.transport-to-shop-delivered.description" defaultMessage="Your device has been delivered to the repair shop!" />,
      };
    }
    case 'requires-review': {
      return {
        title: <FormattedMessage id="GenericOrderStatus.requires-review.title" defaultMessage="Diagnostics" />,
        description: <FormattedMessage id="GenericOrderStatus.requires-review.description" defaultMessage="Your device is going through diagnostics at the repair shop!" />,
      };
    }
    case 'ready-for-repair': {
      return {
        title: <FormattedMessage id="GenericOrderStatus.ready-for-repair.title" defaultMessage="Reparation started" />,
        description: <FormattedMessage id="GenericOrderStatus.ready-for-repair.description" defaultMessage="Your device is being repaired!" />,
      };
    }
    case 'transport-to-customer-requested':
    case 'repaired': {
      return {
        title: <FormattedMessage id="GenericOrderStatus.repaired.title" defaultMessage="Repair done" />,
        description: <FormattedMessage id="GenericOrderStatus.repaired.description" defaultMessage="Your device has been repaired and is waiting to be picked up!" />,
      };
    }
    case 'transport-to-customer-picked-up': {
      return {
        title: <FormattedMessage id="GenericOrderStatus.transport-to-customer-picked-up.title" defaultMessage="En route" />,
        description: <FormattedMessage id="GenericOrderStatus.transport-to-customer-picked-up.description" defaultMessage="Your device has been picked up and is on its way back!" />,
      };
    }
    case 'transport-to-customer-delivered': {
      return {
        title: <FormattedMessage id="GenericOrderStatus.transport-to-customer-delivered.title" defaultMessage="Delivered" />,
        description: <FormattedMessage id="GenericOrderStatus.transport-to-customer-delivered.description" defaultMessage="Your device has been repaired and delivered!" />,
      };
    }
    case 'rejected': {
      return {
        title: <FormattedMessage id="GenericOrderStatus.rejected.title" defaultMessage="Rejected" />,
        description: <FormattedMessage id="GenericOrderStatus.rejected.description" defaultMessage="Order change rejected. Your device will be returned to you." />,
      };
    }
    default: {
      return {
        title: state,
        description: <FormattedMessage id="GenericOrderStatus.default.description" defaultMessage="No description" />,
      };
    }
  }
};

const GenericOrderStatus = ({ order, vat, shipmentFee }) => {
  const { description } = getGenericInfo(order.state);

  return (
    <Panel>
      <OrderStatus order={order} vat={vat} shipmentFee={shipmentFee}>
        <div>{description}</div>
      </OrderStatus>
    </Panel>
  );
};

export default GenericOrderStatus;
