import React from 'react';
import { Slider, Slide } from 'react-materialize';

const HomeImageSlider = props => (
<Slider>
  <Slide
    src="https://thumbs.dreamstime.com/z/vector-people-earning-business-marketing-online-background-concept-45048557.jpg"
    >
  </Slide>
  <Slide
    src="https://t3.ftcdn.net/jpg/00/73/16/20/500_F_73162042_tnImPS73iJHMGRVUhRu0x6ZBD40MKhb4.jpg"
    placement="left">
    <span className="black-text">Connect your business with our various users</span>
  </Slide>
</Slider>
);

export default HomeImageSlider;

