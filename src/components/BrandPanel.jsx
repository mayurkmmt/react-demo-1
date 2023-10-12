import React from 'react';

import SelectPanel from './SelectPanel';

const BrandPanel = ({
  panelId,
  values,
  brands,
  onSubmit,
  onBack,
}) => (
  <SelectPanel
    onBack={onBack}
    defaultValues={values[panelId] || []}
    onSubmit={(selected) => {
      onSubmit({
        ...values,
        [panelId]: selected,
      });
    }}
    choices={brands.map((b) => ({
      label: b.name,
      icon: b.icon,
      value: b,
    }))}
  />
);

export default BrandPanel;
