import React from 'react';
import CONST from '../../utils/CONST';

const cash = CONST.CASH;

const coc = CONST.COC;

const price = CONST.PRICE;

const Units = CONST.UNITS;

const Bath = CONST.BATH;

const SearchFiltertabs = (props) => {

    const {capMin, capMax, cocMin, cocMax, bathMax, minNoOfUnits, maxNoOfUnits, bathMin, priceMin, priceMax, interestRate, mortgageYears, downPayment,
        waterSewer, garbage, electric, gas, vacancy, repairs, capex, propertyManagement } = props.state.filter;

    return (
        <div className="tabs-data">
            <div className="tab-data" id="tab-data-1">

                <table className="table table-striped table-hover" style={{display: 'block'}}>
                    <tbody>
                        <tr style={{lineHeight: 0.8}}>
                            <td>Cap Rate</td>
                            <td>
                                <select
                                    style={{width: '100%'}}
                                    onChange={props.onChange}
                                    value={capMin}
                                    name="capMin"
                                    data-jcf='{"wrapNative": false, "wrapNativeOnMobile": false, "fakeDropInBody": false, "useCustomScroll": true}'
                                >
                                    <option value="">no min</option>
                                    {cash.map((cashMin, i) => (
                                        <option key={i} value={cashMin.value}>{cashMin.value}%</option>
                                    ))}
                                </select>
                            </td>
                            <td>To</td>
                            <td>
                                <select
                                    style={{width: '100%'}}
                                    onChange={props.onChange}
                                    value={capMax}
                                    name="capMax"
                                    data-jcf='{"wrapNative": false, "wrapNativeOnMobile": false, "fakeDropInBody": false, "useCustomScroll": true}'
                                >
                                    <option value="">no max</option>
                                    {cash.map((cashMax, i) => (
                                        <option key={i} value={cashMax.value}>{cashMax.value}%</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr style={{lineHeight: 0.8}}>
                            <td>Cash on Cash Return</td>
                            <td>
                                <select
                                    style={{width: '100%'}}
                                    onChange={props.onChange}
                                    value={cocMin}
                                    name="cocMin"
                                    data-jcf='{"wrapNative": false, "wrapNativeOnMobile": false, "fakeDropInBody": false, "useCustomScroll": true}'
                                >
                                    <option value="">no min</option>
                                    {coc.map((cocMin, i) => (
                                        <option key={i} value={cocMin.value}>{cocMin.value}%</option>
                                    ))}
                                </select>
                            </td>
                            <td>To</td>
                            <td>
                                <select
                                    style={{width: '100%'}}
                                    onChange={props.onChange}
                                    value={cocMax}
                                    name="cocMax"
                                    data-jcf='{"wrapNative": false, "wrapNativeOnMobile": false, "fakeDropInBody": false, "useCustomScroll": true}'
                                >
                                    <option value="">no max</option>
                                    {coc.map((cocMax, i) => (
                                        <option key={i} value={cocMax.value}>{cocMax.value}%</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr style={{lineHeight: 0.8}}>
                            <td>Price</td>
                            <td>
                                <select
                                    style={{width: '100%'}}
                                    onChange={props.onChange}
                                    value={priceMin}
                                    name="priceMin"
                                    data-jcf='{"wrapNative": false, "wrapNativeOnMobile": false, "fakeDropInBody": false, "useCustomScroll": true}'
                                >
                                    <option value="">no min</option>
                                    {price.map((data, i) => (
                                        <option key={i} value={data.value}>{data.label}</option>
                                    ))}
                                </select>
                            </td>
                            <td>To</td>
                            <td>
                                <select
                                    style={{width: '100%'}}
                                    onChange={props.onChange}
                                    value={priceMax}
                                    name="priceMax"
                                    data-jcf='{"wrapNative": false, "wrapNativeOnMobile": false, "fakeDropInBody": false, "useCustomScroll": true}'
                                >
                                    <option value="">no max</option>
                                    {price.map((data, i) => (
                                        <option key={i} value={data.value}>{data.label}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr style={{lineHeight: 0.8}}>
                            <td>Units</td>
                            <td>
                                <select
                                    style={{width: '100%'}}
                                    onChange={props.onChange}
                                    value={minNoOfUnits}
                                    name="minNoOfUnits"
                                    data-jcf='{"wrapNative": false, "wrapNativeOnMobile": false, "fakeDropInBody": false, "useCustomScroll": true}'
                                >
                                    <option value="">no min</option>
                                    {Units.map((data, i) => (
                                        <option key={i} value={data.value}>{data.value}</option>
                                    ))}
                                </select>
                            </td>
                            <td>To</td>
                            <td>
                                <select
                                    style={{width: '100%'}}
                                    onChange={props.onChange}
                                    value={maxNoOfUnits}
                                    name="maxNoOfUnits"
                                    data-jcf='{"wrapNative": false, "wrapNativeOnMobile": false, "fakeDropInBody": false, "useCustomScroll": true}'
                                >
                                    <option value="">no max</option>
                                    {Units.map((data, i) => (
                                        <option key={i} value={data.value}>{data.value}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr style={{lineHeight: 0.8}}>
                            <td>Baths</td>
                            <td>
                                <select
                                    style={{width: '100%'}}
                                    onChange={props.onChange}
                                    value={bathMin}
                                    name="bathMin"
                                    data-jcf='{"wrapNative": false, "wrapNativeOnMobile": false, "fakeDropInBody": false, "useCustomScroll": true}'
                                >
                                    <option value="">no min</option>
                                    {Bath.map((data, i) => (
                                        <option key={i} value={data.value}>{data.value}</option>
                                    ))}
                                </select>
                            </td>
                            <td>To</td>
                            <td>
                                <select
                                    style={{width: '100%'}}
                                    onChange={props.onChange}
                                    value={bathMax}
                                    name="bathMax"
                                    data-jcf='{"wrapNative": false, "wrapNativeOnMobile": false, "fakeDropInBody": false, "useCustomScroll": true}'
                                >
                                    <option value="">no max</option>
                                    {Bath.map((data, i) => (
                                        <option key={i} value={data.value}>{data.value}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="tab-data" id="tab-data-2">
                <table className="table table-striped table-hover">
                    <tbody>
                        <tr style={{lineHeight: 0.8}}>
                            <td>Interest Rate</td>
                            <td><input className="" type="text" name="interestRate" value={interestRate} onChange={props.onChange} /></td>
                        </tr>
                        <tr style={{lineHeight: 0.8}}>
                            <td>Amortization</td>
                            <td><input className="" type="text" name="mortgageYears" value={mortgageYears} onChange={props.onChange} /></td>
                        </tr>
                        <tr style={{lineHeight: 0.8}}>
                            <td>Down Payment</td>
                            <td> <input className="" type="text" name="downPayment" value={downPayment} onChange={props.onChange} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="tab-data" id="tab-data-3">
                <table className="table table-small table-striped">
                    <tbody>
                        <tr>
                            <td>Water/Sewer</td>
                            <td>
                                <input type="text" name="waterSewer" value={waterSewer} onChange={props.onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Garbage</td>
                            <td>
                                <input type="text" name="garbage" value={garbage} onChange={props.onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Electric</td>
                            <td>
                                <input type="text" name="electric" value={electric} onChange={props.onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Gas</td>
                            <td>
                                <input type="text" name="gas" value={gas} onChange={props.onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Vacancy</td>
                            <td>
                                <input type="text" name="vacancy" value={vacancy} onChange={props.onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Repairs</td>
                            <td>
                                <input type="text" name="repairs" value={repairs} onChange={props.onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>CapEx</td>
                            <td>
                                <input type="text" name="capex" value={capex} onChange={props.onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Property Management</td>
                            <td>
                                <input type="text" name="propertyManagement" value={propertyManagement} onChange={props.onChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SearchFiltertabs;
