import styled from 'styled-components';
import is from 'styled-is';
import Image from '@crystallize/react-image';

import { colors, responsive } from 'ui';

export const imageSize = {
  lg: '300px',
  xs: '150px'
};

export const Outer = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: stretch;
  justify-content: center;
  border-radius: 12px;
  position: relative;
  &:after {
    content: '';
    background: ${colors.frostbite};
    width: 80%;
    height: 5%;
    position: absolute;
    left: 10%;
    bottom: -1px;
    filter: blur(9px);
    opacity: 0.15;
    transition: opacity 0.2s ease-in-out, filter 0.2s ease-in-out;
  }
  &:hover:after {
    filter: blur(4px);
    opacity: 0.35;
  }
`;

export const Inner = styled.span`
  text-decoration: none;
  width: 100%;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-weight: 600;
  color: ${colors.darkText};
  text-align: center;
  align-items: stretch;
  justify-content: stretch;
  background: #fff;
  border-radius: 12px;
  &:hover {
    background: #fefefe;
  }

  ${is('onlytext')`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  `};
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

export const Img = styled(Image)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;

  > img {
    width: 150px;
    height: 150px;
  }
`;

export const ContentLine = styled.div`
  display: flex;
  padding: 15px;
  margin:8px;  
  flex-direction ${p => (p.right ? 'row-reverse' : 'row')};
  justify-content: space-between;
  align-items: stretch;
  text-overflow: ellipsis;

  > div {
    flex: 1;
  }

  ${responsive.xs} {
    margin: 0;
  }
`;

export const Price = styled.span`
  color: ${colors.price};
`;
