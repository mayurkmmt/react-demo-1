import styled from '@emotion/styled';

const StyledButtonGroup = styled.div`
  margin-top: 3.0rem;
  display: flex;
  align-items: center;

  ${(props) => (props.centered
    ? `
      justify-content: center;
    `
    : `
      > *:last-child {
        margin-left: auto;
      }
    `
  )}

`;

export default StyledButtonGroup;
