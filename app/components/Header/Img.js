import styled from 'styled-components';

import NormalImg from 'components/Img';

const Img = styled(NormalImg)`
  min-height:100%;
  min-width:100%;
  height:auto;
  width:auto;
  position:absolute;
  top:-100%; bottom:-100%;
  left:-100%; right:-100%;
  margin:auto;
`;

export default Img;
