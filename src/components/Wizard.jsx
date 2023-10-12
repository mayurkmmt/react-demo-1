import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { parseJSON, format } from 'date-fns';

import { useOrderContext, useCreateOrder } from '../providers/OrderProvider';
import { useBrandContext, useRequestBrands } from '../providers/BrandProvider';
import { steps, groups } from '../steps';

import WizardPanel from './WizardPanel';
import Loading from './Loading';

const StyledWizard = styled.div`
`;

const Wizard = ({
  children,
  defaultValues = {},
  onOrderCreated = () => null,
  onStepChange = () => null,
  locale,
  ...props
}) => {
  const [currentPanel, setCurrentPanel] = useState(steps[0].id);
  const [values, setValues] = useState({ ...defaultValues });

  const { brands } = useBrandContext();
  const { loading } = useRequestBrands();
  const { order } = useOrderContext();
  const {
    loading: createLoading,
    dispatcher: createOrder,
  } = useCreateOrder();

  useEffect(() => {
    if (order !== null) {
      onOrderCreated(order);
    }
  }, [order]);

  useEffect(() => {
    onStepChange(currentPanel);
  }, [currentPanel]);

  if (loading) {
    return <Loading />;
  }

  if (createLoading) {
    return <Loading text="Creating order ..." />;
  }

  if (order !== null) {
    return <Loading text="Finalizing order ..." />;
  }

  const index = steps.findIndex(({ id }) => id === currentPanel);

  if (index === -1) {
    return 'Invalid step identifier';
  }

  const onBack = index === 0
    ? undefined
    : () => setCurrentPanel(steps[index - 1].id);

  const {
    id,
    title,
    Component,
    extraProps = [],
  } = steps[index];

  const next = index + 1 < steps.length
    ? steps[index + 1].id
    : null;

  const stepSpecificProps = extraProps.reduce((acc, propName) => ({
    ...acc,
    [propName]: { ...props, locale }[propName],
  }), {});

  return (
    <StyledWizard {...props}>
      <WizardPanel
        steps={steps}
        groups={groups}
        current={id}
        index={index}
      >
        <Component
          panelId={id}
          values={values}
          steps={steps}
          groups={groups}
          title={title}
          brands={brands}
          onBack={onBack}
          onSubmit={(updatedValues) => {
            // Reset data where applicable in case the user has previously moved
            // backwards.
            const filteredValues = steps.reduce((acc, { id: stepId, resetOn = [] }) => ({
              ...updatedValues,
              [stepId]: resetOn.includes(id) ? undefined : acc[stepId],
            }), updatedValues);
            setValues(filteredValues);

            if (next !== null) {
              setCurrentPanel(next);
            } else {
              createOrder([{
                ...updatedValues.location,
                deviceSlug: updatedValues.device.slug,
                preferredLanguage: 'es',
                services: [
                  ...(updatedValues.issues || []).map(({ slug }) => slug),
                  ...(updatedValues.addons || []).map(({ slug }) => slug),
                ],
                slot: {
                  slot: updatedValues.slot.slot.id,
                  date: format(parseJSON(updatedValues.slot.slot.start), 'yyyy-MM-dd'),
                },
                noPrinter: updatedValues.slot.noPrinter,
                promoCode: updatedValues.promoCode,
              }]);
            }
          }}
          {...stepSpecificProps}
        />
      </WizardPanel>
    </StyledWizard>
  );
};

export default Wizard;
