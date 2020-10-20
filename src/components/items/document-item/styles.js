import styled from 'styled-components';
import Image from '@crystallize/react-image';

import { responsive } from 'ui';
import WidescreenRatio from 'ui/widescreen-ratio';

export const Outer = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${(p) => (p.span ? `grid-column-end: span ${p.span}` : null)};

  ${responsive.xs} {
    margin-bottom: 15px;
  }
`;

export const MediaWrapper = styled(WidescreenRatio)`
  flex: 0 0 auto;
`;

export const MediaInner = styled.div`
  flex: 1 1 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column; 
  width: 100%;
  color: white;

  text-align: center; 
  background-color: rgba(33, 33, 33, .3); 
  align-items: center;
`;

export const Img = styled(Image)`
  width: 100%;
  height: 100%;
  overflow: hidden;

  > img {
    display: block;
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

export const Text = styled.div`
  position: absolute;
  margin: 0;
  left: 0;                       /* horizontal alignment */
    top: 50%; 


  h3 {
    font-size: 4.6em;
    color: inherit;
    font-family: 'Roboto Slab', 'Roboto', sans-serif;
    margin: 0;
  }
`;

export const Description = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  margin-top: 10px;
  line-height: 1.2rem;
  color: inherit;
`;
