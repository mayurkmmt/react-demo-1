import React from 'react';
import { FormattedMessage } from 'react-intl';

import SelectPanel from './SelectPanel';

const FamilyPanel = ({
  panelId,
  values,
  onSubmit,
  onBack,
}) => (
  <SelectPanel
    title={<FormattedMessage id="FamilyPanel.title" defaultMessage="Select product family" />}
    key="select-brand"
    onBack={onBack}
    defaultValues={values[panelId] || []}
    onSubmit={(selected) => {
      onSubmit({
        ...values,
        [panelId]: selected,
      });
    }}
    choices={values.brand.productFamilies.map((pf) => ({
      label: pf.name,
      icon: pf.icon,
      value: pf,
    }))}
  />
);

export default FamilyPanel;
