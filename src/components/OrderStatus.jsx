import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

import theme from '../theme';

import OrderSummary from './OrderSummary';
import Title from './Title';

const StyledOrderHeader = styled.div`
`;

const StyledOrderId = styled.div`
  margin-top: -0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const StyledTabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.palette.faded3.base};
  margin-bottom: 1.5rem;
`;

const StyledTab = styled.div`
  width: 50%;
  text-align: center;
  padding: 0.75rem 0;
  position: relative;
  bottom: -1px;
  font-weight: ${theme.typography.normal.medium};
  cursor: pointer;

  border-bottom: 2px solid ${(props) => (props.active ? theme.palette.primary.base : 'transparent')};
  color: ${(props) => (props.active ? theme.palette.root.contrast : theme.palette.faded1.base)};
`;

const OrderHeader = ({
  order,
  vat,
  shipmentFee,
  children,
}) => {
  const [displayInfo, setDisplayInfo] = useState(false);

  return (
    <StyledOrderHeader>
      <Title reducedMargin><FormattedMessage id="OrderStatus.title" defaultMessage="Order status" /></Title>
      <StyledOrderId>#{order.orderId}</StyledOrderId>

      <StyledTabs>
        <StyledTab active={!displayInfo} onClick={() => setDisplayInfo(false)}>
          Status
        </StyledTab>
        <StyledTab active={displayInfo} onClick={() => setDisplayInfo(true)}>
          Order
        </StyledTab>
      </StyledTabs>

      {displayInfo
        ? <OrderSummary vat={vat} shipmentFee={shipmentFee} order={order} />
        : children
      }
    </StyledOrderHeader>
  );
};

export default OrderHeader;
