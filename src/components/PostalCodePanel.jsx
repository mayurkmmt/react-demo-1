import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

import Button from './Button';
import ButtonGroup from './ButtonGroup';
import FieldWrapper, { Label, Help } from './FieldWrapper';

import { useRequestSlots, useLogitsticsContext } from '../providers/LogisticsProvider';

const StyledNotice = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: .25rem;
  line-height: 130%;
`;
const InfoPanel = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: .25rem;
  line-height: 130%;
  text-align: center;
`;

const Notice = ({ subscribeUrl }) => (
  <StyledNotice>
    <FormattedMessage
      id="PostalCodePanel.notice"
      defaultMessage="Sorry! demo1 is expanding fast but have not yet reached your service area. If you wish us to notify you, when we do please click {subscribeLink}."
      values={{
        subscribeLink: <a href={subscribeUrl} target="_blank"><FormattedMessage id="PostalCodePanel.subscribe" defaultMessage="here" /></a>,
      }}
    />
  </StyledNotice>
);

const PostalCodePanel = ({
  panelId,
  values,
  subscribeUrl,
  onSubmit: defaultOnSubmit,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [postalCode, setPostalCode] = useState(null);
  const [displayNotice, setDisplayNotice] = useState(false);
  const { slots, resetSlots } = useLogitsticsContext();
  const {
    loading,
    dispatcher: getSlots,
  } = useRequestSlots();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      postalCode: values[panelId] && values[panelId].postalCode,
    },
  });

  useEffect(() => {
    if (slots !== null && slots.length === 0) {
      setDisplayNotice(true);
    } else if (submitted && slots !== null) {
      defaultOnSubmit({
        ...values,
        [panelId]: {
          postalCode,
          slots,
        },
      });
    }
  }, [slots, submitted]);

  const onSubmit = (formData) => {
    resetSlots();
    setDisplayNotice(false);
    setSubmitted(true);
    setPostalCode(formData.postalCode);
    getSlots([formData.postalCode]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldWrapper>
        <FormattedMessage id="PostalCodePanel.placeholder.postalCode" defaultMessage="Enter postal code">
          {(message) => (
            <input
              ref={register()}
              name="postalCode"
              type="text"
              placeholder={message}
              required
            />
          )}
        </FormattedMessage>
        <InfoPanel>
          <FormattedMessage
            id="LocationPanel.form.label.deliveryInfo"
            defaultMessage="demo1 finns för närvarande i Stockholm."
          />
        </InfoPanel>
      </FieldWrapper>
      {displayNotice && <Notice subscribeUrl={subscribeUrl} />}
      <ButtonGroup>
        <Button
          disabled={loading}
          type="submit"
        >
          <FormattedMessage id="general.next" defaultMessage="Next" />
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default PostalCodePanel;
