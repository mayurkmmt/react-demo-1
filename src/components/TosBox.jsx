import React from 'react';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

import theme from '../theme';

const StyledBox = styled.label`
  margin: 1.5rem 0;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  color: ${theme.palette.faded1.base};

  input {
    min-width: 15px;
    margin-right: 0.5rem;
    position: relative;
    top: 2px;
  }
`;

const TosBox = ({ tosUrl, ppUrl }) => (
  <StyledBox>
    <input type="checkbox" required />
    <div>
      <FormattedMessage
        id="TosBox.text"
        defaultMessage="I agree to the {tosLink} and {ppLink}."
        values={{
          tosLink: <a href={tosUrl} target="_blank"><FormattedMessage id="TosBox.tosText" defaultMessage="användarvillkoren" /></a>,
          ppLink: <a href={ppUrl} target="_blank"><FormattedMessage id="TosBox.ppText" defaultMessage="Privacy Policy" /></a>,
        }}
      />
    </div>
  </StyledBox>
);

export default TosBox;
