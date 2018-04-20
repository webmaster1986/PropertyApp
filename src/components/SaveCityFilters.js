import React, {Component} from 'react';
import SearchFiltertabs from './common/SaveCItyFiltersTabs';
import CONST from '../utils/CONST';
import Service from '../utils/apiService';
import '../static/scss/layout/SaveCityFilters.css';

class SearchFilter extends Component {

    constructor(props) {
        super(props);
        let allCities = [];
        const selectedCity = this.props.location.state && this.props.location.state.cityId;
        const selectedCityName = this.props.location.state && this.props.location.state.cityName;

        if (props.allCities && props.allCities.length > 0) {
            allCities = props.allCities;
        } else {
            allCities = [selectedCity || CONST.DEFAULTS.selectedCity];
        }
        this.state = {
            filter: {
                priceMin: '',
                priceMax: '',
                minNoOfUnits: '',
                maxNoOfUnits: '',
                bathMin: '',
                bathMax: '',
                capMin: '',
                capMax: '',
                cocMin: '',
                cocMax: '',
                userID: '',
                propertyURL: '',
                waterSewer: '',
                garbage: '',
                electric: '',
                gas: '',
                vacancy: '',
                repairs: '',
                capex: '',
                propertyManagement: '',
                misc: '',
                downPayment: '',
                closingCost: '',
                rehabBudget: '',
                miscllaneous: '',
                interestRate: '',
                mortgageYears: '',
                rentalIncome: '',
                test: '',
            },
            selectedCity: selectedCity || '',
            selectedCityName: selectedCityName || '',
            allCities: allCities,
            loader: false,
            activeTab: 'tab-1',
        };

    }

    componentWillMount() {
        const allCities = this.props.allCities;
        if (!allCities || allCities.length === 0) {
            this.props.actions.getCities();
        }

        this.setFilters();
    }

    setFilters = () => {
        let filters = localStorage.getItem('cityFilters');
        if (filters && filters !== 'undefined') {
            filters = JSON.parse(filters);
        } else {
            filters = {};
        }

        const {selectedCity, selectedCityName, filter } = this.state;
        if (selectedCity) {
            this.onCitySelect(selectedCity);
            if (selectedCityName) {
                filters = filters[selectedCityName] ? filters[selectedCityName] : null;
                if (filters) {
                    filter.priceMin = filters.minPrice;
                    filter.priceMax = filters.maxPrice;
                    filter.minNoOfUnits = filters.minUnits;
                    filter.maxNoOfUnits = filters.maxUnits;
                    filter.capMin = filters.minCash;
                    filter.capMax = filters.maxCash;
                    this.setState({ filter });
                } else {
                    filter.priceMin = '';
                    filter.priceMax = '';
                    filter.minNoOfUnits = '';
                    filter.maxNoOfUnits = '';
                    filter.capMin = '';
                    filter.capMax = '';
                    this.setState({ filter });
                }
            }
        }
    }

    onChange = (e) => {
        this.setState({
            filter: {
                ...this.state.filter,
                [e.target.name]: e.target.value,
            },
        });
    }

    onSelect = (e) => {
        const city = e.target.value;
        let selectedCityName = this.props.allCities.filter((x) => x.cityId === city);
        selectedCityName = selectedCityName.length && selectedCityName[0].name || '';
        localStorage.setItem('selectedCity', selectedCityName);
        const filter = this.state.filter;
        this.setState({
            selectedCity: city,
            loader: true,
            success: false,
        });
        if (city === '') {
            Object.keys(filter).forEach((i) => {
                filter[i] = '';
            });
            this.setState({
                filter,
                loader: false,
            });
        } else {
            this.onCitySelect(city);
        }
    }

    onCitySelect = (city) => {
        const filter = this.state.filter;
        Service.getCityFilters(city, (res) => {
            Object.keys(filter).forEach((i) => {
                filter[i] = res.res.data[i] === 0 ? 0 : (res.res && res.res.data && res.res.data[i] || filter[i]);
            });
            this.setState({
                filter,
                loader: false,
            });
        });
    }

    onSaveFilter = () => {
        const data = this.state.filter;
        data.capMin = data.capMin ? parseInt(data.capMin, 10) : '';
        data.capMax = data.capMax ? parseInt(data.capMax, 10) : '';
        data.closingCost = data.closingCost ? parseFloat(data.closingCost) : '';
        Service.createOrUpdateCityFilters(this.state.selectedCity, data, (res) => {
            if (res.res) {
                this.setState({
                    success: true,
                });
            }
        });
    }

    onChangeTab = (event) => {
        this.setState({
            activeTab: event.target.id,
        })
    }

    render() {
        return (
            <div className="view-property save-city-search">
                <div className="wrapper">
                    <div className="city-list">
                        <select
                            style={{width: '100%'}}
                            onChange={this.onSelect}
                            value={this.state.selectedCity}
                        >
                            <option value="">Select city</option>
                            {this.props.allCities.map((city, i) => (
                                <option key={i} value={city.cityId}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    {this.state.loader &&
                    <div className="loading">
                        <img src={require('../static/images/loader.png')} alt="loading.."
                            className="searchComp-loader"
                        />
                    </div>
                    }
                    {!this.state.loader && <div className="content">
                        <p>Select filters below to get email alerts when new matching properties hit the market.</p>
                        <p>Make some estimates in the "expenses" tab to adjust how cap rate and cash on cash return is calculated</p>
                        <div className="edit-mode">
                            <div className="edit-tabs flex">
                                <ul className="tabs">
                                    <li id="tab-1" className={this.state.activeTab === 'tab-1' ? 'active' : ''} onClick={this.onChangeTab}>Filters</li>
                                    <li id="tab-2" className={this.state.activeTab === 'tab-2' ? 'active' : ''} onClick={this.onChangeTab}>Mortgage</li>
                                    <li id="tab-3" className={this.state.activeTab === 'tab-3' ? 'active' : ''} onClick={this.onChangeTab}>Expenses</li>
                                </ul>
                                <SearchFiltertabs
                                    onChange={this.onChange}
                                    state={this.state}
                                />
                            </div>
                        </div>
                        <div style={{textAlign: 'right'}}>
                            { this.state.success && <span className="success">City filters saved successfully!</span> }
                            <input onClick={this.onSaveFilter} style={{background: '#2FC865', color: 'white'}}
                                type="submit" value="Save" name="submit"
                            />
                        </div>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default SearchFilter;
