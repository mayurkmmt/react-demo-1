import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { FormattedMessage } from 'react-intl';

import theme from '../theme';

import ButtonGroup from './ButtonGroup';
import Button from './Button';
import CheckIcon from '../icons/CheckIcon';
import NewWindowIcon from '../icons/NewWindowIcon';

const scaleAnimation = keyframes`
  0% {
      transform: scale(0.2);
  }

  100% {
      transform: scale(1.0);
  }
`;

const StyledChoices = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
  overflow: auto;
`;

const StyledChoice = styled.button`
  position: relative;
  border-radius: 0.35rem;
  width: ${({ fullWidth }) => (
    fullWidth ? 'calc(100% - 1rem)' : 'calc(25% - 1rem)'
  )};
  padding: 1.4rem 0.75rem;
  margin: 0.5rem;
  text-align: center;
  cursor: pointer;
  background: ${theme.components.box.bg};
  color: ${theme.components.box.fg};
  border: 2px solid ${({ selected }) => (
    selected ? theme.palette.primary.base : theme.components.box.border
  )};
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);

  &::-moz-focus-inner {
    border: 0;
  }

  &:active,
  &:focus {
    outline: 0;
  }

  .icon-wrapper {
    height: 1rem;
    margin: 0 0 1rem 0;
    position relative;
    align-self: baseline;

    .no-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;

      display: block;
      margin: 0 auto;
      height: 100%;
      width: auto;
      max-width: 75%;
    }
  }

  &:hover {
     box-shadow: 0px 2px 8px #ccc;
     color: #000;
     border: 2px solid #02BB4F;
     
    .icon {
      opacity: 1;
    }
  }

  .selected-checkbox {
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
    color: ${theme.palette.primary.base};
    animation: ${scaleAnimation} 150ms;
  }

  .price {
    position: absolute;
    left: 1rem;
    top: 1rem;
    border-bottom: none;
    padding: 0;
    text-align: left;
    color: ${theme.palette.faded1.base};
  }

  .choice-body {
    display: flex;

    .icon-wrapper {
      width: ${({ descriptive }) => (descriptive ? '20%' : '100%')};
      align-self: baseline;
    }

    .description-wrapper {
      width: 75%;
      padding: 1rem 0;
      text-align: left;
      display: flex;
      flex-direction: column;

      .label {
        font-weight: 500;
        padding-bottom: 1rem;
        font-size: 1rem;
      }

      .description {
        padding-bottom: 0.5rem;
      }

      a {
        text-decoration: none;
        color: ${theme.palette.links.base};
        padding-right: 0.5rem;
      }
    }
  }

  .label {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: 'Avenirnextltpro demi', sans-serif;
    font-size: 14px;
  }
`;

const StyledEmpty = styled.div`
  background: ${theme.palette.faded3.base};
  color: ${theme.palette.faded3.contrast};
  padding: 1rem;
  border-radius: 0.2rem;
`;

const Choices = ({
  toggleSelect,
  choices,
  selected,
  fullWidth,
  descriptive,
}) => (
  <StyledChoices>
    {choices.map(({
      label,
      value,
      price,
      description = null,
      url = null,
      icon = null,
    }) => {
      const isSelected = selected.includes(value);
      return (
        <StyledChoice
          type="button"
          key={value.id}
          selected={isSelected}
          fullWidth={fullWidth}
          descriptive={descriptive}
          onClick={() => toggleSelect(value)}
        >
          <div className="header">
            {isSelected && <div className="selected-checkbox"><CheckIcon size="1.2rem" /></div>}
            {typeof price !== 'undefined' && <div className="price">{price} kr;</div>}
          </div>
          <div className="choice-body">
            <div className="icon-wrapper">
              {icon !== null
                ? <img className="icon" src={icon} />
                : <div className="no-icon"><FormattedMessage id="SelectPanel.noIcon" defaultMessage="No icon" /></div>
              }
            </div>
            {descriptive && (description || url) && (
              <div className="description-wrapper">
                <div className="label">{label}</div>
                {description && <div className="description">{description}</div>}
                {url && (
                  <div className="support-link">
                    <a href={url} target="_blank"><FormattedMessage id="SelectPanel.urlMessage" defaultMessage="Additional information here" /></a>
                    <NewWindowIcon size="0.7rem" />
                  </div>
                )}
              </div>
            )}
          </div>
          {!descriptive && <div className="label">{label}</div>}
        </StyledChoice>
      );
    })}
  </StyledChoices>
);

const SelectPanel = ({
  onSubmit: originalOnSubmit,
  onBack,
  choices,
  optional = false,
  multi = false,
  fullWidth = false,
  descriptive = false,
  emptyText = <FormattedMessage id="SelectPanel.noChoices" defaultMessage="No choices available for this configuration." />,
  autoSubmit = false,
  alwaysDisplaySubmit = true,
  defaultValues = [],
}) => {
  const [selected, setSelected] = useState(
    Array.isArray(defaultValues) ? defaultValues : [defaultValues],
  );

  const onSubmit = (values) => {
    if (!multi) {
      originalOnSubmit(values.length === 1 ? values[0] : null);
    } else {
      originalOnSubmit(values);
    }
  };

  const toggleSelect = (value) => {
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
      : <Choices
        choices={choices}
        selected={selected}
        toggleSelect={toggleSelect}
        fullWidth={fullWidth}
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

export default SelectPanel;
