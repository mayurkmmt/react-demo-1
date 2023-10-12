import styled from '@emotion/styled';

import theme from '../theme';

const StyledBackdrop = styled.div`
  padding: 2rem;
  border-radius: 0.25rem;
  background: ${theme.components.backdrop.bg};
  color: ${theme.components.backdrop.fg};
  border: 1px solid ${theme.components.backdrop.border};
`;

export default StyledBackdrop;
