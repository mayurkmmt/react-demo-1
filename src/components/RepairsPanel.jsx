import React from 'react';
import { FormattedMessage } from 'react-intl';

import SelectPanel from './SelectPanel';

const IssuesPanel = ({
  panelId,
  values,
  onSubmit,
}) => (
  <SelectPanel
    title={<FormattedMessage id="RepairsPanel.title" defaultMessage="Select repairs" />}
    key="select-brand"
    onSubmit={(selected) => {
      onSubmit({
        ...values,
        [panelId]: selected,
      });
    }}
    choices={values.device.services
      .filter(({ category }) => category === 'issue')
      .map((device) => ({
        label: device.name,
        value: device,
      }))
    }
    multi
  />
);

export default IssuesPanel;
