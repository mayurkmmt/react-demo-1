import React from 'react';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

import { useAcceptReview, useRejectReview } from '../providers/OrderProvider';

import Button from './Button';
import Panel from './Panel';
import Title from './Title';
import OrderSummary from './OrderSummary';

const StyledDiff = styled.div`
  font-size: 1.1rem;
  text-align: center;
`;

const StyledNotice = styled.div`
  font-size: 1.1rem;
  text-align: center;
  margin: 1rem 0;
`;

const StyledButtons = styled.div`
  text-align: center;

  div {
    font-style: italic;
  }

  button {
    margin: 0.5rem 0;
  }
`;

const ApprovalRequired = ({ order, vat, shipmentFee }) => {
  const { acceptLoading, dispatcher: acceptReview } = useAcceptReview();
  const { rejectLoading, dispatcher: rejectReview } = useRejectReview();

  return (
    <Panel>
      <Title><FormattedMessage id="ApprovalRequired.title" defaultMessage="Your order was changed" /></Title>
      <div className="info">
        <FormattedMessage
          id="ApprovalRequired.description"
          defaultMessage="Your order was updated after the diagnostics were completed. Before we can go ahead we need your approval."
        />
      </div>

      <OrderSummary
        vat={vat}
        shipmentFee={shipmentFee}
        order={order}
        isReviewOrder
      />

      <StyledDiff>
        <FormattedMessage
          id="ApprovalRequired.diff"
          defaultMessage="Amount difference: {diff} kr"
          values={{ diff: order.reviewedOrder.total - order.currentOrder.total }}
        />
      </StyledDiff>

      <StyledNotice>
        <FormattedMessage
          id="ApprovalRequired.notice"
          defaultMessage="Please note that the added service is considered to be necessary to complete the repair. If you do not accept we will send your device back."
        />
      </StyledNotice>

      <StyledButtons>
        {acceptLoading || rejectLoading
          ? <FormattedMessage id="ApprovalRequired.submitting" defaultMessage="Submitting ..." />
          : <div>
            <Button onClick={() => acceptReview([order.code])}><FormattedMessage id="ApprovalRequired.accept" defaultMessage="Accept changes" /></Button>
            <div>Or</div>
            <Button onClick={() => rejectReview([order.code])}><FormattedMessage id="ApprovalRequired.reject" defaultMessage="Reject and cancel order" /></Button>
          </div>
        }
      </StyledButtons>
    </Panel>
  );
};

export default ApprovalRequired;
