import React from 'react';
import { Slider, Slide } from 'react-materialize';

const HomeImageSlider = props => (
<Slider indicators={false}>
  <Slide
    src="https://thumbs.dreamstime.com/z/vector-people-earning-business-marketing-online-background-concept-45048557.jpg"
    >
  </Slide>
  <Slide
    className="img-responsive"
    src="/images/growing-business.jpg"
    placement="right">
  </Slide>
  <Slide
    src="/images/help-your-business-grow.jpg"
    placement="right">
  </Slide>
</Slider>
);

export default HomeImageSlider;

