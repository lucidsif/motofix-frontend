import styled from 'styled-components';

import NormalImg from 'components/Img';

const BackgroundImg = styled(NormalImg)`
position: fixed;
top: 0;
left: 0;
display: block;

/* Preserve aspet ratio */
min-width: 100%;
min-height: 100%;
`;

export default BackgroundImg;
