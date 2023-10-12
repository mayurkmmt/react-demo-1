import React from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import Collapsible from 'react-collapsible';

import { useOrderContext, useVerifyPromoCode } from '../providers/OrderProvider';

import Button from './Button';
import ButtonGroup from './ButtonGroup';
import OrderSummary from './OrderSummary';
import FieldWrapper, { ErrorMessage, StyledPromoField } from './FieldWrapper';

const ReviewPanel = ({
  panelId,
  values,
  vat,
  shipmentFee,
  onBack,
  onSubmit,
}) => {
  const intl = useIntl();
  const { promo } = useOrderContext();

  const {
    loading: verifying,
    dispatcher: verifyPromo,
    error,
  } = useVerifyPromoCode();
  const { register, errors, handleSubmit } = useForm();

  const onVerify = (formValues) => {
    if (formValues.promoCode) {
      verifyPromo([formValues.promoCode.toUpperCase().replace(/\s/g, '')]);
    }
  };

  return (
    <>
      <OrderSummary
        vat={vat}
        values={values}
        shipmentFee={shipmentFee}
        promo={promo}
      />

      <form onSubmit={handleSubmit(onVerify)}>
        <FieldWrapper detached>
        <Collapsible
          trigger={intl.formatMessage({ id: 'ReviewPanel.form.promoHeader', defaultMessage: 'Kampanjkod?' })}
          transitionTime="200"
          triggerStyle={{
            fontSize: '0.9rem',
            display: 'inline-block',
            marginBottom: '1rem',
            textDecoration: 'underline',
          }}>
          <StyledPromoField>
            <input
              ref={register({ pattern: /^[A-Z0-9-]+$/i })}
              name="promoCode"
              type="text"
              placeholder={intl.formatMessage({ id: 'ReviewPanel.form.promoCode', defaultMessage: 'Kampanjkod' })}
            />
            <Button slim={true} type="submit" disabled={verifying} design="secondary">
              <FormattedMessage id="general.apply" defaultMessage="Apply" />
            </Button>
          </StyledPromoField>
          {error
            && (<ErrorMessage><FormattedMessage
              id="ReviewPanel.form.promoError.network"
              defaultMessage="Network error. Try again later."
            /></ErrorMessage>)
          }
          {((promo && promo.error) || errors.length)
            && (<ErrorMessage><FormattedMessage
              id="ReviewPanel.form.promoError.validity"
              defaultMessage="Promotional code not valid."
            /></ErrorMessage>)
          }
         </Collapsible>
        </FieldWrapper>
      </form>

      <ButtonGroup>
        <Button
          onClick={onBack}
          design="text"
          disabled={verifying}
        >
          <FormattedMessage id="general.back" defaultMessage="Back" />
        </Button>
        <Button
          onClick={() => onSubmit({
            ...values,
            promoCode: (promo && promo.id) || '',
            [panelId]: true,
          })}
          disabled={verifying}
        >
          <FormattedMessage id="general.accept" defaultMessage="Skicka" />
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ReviewPanel;
