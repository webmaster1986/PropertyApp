import React from 'react';
import NumberFormat from 'react-number-format';
import Slider from "react-slick";
import noImage from '../../static/images/noimage.png';
import defaultImage from '../../static/images/default_slider.png';
import './property-details.css';

const ProprtyDetails = ({ propertyObject, mapUrl }) => {
    const { propertyImages, url, address, details, city, state, zipCode, bedNum, bathNum, squareFeet, dollarPerSquare, yearBuilt, price } = propertyObject;
    const images = propertyImages || [defaultImage];

    const onError = (img) => {
        img.target.src = noImage
    }

    return (
        <div className="data-details v2"><br/>
            <div className="details-header flex">
                <div className="mortgage-title">
                    <a target="_blank" href={url}>{address}</a><span
                        style={{display: 'inline'}}
                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{city}, {state} {zipCode}</span><br/><br/>
                    <span><strong>{bedNum}</strong> Beds</span>&nbsp;&nbsp;&nbsp;
                    <span><strong>{bathNum}</strong> Baths</span>&nbsp;&nbsp;&nbsp;
                    <span><strong>{squareFeet}</strong> sq.ft</span>&nbsp;&nbsp;&nbsp;
                    <span><strong>${dollarPerSquare}</strong>/sq.ft</span>&nbsp;&nbsp;&nbsp;
                    <span>Built <strong>{yearBuilt}</strong></span>
                </div>
                <div className="details-price" style={{color: '#6A6A6A'}}>
                    <NumberFormat value={price} displayType={'text'} thousandSeparator
                        prefix={'$'}
                    />
                </div>
            </div>
            <div className="details-body">
              {
                images.length > 1 &&
                <Slider delay={1000} dots>
                  {
                    images.map((img, index) => (
                      <div key={index}>
                          <img src={img} alt={"img"} onError={onError} />
                      </div>
                    ))
                  }
                </Slider>
              }
                <p>{details}</p>
                <iframe src={mapUrl} title="map" width="100%" height="500" frameBorder="0" styles="border:0"
                    allowFullScreen
                > </iframe>
            </div>

        </div>
    );
};

export default ProprtyDetails;
