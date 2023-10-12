import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import theme from '../theme';
import ButtonGroup from './ButtonGroup';
import Button from './Button';

const StyledEmpty = styled.div`
  background: ${theme.palette.faded3.base};
  color: ${theme.palette.faded3.contrast};
  padding: 1rem;
  border-radius: 0.2rem;
`;

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: 5,
  }),
}

const SelectDD = ({
  toggleSelect,
  choices,
  selected,
}) => {
  const options = choices.map((option) => ({
    label: option.label,
    value: option.value,
  }));

  return (
  <>
   <Select styles={customStyles} options={options} onChange={toggleSelect} placeholder={'Välj modell på din telefon...'} defaultValue={selected.length > 0 ? {
     label: selected[0]?.name,
     value: selected,
   } : null} />
  </>
  );
};


const SelectDropdown = ({
  onSubmit: originalOnSubmit,
  onBack,
  choices,
  optional = false,
  multi = false,
  descriptive = false,
  emptyText = <FormattedMessage id="SelectDropdown.noChoices" defaultMessage="No choices available for this configuration." />,
  autoSubmit = false,
  alwaysDisplaySubmit = true,
  defaultValues = [],
}) => {
  const [selected, setSelected] = useState(
    Array.isArray(defaultValues) ? defaultValues : [defaultValues],
  );

  const onSubmit = (value) => {
    if (!multi) {
      originalOnSubmit(value.length === 1 ? value[0] : null);
    } else {
      originalOnSubmit(value);
    }
  };

  const toggleSelect = (selectedOption) => {
    const { value } = selectedOption;
    if (!multi && autoSubmit) {
      onSubmit([value]);
    }

    if (!multi) {
      setSelected(selected.includes(value) ? [] : [value]);
    } else if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return <>
    {choices.length === 0
      ? <StyledEmpty>{emptyText}</StyledEmpty>
      : <SelectDD
        choices={choices}
        selected={selected}
        toggleSelect={toggleSelect}
        descriptive={descriptive}
      />
    }
    <ButtonGroup>
      {!!onBack && <Button onClick={onBack} design="text"><FormattedMessage id="general.back" defaultMessage="Back" /></Button>}
      {(optional || multi || alwaysDisplaySubmit || (!multi && selected.length > 0)) && (
        <Button
          type="button"
          onClick={() => onSubmit(selected)}
          disabled={!optional && selected.length === 0}
        >
          <FormattedMessage id="general.next" defaultMessage="Next" />
        </Button>
      )}
    </ButtonGroup>
  </>;
};

export default SelectDropdown;
