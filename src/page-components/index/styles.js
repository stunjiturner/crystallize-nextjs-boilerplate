import styled from 'styled-components';

import { Outer as O } from 'ui';

export const Hero = styled.div`
  margin: 0;
  padding: 0;
`;

export const Outer = styled(O)`
  max-width: 1600px;
  padding: 0;
`;

export const Text = styled.div`
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;

  h3 {
    font-size: 1.6em;
    color: inherit;
    font-family: 'Roboto Slab', 'Roboto', 'sans-serif';
    margin: 0;
  }
`;