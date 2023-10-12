import React from 'react';
import { useIntl } from 'react-intl';
import SelectList from './SelectList';

const AddonsPanel = ({
  panelId,
  values,
  onBack,
  onSubmit,
}) => {
  const intl = useIntl();
  const addons = values.device.services.filter(({ category }) => category === 'addon');

  return (
    <SelectList
      defaultValues={values[panelId] || []}
      onBack={onBack}
      emptyText={intl.formatMessage({ id: 'AddonPanel.addon.Error.empty', defaultMessage: 'There are no addons available for this model.' })}
      onSubmit={(selected) => {
        onSubmit({
          ...values,
          [panelId]: selected,
        });
      }}
      choices={addons.map((service) => ({
        label: service.name,
        price: service.price,
        icon: service.icon,
        currency: service.currency,
        value: service,
        description: service.description,
        url: service.url,
      }))}
      multi
      fullWidth
      descriptive
      optional={values.issues.length > 0}
    />
  );
};

export default AddonsPanel;
