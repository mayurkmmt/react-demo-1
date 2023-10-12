import React from 'react';
import { FormattedMessage } from 'react-intl';

import SelectDropdown from './SelectDropdown';

const DevicePanel = ({
  panelId,
  values,
  onSubmit,
  onBack,
}) => (
  <SelectDropdown
    title={<FormattedMessage id="DevicePanel.title" defaultMessage="Select device" />}
    key="select-brand"
    onBack={onBack}
    defaultValues={values[panelId] || []}
    onSubmit={(selected) => {
      onSubmit({
        ...values,
        [panelId]: selected,
      });
    }}
    choices={values.family.devices.map((device) => ({
      label: device.name,
      icon: device.icon,
      value: device,
    }))}
  />
);

export default DevicePanel;
