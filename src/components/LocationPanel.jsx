import React from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import styled from '@emotion/styled';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import TosBox from './TosBox';
import FieldWrapper, { Label } from './FieldWrapper';
import theme from '../theme';

const StyledBox = styled.label`
  input[type="checkbox"] + div {
    width: calc(100% - 15px);
  }
  margin: 1.5rem 0;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  color: ${theme.palette.faded1.base};

  input {
    margin-right: 0.5rem;
    position: relative;
    top: 2px;
  }
`;

const LocationPanel = ({
  panelId,
  values,
  onBack,
  onSubmit: defaultOnSubmit,
  tosUrl = null,
  ppUrl = null,
}) => {
  const intl = useIntl();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...(values[panelId] || {}),
      postalCode: values.postalCode.postalCode,
    },
  });

  const onSubmit = (formValues) => {
    defaultOnSubmit({
      ...values,
      [panelId]: formValues,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldWrapper>
        <Label><FormattedMessage id="LocationPanel.form.label.firstName" defaultMessage="Förnamn"/></Label>
        <input ref={register} name="firstName" type="text" placeholder={intl.formatMessage({
          id: 'LocationPanel.form.firstName',
          defaultMessage: 'Förnamn',
        })} required/>
      </FieldWrapper>
      <FieldWrapper>
        <Label><FormattedMessage id="LocationPanel.form.label.lastName" defaultMessage="Efternamn"/></Label>
        <input ref={register} name="lastName" type="text" placeholder={intl.formatMessage({
          id: 'LocationPanel.form.lastName',
          defaultMessage: 'Efternamn',
        })} required/>
      </FieldWrapper>
      <FieldWrapper detached>
        <Label><FormattedMessage id="LocationPanel.form.label.address" defaultMessage="Street"/></Label>
        <input ref={register} name="address" type="text"
               placeholder={intl.formatMessage({ id: 'LocationPanel.form.address', defaultMessage: 'Gatuadress' })}
               required/>
      </FieldWrapper>
      <FieldWrapper>
        <Label><FormattedMessage id="LocationPanel.form.label.city" defaultMessage="City"/></Label>
        <input ref={register} name="city" type="text"
               placeholder={intl.formatMessage({ id: 'LocationPanel.form.city', defaultMessage: 'Ort' })}
               required/>
      </FieldWrapper>
{/*       <FieldWrapper hiddenInput>
        <Label><FormattedMessage id="LocationPanel.form.label.region" defaultMessage="Region"/></Label>
        <input ref={register} name="region" type="text"
               placeholder={intl.formatMessage({ id: 'LocationPanel.form.region', defaultMessage: 'Your region ...' })}
               required/>
      </FieldWrapper> */}
      <FieldWrapper reducedInput>
        <Label><FormattedMessage id="LocationPanel.form.label.postalCode" defaultMessage="Postnummer"/></Label>
        <input
          ref={register}
          name="postalCode"
          type="text"
          placeholder={intl.formatMessage({
            id: 'LocationPanel.form.postalCode',
            defaultMessage: 'Postnummer',
          })}
          required
          readOnly={!!values.postalCode.postalCode}
        />
      </FieldWrapper>
      <FieldWrapper detached>
        <Label><FormattedMessage id="LocationPanel.form.label.email" defaultMessage="Email"/></Label>
        <input ref={register} name="email" type="email"
               placeholder={intl.formatMessage({ id: 'LocationPanel.form.email', defaultMessage: 'E-postadress' })}
               required/>
      </FieldWrapper>

      <FieldWrapper>
        <Label><FormattedMessage id="LocationPanel.form.label.phone" defaultMessage="Telefonnummer"/></Label>
        <input ref={register} name="phone" type="text" placeholder={intl.formatMessage({
          id: 'LocationPanel.form.phone',
          defaultMessage: 'Telefonnummer',
        })} required/>
      </FieldWrapper>
      <FieldWrapper detached>
        <Label><FormattedMessage id="LocationPanel.form.label.unlockCode" defaultMessage="Upplåsningskod"/></Label>
        <input ref={register} name="unlockCode" type="text" placeholder={intl.formatMessage({
          id: 'LocationPanel.form.unlockCode',
          defaultMessage: 'Upplåsningskod',
        })}/>
      </FieldWrapper>
      {tosUrl !== null && <TosBox tosUrl={tosUrl} ppUrl={ppUrl}/>}

      <StyledBox>
        <input type="checkbox" ref={register} name="allow_marketing" value="yes" />
        <div>
          <FormattedMessage
            id="MarketingBox.text"
            defaultMessage="I approve communication from demo1."
            values={{
            }}
          />
        </div>
      </StyledBox>

      <input ref={register} name="country" type="hidden" value="ES"/>

      <ButtonGroup>
        <Button onClick={onBack} design="text"><FormattedMessage id="general.back" defaultMessage="Back"/></Button>
        <Button type="submit"><FormattedMessage id="general.next" defaultMessage="Next"/></Button>
      </ButtonGroup>
    </form>
  );
};

export default LocationPanel;
