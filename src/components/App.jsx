import React from 'react';
import styled from '@emotion/styled';

import { IntlProvider } from 'react-intl';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTablet, faMobile } from '@fortawesome/pro-solid-svg-icons';

import messagesEs from '../translations/es.json';
import messagesEn from '../translations/en.json';
import messagesSv from '../translations/sv.json';

import BrandProvider from '../providers/BrandProvider';
import OrderProvider from '../providers/OrderProvider';
import LogisticsProvider from '../providers/LogisticsProvider';

import theme from '../theme';

import Wizard from './Wizard';
import StatusPage from './StatusPage';

library.add(faTablet, faMobile);

const messages = {
  en: messagesEn,
  es: messagesEs,
  sv: messagesSv,
};

const StyledApp = styled.div`
  color: #333;
  font-family: ${theme.typography.normal.family};
  font-weight: ${theme.typography.normal.normal};
  line-height: 1.5;

  * {
    box-sizing: border-box;
  }

  a {
    color: ${theme.palette.links.base};
    cursor: pointer;
  }

  button,
  input,
  textarea {
    font-family: ${theme.typography.normal.family};
  }
`;

const App = ({
  defaultValues,
  startAt,
  code,
  onOrderCreated,
  onStepChange,
  stripeKey,
  locale,
  vat = 0.21,
  shipmentFee = 0.0,
  tosUrl = null,
  ppUrl = null,
  subscribeUrl = null,
}) => (
  <StyledApp id="container">
    {typeof code === 'undefined'
      ? <Wizard
        defaultValues={defaultValues}
        startAt={startAt}
        vat={vat}
        shipmentFee={parseFloat(shipmentFee)}
        tosUrl={tosUrl}
        ppUrl={ppUrl}
        subscribeUrl={subscribeUrl}
        onOrderCreated={onOrderCreated}
        onStepChange={onStepChange}
        locale={locale}
      />
      : <StatusPage
        code={code}
        locale={locale}
        vat={vat}
        shipmentFee={shipmentFee}
        stripeKey={stripeKey}
      />
    }
  </StyledApp>
);

const WrappedApp = ({
  locale = 'en',
  baseURL,
  shipmentFee,
  ...props
}) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    <LogisticsProvider baseURL={baseURL} locale={locale}>
      <BrandProvider baseURL={baseURL} locale={locale}>
        <OrderProvider baseURL={baseURL} locale={locale}>
          <App locale={locale} shipmentFee={shipmentFee} {...props} />
        </OrderProvider>
      </BrandProvider>
    </LogisticsProvider>
  </IntlProvider>
);

export default WrappedApp;
