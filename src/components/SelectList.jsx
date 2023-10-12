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
  border-radius: 0.25rem;
  width: ${({ fullWidth }) => (
    fullWidth ? 'calc(100%)' : 'calc(25% - 1rem)'
  )};
  padding: 0rem;
  margin: 0rem;
  text-align: center;
  cursor: pointer;
  background: ${({ selected }) => (
    selected ? '#FBFAF6' : 'transparent'
  )};
  color: ${theme.components.box.fg};
  border: 1px solid ${({ selected }) => (
    selected ? theme.palette.primary.base : 'transparent'
  )};
  &:not(:last-of-type) {
    border-bottom: 1px solid  ${({ selected }) => (
    selected ? theme.palette.primary.base : theme.components.box.border
  )};
  }

  &::-moz-focus-inner {
    border: 0;
  }

  &:active,
  &:focus {
    outline: 0;
  }

  .icon-wrapper {
    height: 3rem;
    margin: 1rem 0;
    position relative;

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
      opacity: 0.7;

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
     border: 1px solid #02BB4F;
     
    .icon {
      opacity: 1;
    }
  }

  .selected-checkbox {
    position: absolute;
    left: .5rem;
    top: .3rem;
    color: ${theme.palette.primary.base};
    animation: ${scaleAnimation} 150ms;
  }

  .choice-body {
    display: flex;
    align-items: center;

    .icon-wrapper {
      width: ${({ descriptive }) => (descriptive ? '20%' : '100%')};
      align-self: baseline;
    }

    .description-wrapper {
      width: 85%;
      padding: 1rem 0;
      text-align: left;
      display: flex;
      flex-direction: column;

      .header {
        display:flex;
        font-weight: 500;
        font-size: 1rem;
        .price {
          white-space: nowrap;
          font-weight: 500;
          padding-right: 1rem;
        }
        .label {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
      }

      .description {
        padding-bottom: 0rem;
        font-size: 0.8125rem;
        line-height: 1.45;
      }

      .support-link {
        padding-top: 1rem;
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

          <div className="choice-body">
            <div className="icon-wrapper">
              {icon !== null
                ? <img className="icon" src={icon} />
                : <div className="no-icon"><FormattedMessage id="SelectList.noIcon" defaultMessage="No icon" /></div>
              }
            </div>
            {descriptive && (
              <div className="description-wrapper">
                <div className="header">
                  {isSelected && <div className="selected-checkbox"><CheckIcon size="1.2rem" /></div>}
                  <div className="label">{label}</div>
                  {typeof price !== 'undefined' && <div className="price">{price} kr</div>}
                </div>
                <div className="description">{description}</div>
                {url && (
                  <div className="support-link">
                    <a href={url} target="_blank"><FormattedMessage id="SelectList.urlMessage" defaultMessage="Additional information here" /></a>
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

const SelectList = ({
  onSubmit: originalOnSubmit,
  onBack,
  choices,
  optional = false,
  multi = false,
  fullWidth = false,
  descriptive = false,
  emptyText = <FormattedMessage id="SelectList.noChoices" defaultMessage="No choices available for this configuration." />,
  autoSubmit = false,
  alwaysDisplaySubmit = true,
  defaultValues = [],
}) => {
  const [selected, setSelected] = useState(
    Array.isArray(defaultValues) ? defaultValues : [defaultValues],
  );

  const onSubmit = (values) => {
    console.log(values);
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

export default SelectList;
