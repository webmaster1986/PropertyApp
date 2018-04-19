import React, {Component} from 'react';
import common from '../utils/common';
import SearchHeader from './common/SearchHeader';
import PropertyTable from './common/PropertyTable';
import PropertyHeader from './common/PropertyHeader';
import CONST from '../utils/CONST';
import '../static/scss/layout/searchPage.css';
import MapComponent from './MapComponent';

const cash = CONST.CASH;

const price = CONST.PRICE;

const Bed = CONST.BED;

const Bath = CONST.BATH;

const Units = CONST.UNITS;

function dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function(a, b) {
        const result = (common.FormatNumber(a[property]) < common.FormatNumber(b[property])) ? -1 : (common.FormatNumber(a[property]) > common.FormatNumber(b[property])) ? 1 : 0;
        return result * sortOrder;
    };
}

class Search extends Component {

    constructor(props) {
        super(props);

        let allCities = [];
        const selectedCity = localStorage.getItem('selectedCity');

        if (props.allCities && props.allCities.length > 0) {
            allCities = props.allCities;
        } else {
            allCities = [selectedCity || CONST.DEFAULTS.selectedCity];
        }

        const savedData = this.getFiltersByCity(selectedCity || CONST.DEFAULTS.selectedCity);

        this.state = {
            loginUser: {},
            city: selectedCity || CONST.DEFAULTS.selectedCity,
            tableFilter: 'cap',
            downCpy: CONST.DEFAULTS.downCpy,
            interestCpy: CONST.DEFAULTS.interestCpy,
            yearsCpy: CONST.DEFAULTS.yearsCpy,
            minCash: '',
            maxCash: '',
            minPrice: '',
            maxPrice: '',
            minUnits: '',
            maxUnits: '',
            minCOC: '',
            maxCOC: '',
            minGRM: '',
            maxGRM: '',
            cashCpy: '',
            priceCpy: '',
            bedCpy: '',
            bathCpy: '',
            propertyTypeCpy: '',
            propertiesByCity: '',
            loader: 'false',
            yearBuilt: '',
            addressForDisplay: '',
            propType: '',
            filterPtType: '',
            active: '',
            colorActive: '',
            limit: 350,
            selectedCity: selectedCity || CONST.DEFAULTS.selectedCity,
            allCities: allCities,
            selectedProperty: {},
            ...savedData,
        };
    }

