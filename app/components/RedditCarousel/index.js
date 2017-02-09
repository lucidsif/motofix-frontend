/**
*
* RedditCarousel
*
*/

import React from 'react';
import Carousel from 'react-slick';
import { Image } from 'semantic-ui-react';

import greatIdea from './great-idea.png';
import gladIdea from './glad-read.png';
import likeIdea from './like-idea.png';
import fellowDev from './fellow-dev.png';

// TODO: Update to latest version when patch is available for invalid props warning bug
class RedditCarousel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const settings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3500,
      touchMove: true,
      speed: 1000,
      fade: true,
      dots: true,
    };
    return (
      <Carousel {...settings}>
        <Image src={greatIdea} size="huge" centered />
        <Image src={gladIdea} size="huge" centered />
        <Image src={likeIdea} size="huge" centered />
        <Image src={fellowDev} size="huge" centered />
      </Carousel>
    );
  }
}

export default RedditCarousel;
