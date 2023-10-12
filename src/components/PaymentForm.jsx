import React, { useEffect, useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
} from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';

import theme from '../theme';

import Title from './Title';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import FieldWrapper, { Label } from './FieldWrapper';
import MastercardLogo from '../icons/MastercardLogo';
import VisaLogo from '../icons/VisaLogo';

const elementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#333',
      padding: '10px',
      border: '1px solid red',
    },
  },
};

const StyledElementWrapper = styled.div`
  margin-bottom: 1rem;
  width: ${(props) => props.width};
`;

const StyledLabel = styled.div`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: ${theme.typography.normal.medium};
`;

const StyledPaymentOptions = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  font-weight: ${theme.typography.normal.medium};

  div:first-child {
    margin-right: 1rem;
  }
`;

const StyledFauxInput = styled.div`
  display: block;
  border: 1px solid ${theme.palette.faded2.base};
  border-radius: 0.2rem;
  box-sizing: border-box;
  padding: 0.5rem;
`;

const StyledElementWrappers = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledError = styled.div`
  margin-bottom: 1rem;
  color: ${theme.palette.danger.base};
`;

const ElementWrapper = ({
  id,
  width = '100%',
  label,
  children,
}) => (
  <StyledElementWrapper width={width}>
    <StyledLabel htmlFor={id}>{label}</StyledLabel>
    <StyledFauxInput>
      {children}
    </StyledFauxInput>
  </StyledElementWrapper>
);

const PaymentForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements({
    locale: 'sv',
  });
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [intentLoaded, setIntentLoaded] = useState(false);

  const [name, setName] = useState(`${order.firstName} ${order.lastName}`);
  const [postalCode, setPostalCode] = useState(order.postalCode);

  const payments = order.payments.filter(({ status }) => status === 'pending');

  if (payments.length !== 1) {
    return 'Invalid payments.';
  }

  const payment = payments[0];

  useEffect(() => {
    if (stripe !== null) {
      // We need to check the status of the intent in the case of a payment
      // that has been sent to Stripe, but has not been registered in the
      // demo1 backend yet.
      stripe.retrievePaymentIntent(payment.paymentReference).then((response) => {
        setIntentLoaded(true);
        if (response.paymentIntent.status === 'succeeded') {
          setPaid(true);
        }
      });
    }
  }, [stripe]);

  if (!intentLoaded) {
    return <FormattedMessage id="general.loading" defaultMessage="Laddar ..."/>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors(null);

    if (!stripe || !elements) {
      return false;
    }

    const result = await stripe.confirmCardPayment(payment.paymentReference, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name,
          address: {
            postal_code: postalCode,
          },
        },
      },
    });

    setLoading(false);

    if (result.error) {
      setErrors(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      setPaid(true);
    }

    return true;
  };

  if (paid) {
    // Create dataLayer structure to push to tag manager
    const items = [];
    for (const i in order.currentOrder.orderUnits) {
      const item = order.currentOrder.orderUnits[i];
      items.push({
        item_name: item.service.name,
        item_id: item.service.id,
        price: item.service.price,
        item_brand: order.device.brand.name,
        item_category: order.device.productType,
        item_variant: order.device.name,
      });
    }

    if (typeof (dataLayer) !== 'undefined') {
      dataLayer.push({
        event: 'purchase',
        ecommerce: {
          transaction_id: order.id,
          value: order.amountToPay,
          currency: payment.currency,
          coupon: order.promoCode,
          items,
        },
      });
    } else {
      console.log('dataLayer not found, tag manager not loaded correctly?');
    }

    return <>
      <Title
        description={<FormattedMessage id="PaymentForm.title"
                                       defaultMessage="Din beställning är mottagen! Du kommer strax att få en bekräftelse på mailen med information om din order."/>}
      >
        Thank you!
      </Title>
    </>;
  }

  return (
    <>
      <Title><FormattedMessage id="PaymentForm.form.title" defaultMessage="Betalning"/></Title>
      <StyledPaymentOptions>
        <VisaLogo size="2.5rem"/>
        <MastercardLogo size="2.5rem"/>
      </StyledPaymentOptions>
      <form onSubmit={handleSubmit}>
        <FieldWrapper>
          <Label><FormattedMessage id="PaymentForm.form.name" defaultMessage="Namn på kortet"/></Label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </FieldWrapper>

        <ElementWrapper label={<FormattedMessage id="PaymentForm.form.cardNumber"
                                                               defaultMessage="Kortnummer"/>} id="cardNumber">
          <CardNumberElement id="card-number" options={elementOptions}/>
        </ElementWrapper>
        <StyledElementWrappers>
          <ElementWrapper width="45%"
                          label={<FormattedMessage id="PaymentForm.form.expiration" defaultMessage="Giltigt till"/>}
                          id="cardExp">
            <CardExpiryElement options={elementOptions}/>
          </ElementWrapper>
          <ElementWrapper width="45%" label={<FormattedMessage id="PaymentForm.form.securityCode"
                                                               defaultMessage="Säkerhetskod (CVC)"/>} id="cardCvc">
            <CardCvcElement options={elementOptions}/>
          </ElementWrapper>
        </StyledElementWrappers>

        <FieldWrapper>
          <Label><FormattedMessage id="PaymentForm.form.postalCode" defaultMessage="Postnummer"/></Label>
          <input
            type="text"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            required
          />
        </FieldWrapper>

        {errors !== null && <StyledError>{errors}</StyledError>}

        <ButtonGroup centered>
          <Button
            disabled={!stripe || loading}
          >
            <FormattedMessage id="PaymentForm.form.pay" defaultMessage="Betala"/> {order.amountToPay.toFixed(2)} SEK
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
};

const Wrapper = ({ stripeKey, locale, ...props }) => {
  const stripePromise = useMemo(() => loadStripe(stripeKey), [stripeKey]);

  return (
    <Elements stripe={stripePromise} key="es" options={{
      locale,
    }}>
      <PaymentForm {...props} />
    </Elements>
  );
};

export default Wrapper;