    componentWillMount() {
        const loginUser = this.props.user;
        const allCities = this.props.allCities;
        let loader = true;
        if (!loginUser) {
            this.props.history.push({
                pathname: '/',
            });
            return;
        }
        if (!allCities || allCities.length === 0) {
            this.props.actions.getCities();
        }
        if (!this.props.selectedCity) {
            this.props.actions.setCity(this.state.selectedCity);
        }

        if (this.props.propertiesByCity[this.state.selectedCity]) {
            const data = this.props.propertiesByCity[this.state.selectedCity];
            loader = false;
            if (data && data.length > 0) {
                this.saveCOC(data);
            }
        } else {
            this.props.actions.getPropertyByCity(this.state.selectedCity);
        }

        this.setState({
            loader: loader,
            loginUser: loginUser,
            cashCpy: cash[9].value,
            priceCpy: price[9].value,
            bedCpy: Bed[8].value,
            bathCpy: Bath[8].value,
            propertyTypeCpy: 'TownHouse',
        });

    }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.allCities) {
            this.setState({
                allCities: nextProps.allCities,
            });
        }
        if (nextProps.propertiesByCity[this.state.selectedCity]) {
            const data = nextProps.propertiesByCity[this.state.selectedCity];
            this.setState({loader: false});
            this.saveCOC(data);
        }

    }

    clearFilters = (e) => {
        this.setState({
            minPrice: '',
            maxPrice: '',
            minUnits: '',
            maxUnits: '',
            minCash: '',
            maxCash: '',
            minCOC: '',
            maxCOC: '',
            minGRM: '',
            maxGRM: '',
        }, () => {
            this.saveYears(e);
        });
    }

    getFiltersByCity = (city) => {
        let cityFilters = localStorage.getItem('cityFilters');
        if (cityFilters && cityFilters !== 'undefined') {
            cityFilters = JSON.parse(cityFilters);
        } else {
            cityFilters = {};
        }

        return cityFilters[city] ? cityFilters[city] : {};
    }

    onSearchFilter = () => {
        const filters = {
            minCash: this.state.minCash,
            maxCash: this.state.maxCash,
            minPrice: this.state.minPrice,
            maxPrice: this.state.maxPrice,
            minUnits: this.state.minUnits,
            maxUnits: this.state.maxUnits,
            minCOC: this.state.minCOC,
            maxCOC: this.state.maxCOC,
            minGRM: this.state.minGRM,
            maxGRM: this.state.maxGRM,
        };
        this.setFilters(filters);

        let cityId = '';
        if (this.props.allCities) {
            const city = this.props.allCities.filter((x) => x.name === this.state.selectedCity);
            if (city.length > 0) {
                cityId = city[0].cityId;
            }
        }

        this.props.history.push({
            pathname: '/savedCityFilters',
            state: {cityId: cityId, cityName: this.state.selectedCity},
        });
    }

    tableData = (data, position) => {

        if (this.state.active === position) {
            this.setState({active: null});
        } else {
            this.setState({active: position});
        }
        this.setState({
            selectedProperty: data,
        });
    }

    viewProperty = () => {
        if (this.state.active === '') {
            localStorage.setItem('propertyObject', JSON.stringify(this.state.propertiesByCity[0]));
        } else {
            localStorage.setItem('propertyObject', JSON.stringify(this.state.selectedProperty));
        }
        this.props.history.push({
            pathname: `/viewProperty/${this.state.selectedProperty.propertyId}`,
        });
    }

    saveCOC = (obj) => {
        const arrayObj = obj;
        this.state.propertiesByCity = [];
        this.calculateCOC2(arrayObj);
    }

    save = (e) => {
        e.preventDefault();
        const { downCpy, interestCpy, yearsCpy } = this.state;
        const arrayObj = this.state.propertiesByCity;
        this.state.propertiesByCity = [];
        //$('#mortgage-options').hide();
        this.calculateCOC2(arrayObj);
        const cityFilters = {
            downCpy: common.FormatNumber(downCpy),
            interestCpy: common.FormatNumber(interestCpy),
            yearsCpy: common.FormatNumber(yearsCpy),
        };
        this.setFilters(cityFilters);

    }

    calculateCOC2 = (data) => {

        const downCpy = parseFloat(this.state.downCpy);
        const interestCpy = parseFloat(this.state.interestCpy);
        const yearsCpy = parseFloat(this.state.yearsCpy);
        const InsurancePercent = CONST.DEFAULTS.monthly_expense.Insurance;
        const MiscIncome = CONST.DEFAULTS.monthly_income.miscIncome;
        const WaterCost = CONST.DEFAULTS.monthly_expense.water;
        const Garbage = CONST.DEFAULTS.monthly_expense.Garbage;
        const Gas = CONST.DEFAULTS.monthly_expense.Gas;
        const Electric = CONST.DEFAULTS.monthly_expense.Electric;
        const VacancyPercent = CONST.DEFAULTS.monthly_expense.vacancy_percent;
        const RepairCostPercent = CONST.DEFAULTS.monthly_expense.RepairCostPercent;
        const CapExPercent = CONST.DEFAULTS.monthly_expense.capExPercent;
        const PropertyManageCostPercent = CONST.DEFAULTS.monthly_expense.PropertyManageCostPercent;
        const HOAFees = CONST.DEFAULTS.monthly_expense.HOAFees;
        const MiscOther = CONST.DEFAULTS.monthly_expense.MiscOther;
        const ClosingCost = CONST.DEFAULTS.monthly_expense.ClosingCost;
        const RehabBudget = CONST.DEFAULTS.monthly_expense.RehabBudget;

        for (let k = 0; k < data.length; k++) {

            let annualIncome = data[k].grossAnnualIncome;
            if (annualIncome === 'N/A' || annualIncome === '-' || annualIncome === null || annualIncome === undefined) {
                annualIncome = 0;
            }
            annualIncome = common.FormatNumber(annualIncome);
            let dollarPerSquare = '';
            if (data[k].price && data[k].squareFeet && common.FormatNumber(data[k].squareFeet) > 0 && common.FormatNumber(data[k].price) > 0) {
                dollarPerSquare = common.FormatNumber(data[k].price) / common.FormatNumber(data[k].squareFeet);
                dollarPerSquare = dollarPerSquare.toFixed(0);
            }

            const purchasePrice = common.FormatNumber(data[k].price);
            const RentalIncome = annualIncome / 12;
            const taxPercent = common.FormatNumber(data[k].countyTax);

            const cocData = common.calculateCOC({
                purchasePrice,
                downCpy,
                interestCpy,
                yearsCpy,
                taxPercent,
                InsurancePercent,
                RentalIncome,
                MiscIncome,
                WaterCost,
                Garbage,
                Gas,
                Electric,
                VacancyPercent,
                RepairCostPercent,
                CapExPercent,
                PropertyManageCostPercent,
                HOAFees,
                MiscOther,
                ClosingCost,
                RehabBudget,
            });

            const value = {
                income: RentalIncome.toFixed(2),
                downMortage: parseFloat(this.state.downCpy),
                interestMortage: parseFloat(this.state.interestCpy),
                yearsMortage: parseFloat(this.state.yearsCpy),
                propertyType: data[k].propertyType,
                url: data[k].url,
                address: data[k].address,
                city: data[k].city,
                state: data[k].state,
                zipCode: data[k].zipCode,
                price: data[k].price,
                bedNum: data[k].bedNum || 0,
                bathNum: data[k].bathNum || 0,
                numOfUnits: data[k].numOfUnits === 'N/A' ? '-' : data[k].numOfUnits,
                squareFeet: data[k].squareFeet,
                yearBuilt: data[k].yearBuilt,
                daysOnSite: data[k].daysOnSite,
                dollarPerSquare: dollarPerSquare,
                status: data[k].status,
                rents: data[k].rents,
                details: data[k].details,
                grossAnnualIncome: data[k].grossAnnualIncome,
                netOperatingIncome: data[k].netOperatingIncome,
                annualOperatingExpense: data[k].annualOperatingExpense,
                hoa: data[k].hoa,
                imageURL: data[k].imageURL,
                coc: cocData.COC,
                propertyImages: data[k].propertyImages,
                capRate: cocData.capRate,
                grossRentMultiplier: cocData.grossRentMultiplier,
                taxPercent: taxPercent,
                propertyId: data[k].propertyId,
            };

            if (value.capRate >= 0) {
                this.state.propertiesByCity.push(value);
            }

        }

        const {minCash, maxCash, maxPrice, minPrice, minUnits, maxUnits, sortProp, sortAscDesc} = this.state;

        if (sortProp && sortAscDesc && this.state.propertiesByCity.length) {

            this.state.propertiesByCity = this.SortMethod(sortProp, sortAscDesc === 'true', this.state.propertiesByCity);

        } else if (this.state.propertiesByCity && this.state.propertiesByCity.length) {

            this.state.propertiesByCity.sort(dynamicSort('daysOnSite'));

        }

        this.setState({
            propertyList: this.state.propertiesByCity,
            selectedProperty: this.state.propertiesByCity[0],
        }, () => {
            if (minCash || maxCash || maxPrice || minPrice || minUnits || maxUnits) {
                this.saveYears();
            }
        });
    }

    saveYears = (e) => {
        if (e) {
            e.preventDefault();
        }

        let { minCash, maxCash, maxPrice, minPrice, minUnits, maxUnits, minCOC, maxCOC, minGRM, maxGRM, propertyList } = this.state;
        if (!propertyList) {
            return;
        }

        if (minCash) {
            propertyList = propertyList.filter((x) => common.FormatNumber(x.capRate) >= parseInt(minCash, 10));
        }
        if (maxCash) {
            propertyList = propertyList.filter((x) => common.FormatNumber(x.capRate) <= parseInt(maxCash, 10));
        }
        if (minPrice) {
            propertyList = propertyList.filter((x) => common.FormatNumber(x.price) >= common.FormatNumber(minPrice));
        }
        if (maxPrice) {
            propertyList = propertyList.filter((x) => common.FormatNumber(x.price) <= common.FormatNumber(maxPrice));
        }
        if (minUnits) {
            propertyList = propertyList.filter((x) => common.FormatNumber(x.numOfUnits) >= common.FormatNumber(minUnits));
        }
        if (maxUnits) {
            propertyList = propertyList.filter((x) => common.FormatNumber(x.numOfUnits) <= common.FormatNumber(maxUnits));
        }
        if (minCOC) {
            propertyList = propertyList.filter((x) => common.FormatNumber(x.coc) >= common.FormatNumber(minCOC));
        }
        if (maxCOC) {
            propertyList = propertyList.filter((x) => common.FormatNumber(x.coc) <= common.FormatNumber(maxCOC));
        }
        if (minGRM) {
            debugger
            propertyList = propertyList.filter((x) => common.FormatNumber(x.grossRentMultiplier) >= common.FormatNumber(minGRM));
        }
        if (maxGRM) {
            propertyList = propertyList.filter((x) => common.FormatNumber(x.grossRentMultiplier) <= common.FormatNumber(maxGRM));
        }
        this.setState({propertiesByCity: propertyList});
        //$('#filter-content').hide();

        if (e) {
            const cityFilters = {
                minPrice,
                maxPrice,
                minUnits,
                maxUnits,
                minCash,
                maxCash,
                minCOC,
                maxCOC,
                minGRM,
                maxGRM,
            };
            this.setFilters(cityFilters);
        }
    }

    setFilters = (cityFilters) => {
        let localCityFilters = localStorage.getItem('cityFilters');
        if (localCityFilters && localCityFilters !== 'undefined') {
            localCityFilters = JSON.parse(localStorage.getItem('cityFilters'));
        }

        if (localCityFilters && localCityFilters !== 'undefined') {
            localCityFilters[this.state.selectedCity] = {
                ...localCityFilters[this.state.selectedCity],
                ...cityFilters,
            };
            localStorage.setItem('cityFilters', JSON.stringify(localCityFilters));
        } else {
            const city = {
                [this.state.selectedCity]: cityFilters,
            };
            localStorage.setItem('cityFilters', JSON.stringify(city));
        }
    };

    select = (e) => {
        const city = e.target.value;
        localStorage.setItem('selectedCity', city);

        let cityFilters = localStorage.getItem('cityFilters');
        if (cityFilters && cityFilters !== 'undefined') {
            cityFilters = JSON.parse(cityFilters);
        } else {
            cityFilters = {};
        }

        cityFilters = cityFilters[city] ? cityFilters[city] : {};

        const newState = {
            ...this.state,
            ...cityFilters,
        };

        this.setState({...newState, selectedCity: city, loader: true, sortAscDesc: true, sortProp: '' }, () => {
            this.props.actions.setCity(city);
            if (!this.props.propertiesByCity[city]) {
                this.props.actions.getPropertyByCity(city);
            } else {
                const data = this.props.propertiesByCity[city];
                this.setState({loader: false});
                if (data && data.length > 0) {
                    this.saveCOC(data);
                }
            }
        });
    }

    onChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value,
        });
    }

    Sort = (prop) => {
        let {propertiesByCity, sortProp, sortAscDesc} = this.state;

        if (sortProp === prop) {
            sortAscDesc = !sortAscDesc;
        } else {
            sortAscDesc = true;
        }

        localStorage.setItem('sortProp', prop);
        localStorage.setItem('sortAscDesc', sortAscDesc);

        const data = this.SortMethod(prop, sortAscDesc, propertiesByCity);

        this.setState({
            sortProp: prop,
            sortAscDesc,
            propertiesByCity: data,
        });


    }

    SortMethod = (prop, sortAscDesc, propertiesByCity) => {

        let property = '';
        if (prop === 'Address') {
            property = 'address';
        } else if (prop === 'Price') {
            property = 'price';
        } else if (prop === 'Units') {
            property = 'numOfUnits';
        } else if (prop === 'Sq. Ft') {
            property = 'squareFeet';
        } else if (prop === '$/Sq. Ft') {
            property = 'dollarPerSquare';
        } else if (prop === 'On the market') {
            property = 'daysOnSite';
        } else if (prop === 'Cap Rate') {
            property = 'capRate';
        } else if (prop === 'COC') {
            property = 'coc';
        } else if (prop === 'GRM') {
            property = 'grossRentMultiplier';
        }

        const emptyPropertiesByCity = propertiesByCity.filter((x) => !x[property]);
        const otherPropertiesByCity = propertiesByCity.filter((x) => x[property]);

        otherPropertiesByCity.sort(dynamicSort(sortAscDesc ? property : `-${property}`));
        return otherPropertiesByCity.concat(emptyPropertiesByCity);
    }

    render() {
        return (
            <div className="searchPage">
                <div className="wrapper">
                    <SearchHeader
                        onSelect={this.select}
                        state={this.state}
                        onChange={this.onChange}
                        clearFilters={this.clearFilters}
                        save={this.save}
                        saveYears={this.saveYears}
                        onSearchFilter={this.onSearchFilter}
                    />
                    {
                        !this.state.loader && <MapComponent
                            isMarkerShown
                            propertiesByCity={this.state.propertiesByCity}
                            tableData={this.tableData}
                        />
                    }
                    {this.state.loader ?
                        <div className="loading">
                            <img src={require('../static/images/loader.png')} alt="loading.." className="searchComp-loader"/>
                        </div> :
                        <div className="content">
                            <PropertyHeader
                                state={this.state}
                                viewProperty={this.viewProperty}
                                Sort={this.Sort}
                                onChange={this.onChange}
                            />

                            <PropertyTable
                                propertiesByCity={this.state.propertiesByCity}
                                tableData={this.tableData}
                                sortProp={this.state.sortProp}
                                sortAscDesc={this.state.sortAscDesc}
                                Sort={this.Sort}
                                active={this.state.active}
                                tableFilter={this.state.tableFilter}
                            />

                        </div>
                    }
                </div>

            </div>
        );
    }
}

export default Search;
