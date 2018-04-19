import React from 'react';
import Sticky from 'react-stickynode';
import ASC from '../../static/images/sort_asc.png';
import DESC from '../../static/images/sort_desc.png';
import './property-header.css';

const PropertyHeader = ({ state, viewProperty, Sort, onChange }) => {
    const { tableFilter, selectedProperty, propertiesByCity, sortProp, limit, sortAscDesc } = state;

    const dataPercent = (tableFilter === 'cap' && (selectedProperty.capRate || 0)) ||
      (tableFilter === 'coc' && (selectedProperty.coc || 0)) ||
      (tableFilter === 'gross' && (selectedProperty.grossRentMultiplier || 0));

    return (
        <Sticky top={0} activeClass="sticky-collection-header">
            <div className="house-model-result flex">
                <div className="location-half">
                    <a onClick={viewProperty} className="data-location">
                        <i className="fa fa-home"></i> {selectedProperty.address}
                        <span>{selectedProperty.city}, {selectedProperty.state} {selectedProperty.zipCode}</span>
                    </a>
                    <div className="data-img">
                        <img className="img-responsive"
                            src={selectedProperty.propertyImages && selectedProperty.propertyImages.length > 0 ? selectedProperty.propertyImages[0] : require('../../static/images/noimage.png')}
                            alt=""
                        />
                    </div>
                </div>
                <div className="cash-half">
                    <div className="data-title">
                        <select
                            data-jcf='{"wrapNative": false, "wrapNativeOnMobile": false, "fakeDropInBody": false, "useCustomScroll": true}'
                            onChange={onChange}
                            name="tableFilter"
                            value={tableFilter}
                        >
                            <option value="coc">Cash on Cash Return</option>
                            <option value="cap">Cap Rate</option>
                            <option value="gross">Gross Rent Multiplier</option>
                        </select>
                    </div>
                    <div className="data-percentage">
                        { `${ dataPercent ? dataPercent : '0' }${tableFilter !== 'gross' && '%' || ''}` }
                    </div>

                    {selectedProperty.details && selectedProperty.details.length > limit ?
                        (
                            <div>
                                {selectedProperty.details.substring(0, limit)}...
                            </div>
                        ) : <p>{selectedProperty.details}</p>
                    }
                    {selectedProperty.address &&
                        <a className="btn primary-btn-outline" onClick={viewProperty} >View Details
                            <i className="fa fa-long-arrow-right"></i>
                        </a>
                    }
                </div>
            </div>
            {
                propertiesByCity.length > 5 &&
                <table className="table table-striped table-hover fixed_header">
                    <thead>
                        <tr>
                            {
                                ['Address', 'Price', 'Units', 'Sq. Ft', '$/Sq. Ft', 'On the market', tableFilter === 'cap' ? 'Cap Rate' : (tableFilter === 'gross' && 'GRM') || (tableFilter === 'coc' && 'COC')].map((i) => (
                                    <th key={i} onClick={() => Sort(i)}>{i}{sortProp === i && (sortAscDesc ? <img src={ASC} /> : <img src={DESC} />) || ''}</th>
                                ))
                            }
                        </tr>
                    </thead>
                </table>
            }
        </Sticky>
    );
};

export default PropertyHeader;
