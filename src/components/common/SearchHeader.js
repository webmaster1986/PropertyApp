import React from 'react';
import CONST from '../../utils/CONST';
import './search-header.css';

const cash = CONST.CASH;

const price = CONST.PRICE;

const Bed = CONST.BED;

const COC = CONST.COC;

const GRM = CONST.GRM;

const SearchHeader = ({ onSelect, state, onChange, onSearchFilter, saveYears, save, clearFilters }) => {
    const { allCities, selectedCity, downCpy, interestCpy, yearsCpy, minCash, maxCash, minPrice, maxPrice, minUnits, maxUnits, minCOC, maxCOC, minGRM, maxGRM} = state;

    const filterText = (<p>
        {!minCash && !maxCash && !minUnits && !maxUnits && !minPrice && !maxPrice && !minCOC && !maxCOC && !minGRM && !maxGRM && 'No Filters'}
        {!minCash && !maxCash ? '' : ` Cap Rate: ${ minCash ? `${minCash}%` : '<' }${(minCash && maxCash && ' - ')}${ maxCash ? ` ${maxCash}%` : '+'}` }
        {!minPrice && !maxPrice ? '' : ` Price: ${ `${minPrice ? `$${minPrice}` : '<'}`}${(minPrice && maxPrice && ' - ')}${ ` ${maxPrice ? `$${maxPrice}` : '+'}` }`}
        {!minUnits && !maxUnits ? '' : ` Units: ${ minUnits || '<' }${(minUnits && maxUnits && ' - ')}${ maxUnits ? ` ${maxUnits}` : '+'}` }
        {!minCOC && !maxCOC ? '' : ` COC: ${ minCOC || '<' }${(minCOC && maxCOC && ' - ')}${ maxCOC ? ` ${maxCOC}` : '+'}` }
        {!minGRM && !maxGRM ? '' : ` GRM: ${ minGRM || '<' }${(minGRM && maxGRM && ' - ')}${ maxGRM ? ` ${maxGRM}` : '+'}` }
    </p>);

    return (
        <div className="options-filter flex">
            <div className="location">
                <strong>City</strong>
                <select
                    onChange={onSelect}
                    name="cityList"
                    value={selectedCity}
                >
                    {allCities.map((city, i) => (
                        <option key={i} value={city.name}>{city.name}</option>
                    ))}
                </select>
            </div>

            <div className="mortgage">
                <strong>Mortgage</strong>
                <p>
                    {`${downCpy}% down, ${interestCpy} interest @ ${yearsCpy} years`}</p>

                <div id="mortgage-options" className="mortgage-options">
                    <form>
                        <label className="default">Down</label>
                        <input className="small m-t-0" type="text" name="downCpy" placeholder="25" onChange={onChange} value={downCpy} />
                        <div className="placeholder-txt">%</div>
                        <label className="default">Interest Rate</label>
                        <input className="small m-t-0" type="text" name="interestCpy" placeholder="interest Rate" onChange={onChange} value={interestCpy} />
                        <div className="placeholder-txt-2">%</div>
                        <label className="default">Years</label>
                        <input className="small m-t-0" type="text" name="yearsCpy" placeholder="Amortization Years" onChange={onChange} value={yearsCpy} />
                        <input className="filter-save-btn" type="submit" value="Save" name="submit" onClick={save} />
                    </form>
                </div>
            </div>

            <div className="filters">
                <strong>Filters </strong>
                <span>(<a className="clear-btn" onClick={clearFilters}>Clear</a>)</span>
                { filterText }
                <div id="filter-content" className="filter-content">
                    <form>
                        <ul className="fileter-content-ul">
                            <li>
                                <label className="default">Cap Rate</label>
                                <div className="flex">
                                    <select
                                        onChange={onChange}
                                        value={minCash}
                                        name="minCash"
                                    >
                                        <option value="">no min</option>
                                        {cash.map((cashMin, i) => (
                                            <option key={i} value={cashMin.value}>{cashMin.value}%</option>
                                        ))}
                                    </select>
                                    <div>to</div>
                                    <select
                                        onChange={onChange}
                                        value={maxCash}
                                        name="maxCash"
                                    >
                                        <option value="">no max</option>
                                        {cash.map((cashMax, i) => (
                                            <option key={i} value={cashMax.value}>{cashMax.value}%</option>
                                        ))}
                                    </select>
                                </div>
                            </li>
                            <li>
                                <label className="default">Price</label>
                                <div className="flex">
                                    <select
                                        onChange={onChange}
                                        value={minPrice}
                                        name="minPrice"
                                    >
                                        <option value="">no min</option>
                                        {price.map((data, i) => (
                                            <option key={i} value={data.value}>{data.label}</option>
                                        ))}
                                    </select>
                                    <div>to</div>
                                    <select
                                        onChange={onChange}
                                        value={maxPrice}
                                        name="maxPrice"
                                    >
                                        <option value="">no max</option>
                                        {price.map((data, i) => (
                                            <option key={i} value={data.value}>{data.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </li>
                            <li className="half">
                                <label className="default">Units</label>
                                <div className="flex">
                                    <select
                                        onChange={onChange}
                                        value={minUnits}
                                        name="minUnits"
                                    >
                                        <option value="">no min</option>
                                        {Bed.map((data, i) => (
                                            <option key={i} value={data.value}>{data.value}</option>
                                        ))}
                                    </select>
                                    <div>to</div>
                                    <select
                                        onChange={onChange}
                                        value={maxUnits}
                                        name="maxUnits"
                                    >
                                        <option value="">no max</option>
                                        {Bed.map((data, i) => (
                                            <option key={i} value={data.value}>{data.value}</option>
                                        ))}
                                    </select>
                                </div>
                            </li>
                            <li className="half">
                                <label className="default">Cash on Cash Return</label>
                                <div className="flex">
                                    <select
                                        onChange={onChange}
                                        value={minCOC}
                                        name="minCOC"
                                    >
                                        <option value="">no min</option>
                                        {COC.map((cashMin, i) => (
                                            <option key={i} value={cashMin.value}>{cashMin.value}%</option>
                                        ))}
                                    </select>
                                    <div>to</div>
                                    <select
                                        onChange={onChange}
                                        value={maxCOC}
                                        name="maxCOC"
                                    >
                                        <option value="">no max</option>
                                        {COC.map((cashMax, i) => (
                                            <option key={i} value={cashMax.value}>{cashMax.value}%</option>
                                        ))}
                                    </select>
                                </div>
                            </li>
                            <li className="half">
                                <label className="default">Gross Rent Multiplier</label>
                                <div className="flex">
                                    <select
                                        onChange={onChange}
                                        value={minGRM}
                                        name="minGRM"
                                    >
                                        <option value="">no min</option>
                                        {GRM.map((cashMin, i) => (
                                            <option key={i} value={cashMin.value}>{cashMin.value}%</option>
                                        ))}
                                    </select>
                                    <div>to</div>
                                    <select
                                        onChange={onChange}
                                        value={maxGRM}
                                        name="maxGRM"
                                    >
                                        <option value="">no max</option>
                                        {GRM.map((cashMax, i) => (
                                            <option key={i} value={cashMax.value}>{cashMax.value}%</option>
                                        ))}
                                    </select>
                                </div>
                            </li>
                            <li>
                                <input onClick={saveYears} style={{ background: '#2FC865', color: 'white' }} type="submit" value="Update" name="submit" />
                                <input onClick={onSearchFilter} style={{ background: '#2FC865', color: 'white', float: 'right', margin: '10px' }} type="button" value="Set up Email Alert" name="Set up Email Alert" />
                            </li>
                        </ul>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default SearchHeader;
