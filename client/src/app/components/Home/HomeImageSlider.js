import React from 'react';

const HomeImageSlider = props => (
        <div className="slider">
            <ul className="slides">
                <li>
                    <img className="responsive-img" id="growingBusiness" src="" alt="Growing Business" />
                </li>
                <li>
                    <img className="responsive-img" id="businessSlider" style={{ width: `${100}%vw` }} src="" alt="business" />
                    <div className="caption left-align">
                        <h5 className="text-align-left blue-text">Connect your business with our various users</h5>
                    </div>
                </li>
            </ul>
        </div>
);

export default HomeImageSlider;

