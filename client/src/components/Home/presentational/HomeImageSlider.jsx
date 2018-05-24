import React from 'react';
import { Slider, Slide } from 'react-materialize';

const HomeImageSlider = props => (
<Slider>
  <Slide
    src="https://thumbs.dreamstime.com/z/vector-people-earning-business-marketing-online-background-concept-45048557.jpg"
    >
  </Slide>
  <Slide
    src="/images/tokyo-at-night.jpg"
    placement="left">
    <span className="black-text">Connect your business with our various users</span>
  </Slide>
</Slider>
);

export default HomeImageSlider;

