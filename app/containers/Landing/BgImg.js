import styled from 'styled-components';

import Img from 'components/Img';

const BgImg = styled(Img)`
  min-height: 100%;
  min-width: 100%;
  height: auto;
  width: auto;
  position: absolute;
  top: -100%; bottom: -100%;
  left: -100%; right: -100%;
  margin: auto;
`;

export default BgImg;
