import React from 'react';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

import theme from '../theme';

const StyledPropertyKey = styled.div`
`;

const StyledPropertyValue = styled.div`

  font-family: 'Avenirnextltpro demi', sans-serif;

`;

const StyledProperty = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) => props.prominent && `
    font-weight: ${theme.typography.normal.medium};
  `}
`;

const StyledSection = styled.div`
  margin: 1rem 0;

  ${(props) => props.borderTop && `
    border-top: 1px dashed ${theme.palette.faded3.base};
    padding-top: 1rem;
  `}
  ${(props) => props.borderBottom && `
    border-bottom: 1px dashed ${theme.palette.faded3.base};
    padding-bottom: 1rem;
  `}
`;

const Property = ({ name, value, prominent = false }) => (
  <StyledProperty prominent={prominent}>
    <StyledPropertyKey>{name}</StyledPropertyKey>
    <StyledPropertyValue>{value}</StyledPropertyValue>
  </StyledProperty>
);

/**
 * Normalize the internal order data format to match the one returned by the
 * API. The aim should probably be to make the API more similar to the
 * internal representation in the future.
 */
const generateOrderObject = ({
  issues = [],
  addons = [],
  brand = null,
  device = null,
  location = {},
  slot = {},
}) => {
  const {
    address = '-',
    city = '-',
    firstName = '-',
    lastName = '-',
    phone = '-',
    email = '-',
    postalCode = '-',
  } = location;

  const {
    end,
    start,
  } = slot;

  const order = {
    orderId: null,
    brand,
    device: {
      name: device.name,
      brand: {
        name: device.brand.name,
      },
    },
    currentOrder: {
      total: [...issues, ...addons].reduce((acc, { price }) => (
        acc + parseFloat(price)
      ), 0),
      orderUnits: [
        ...issues,
        ...addons,
      ].map((service) => ({
        service,
      })),
    },
    address,
    city,
    firstName,
    lastName,
    phone,
    email,
    postalCode,
    slot: {
      end,
      start,
    },
  };
  return order;
};

const OrderSummary = ({
  values = null,
  order: orderObject = null,
  isReviewOrder = false,
  vat,
  shipmentFee,
  promo,
}) => {
  const order = orderObject !== null
    ? { ...orderObject }
    : generateOrderObject(values);

  const {
    orderId,
    device,
    currentOrder,
    reviewedOrder,
  } = order;

  const orderGroup = isReviewOrder
    ? reviewedOrder
    : currentOrder;

  const {
    total: originalTotal,
    orderUnits: services,
  } = orderGroup;

  const currency = services.length > 0
    ? services[0].service.currency
    : '-';

  let discount = 0;
  if (promo && promo.discountPercent) {
    discount = originalTotal * (parseInt(promo.discountPercent, 10) / 100);
  }
  if (promo && promo.discountAmount) {
    discount = parseFloat(promo.discountAmount);
  }
  const subTotal = originalTotal - discount;
  const total = isReviewOrder ? subTotal : subTotal + shipmentFee;

  return (
    <>
      <StyledSection>
        {orderId !== null && <Property
            name={<FormattedMessage id="OrderSummary.orderId" defaultMessage="Order id" />}
            value={`#${orderId}`}
          />
        }
        <Property
          name={<FormattedMessage id="OrderSummary.brand" defaultMessage="Brand" />}
          value={device !== null ? device.brand.name : '-'}
        />
        <Property
          name={<FormattedMessage id="OrderSummary.device" defaultMessage="Device" />}
          value={device !== null ? device.name : '-'}
        />
      </StyledSection>
      <StyledSection borderTop>
          {services.map(({ service: { id, name, price } }) => (
            <Property
              key={id}
              name={name}
              value={`${price} ${currency}`}
            />
          ))}
      </StyledSection>
      {promo !== null && (promo.discountPercent || promo.discountAmount)
        && <StyledSection borderTop>
          <Property
            prominent
            name={promo.discountPercent ? <>{promo.discountPercent}
              <FormattedMessage
                id="OrderSummary.discountPercent"
                defaultMessage=" percent discount"
              /></> : <>{`${promo.discountAmount} ${currency}`}
              <FormattedMessage
                id="OrderSummary.discountAmount"
                defaultMessage=" discount"
              /></>
            }
            value={`-${discount.toFixed(2)} ${currency}`}
          />
        </StyledSection>
      }
      {!isReviewOrder && <StyledSection borderTop>
          <Property
            name={<FormattedMessage id="OrderSummary.shipmentFee" defaultMessage="Shipment fee" />}
            value={`${shipmentFee.toFixed(2)} ${currency}`}
          />
        </StyledSection>
      }
      {vat !== null
        && <StyledSection borderTop>
          <Property
            prominent
            name={<FormattedMessage id="OrderSummary.totalBeforeVAT" defaultMessage="Total before VAT" />}
            value={`${(total / (1 + vat)).toFixed(2)} ${currency}`}
          />
          <Property
            prominent
            name={<FormattedMessage id="OrderSummary.VATIncl" defaultMessage="VAT incl" />}
            value={`${(total - total / (1 + vat)).toFixed(2)} ${currency}`}
          />
        </StyledSection>
      }
      <StyledSection borderTop>
        <Property
          prominent
          name="Total"
          name={<FormattedMessage id="OrderSummary.total" defaultMessage="Total" />}
          value={`${total.toFixed(2)} ${currency}`}
        />
      </StyledSection>
    </>
  );
};

export default OrderSummary;
