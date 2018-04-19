import React from 'react';
import NumberFormat from 'react-number-format';
import defaultImage from '../../static/images/slider-imgs/default_slider.png';
import './property-details.scss';

const ProprtyDetails = ({ propertyObject, mapUrl }) => {
    const { propertyImages, url, address, details, city, state, zipCode, bedNum, bathNum, squareFeet, dollarPerSquare, yearBuilt, price } = propertyObject;
    const images = propertyImages || [defaultImage];

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
                    <div className="flex slider">
                        <div id="ninja-slider">
                            <div className="slider-inner">
                                <ul>
                                    {
                                        images.map((img, index) => (
                                            <li key={index}><a className="ns-img" href={img}></a></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div id="thumbnail-slider">
                            <div className="inner">
                                <ul>
                                    {
                                        images.map((img, index) => (
                                            <li key={index}><a className="thumb" href={img}></a></li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                }
                <p>{details}</p>
                <iframe src={mapUrl} width="100%" height="500" frameBorder="0" styles="border:0"
                    allowFullScreen
                > </iframe>
            </div>
        </div>
    );
};

export default ProprtyDetails;
