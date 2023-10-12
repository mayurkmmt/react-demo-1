import React from 'react';

import SelectList from './SelectList';

const IssuesPanel = ({
  panelId,
  values,
  onBack,
  onSubmit,
}) => {
  const issues = values.device.services.filter(({ category }) => category === 'issue');

  return (
    <SelectList
      fullWidth
      descriptive
      onBack={onBack}
      defaultValues={values[panelId] || []}
      onSubmit={(selected) => {
        onSubmit({
          ...values,
          [panelId]: selected,
        });
      }}
      choices={
        issues.map((service) => ({
          label: service.name,
          price: service.price,
          icon: service.icon,
          currency: service.currency,
          value: service,
        }))
      }
      multi
      optional
    />
  );
};

export default IssuesPanel;
