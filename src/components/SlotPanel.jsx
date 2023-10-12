import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';
import { parseJSON, format } from 'date-fns';
import { enUS as en, es, sv } from 'date-fns/locale';

import theme from '../theme';

import { useRequestSlots, useLogitsticsContext } from '../providers/LogisticsProvider';

import Loading from './Loading';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import CheckIcon from '../icons/CheckIcon';

const locales = { en, es, sv };

const StyledCheckboxLabel = styled.label`
  margin: 1.5rem 0;
  font-size: 0.9rem;
  display: none;
  align-items: flex-start;
  color: ${theme.palette.faded1.base};

  input {
    margin-right: 0.5rem;
    position: relative;
    top: 2px;
  }
`;

const StyledSlot = styled.div`
  margin-bottom: 1rem;
  cursor: pointer;
  background: ${theme.components.box.bg};
  border: 1px solid ${({ selected }) => (
    selected ? theme.palette.primary.base : theme.components.box.border
  )};
  padding: 1rem;
  border-radius: 0.2rem;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
  .dates {
    width:100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
  }
  .times {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .pickup {
      width:50%;
    }
    .dropoff {
      width:50%;
    }
  }
`;

const StyledDate = styled.div`
  font-family: ${theme.typography.buttons.family};
`;

const StyledShowMore = styled.div`
  text-align: right;
`;

const ShowMore = ({ limit, setLimit, step = 4 }) => (
  <StyledShowMore>
    <Button
      onClick={() => setLimit(limit + step)}
      design="text"
    >
      <FormattedMessage id="SlotPanel.showMore" defaultMessage="Show more" />
    </Button>
  </StyledShowMore>
);

const StyledChecked = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  border: 1px solid ${theme.palette.faded3.base};
  background: transparent;
  color: transparent;
  padding: 0.1rem;
  border-radius: 50%;
  border-radius: 0.2rem;

  ${(props) => (props.selected && `
    background: ${theme.palette.primary.base};
    border-color: ${theme.palette.primary.base};
    color: ${theme.palette.primary.contrast};
  `)}
`;

const Checked = ({ selected }) => (
  <StyledChecked selected={selected}><CheckIcon size="100%" /></StyledChecked>
);

const Slot = ({
  index,
  start,
  end,
  selected,
  setSelected,
  locale,
}) => {
  debugger;
  const startDate = parseJSON(start);
  const endDate = parseJSON(end);
  return (
    <StyledSlot
      selected={selected}
      onClick={() => setSelected(index)}
    >
      <div className='dates'>
        <StyledDate>{format(startDate, 'd MMMM', { locale: locales[locale] })}</StyledDate>
        <div className='times'>
          <div className='pickup'>{format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}</div>
          {/* <div className='dropoff'>Lämnas: senast 14:00</div> */}
        </div>

      </div>
      <Checked selected={selected} />
    </StyledSlot>
  );
};

const SlotPanel = ({
  panelId,
  values,
  onBack,
  onSubmit,
  locale,
}) => {
  const { postalCode } = values.postalCode;
  const { slots } = useLogitsticsContext();
  const {
    loading,
    dispatcher: getSlots,
  } = useRequestSlots();

  const [selected, setSelected] = useState(null);
  const [limit, setLimit] = useState(4);
  const [noPrinter, setNoPrinter] = useState(false);

  const toggleSelected = (index) => setSelected(index === selected ? null : index);

  useEffect(() => {
    getSlots([postalCode, noPrinter]);
  }, [noPrinter]);

  useEffect(() => {
    getSlots([postalCode, noPrinter]);
  }, []);

  return (
    <>

      <StyledCheckboxLabel>
        <input type="checkbox" value={noPrinter} onChange={() => setNoPrinter(!noPrinter)} />
        <div>
          <FormattedMessage id="SlotPanel.noPrinter" defaultMessage="I do not have access to a printer (may affect pick up times)." /></div>
      </StyledCheckboxLabel>
      {!loading && slots.sort(
        (a, b) => new Date(a.start) - new Date(b.start),
      ).slice(0, limit).map(({ start, end }, i) => (
        <Slot
          key={i}
          index={i}
          start={start}
          end={end}
          selected={selected === i}
          setSelected={toggleSelected}
          locale={locale}
        />
      ))}
      {loading && <Loading />}
      {limit < slots.length && <ShowMore setLimit={setLimit} limit={limit} />}
      <ButtonGroup>
        <Button onClick={onBack} design="text"><FormattedMessage id="general.back" defaultMessage="Back" /></Button>
        <Button
          disabled={selected === null}
          onClick={() => onSubmit({
            ...values,
            [panelId]: {
              slot: slots[selected],
              noPrinter,
            },
          })}
        >
          <FormattedMessage id="general.next" defaultMessage="Next" />
        </Button>
      </ButtonGroup>
    </>
  );
};

export default SlotPanel;
