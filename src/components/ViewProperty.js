import React, {Component} from 'react';
import PropertyDetails from '../components/common/PropertyDetails';
import CONST from '../utils/CONST';
import common from '../utils/common';
import Tabs from './common/Tabs';
import Mortgage from './common/Mortgage';
import ViewPropertyCalc from './common/ViewPropertyCalc';
import apiService from '../utils/apiService';
import DoSlider from '../static/vendor/thumbnailSlider/thumbnail-slider.js';
import * as jcf from '../static/vendor/jcf/js/jcf.js';
import '../static/scss/layout/viewProperty.scss';

class ViewProperty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            tableFilter: 'cap',
            propertyObject: {},
            loginUser: '',
            addressForMap: '',
            cityFormap: '',
            stateForMap: '',
            zipForMap: '',
            downCpy: CONST.DEFAULTS.downCpy,
            interestCpy: CONST.DEFAULTS.interestCpy,
            yearsCpy: CONST.DEFAULTS.yearsCpy,
            purchasePrice: 0,
            taxPercent: 0,
            InsurancePercent: CONST.DEFAULTS.monthly_expense.Insurance,
            WaterCost: CONST.DEFAULTS.monthly_expense.water,
            Garbage: CONST.DEFAULTS.monthly_expense.Garbage,
            Electric: CONST.DEFAULTS.monthly_expense.Electric,
            Gas: CONST.DEFAULTS.monthly_expense.Gas,
            HOAFees: CONST.DEFAULTS.monthly_expense.HOAFees,
            VacancyPercent: CONST.DEFAULTS.monthly_expense.vacancy_percent,
            RepairCostPercent: CONST.DEFAULTS.monthly_expense.RepairCostPercent,
            CapExPercent: CONST.DEFAULTS.monthly_expense.capExPercent,
            PropertyManageCostPercent: CONST.DEFAULTS.monthly_expense.PropertyManageCostPercent,
            MiscOther: CONST.DEFAULTS.monthly_expense.MiscOther,
            ClosingCost: CONST.DEFAULTS.monthly_expense.ClosingCost,
            RehabBudget: CONST.DEFAULTS.monthly_expense.RehabBudget,
            RentalIncome: 0,
            MiscIncome: CONST.DEFAULTS.monthly_income.miscIncome,
            CalculationData: {
                downPayment: 0,
                monthlyPayment: 0,
                monthlyTax: 0,
                monthlyInsurance: 0,
                mortgage: 0,
                totalMonthlyIncome: 0,
                totalMonthlyExpense: 0,
                VacancyCost: 0,
                RepairCost: 0,
                CapExCost: 0,
                PropManageCost: 0,
                totalInvestment: 0,
                totalMonthlyCashFlow: 0,
                totalAnnualCashFlow: 0,
                BasicCOC: 0,
                COC: 0,
                capRate: 0,
                basicCapRate: 0,
                grossRentMultiplier: 0,
            },
        };
    }

    componentDidMount() {
        window.scrollTo(0,0);
        jcf.replaceAll();
        DoSlider();
    }

    componentWillMount() {
        const loginUser = this.props.user;
        let propertyObject = localStorage.getItem('propertyObject');
        const propertyId = this.props.match.params.propertyId;
        if (!loginUser) {
            this.props.history.push({
                pathname: '/',
            });
            return;
        }

        if (propertyObject && propertyObject !== 'undefined') {
            propertyObject = JSON.parse(propertyObject);
            propertyObject = propertyObject.propertyId !== propertyId ? null : propertyObject;
        }

        if (propertyObject && propertyObject !== 'undefined') {
            const purchasePrice = common.FormatNumber(propertyObject.price);
            const RentalIncome = common.FormatNumber(propertyObject.income);
            const downCpy = common.FormatNumber(propertyObject.downMortage);
            const interestCpy = common.FormatNumber(propertyObject.interestMortage);
            const yearsCpy = common.FormatNumber(propertyObject.yearsMortage);
            this.getPropertyFilters(propertyObject.propertyId, {
                downCpy: downCpy.toFixed(0),
                interestCpy: interestCpy.toFixed(2),
                yearsCpy: parseInt(yearsCpy, 10),
                purchasePrice: purchasePrice.toFixed(0),
                RentalIncome: RentalIncome.toFixed(2),
            });
            this.setState({
                loginUser: loginUser,
                addressForMap: propertyObject.address.split(' ').join('+'),
                cityFormap: propertyObject.city.split(' ').join('+'),
                stateForMap: propertyObject.state.split(' ').join('+'),
                zipForMap: propertyObject.zipCode.split(' ').join('+'),
                propertyImages: propertyObject.propertyImages,
                taxPercent: propertyObject.taxPercent,
                propertyObject: propertyObject,
            });
        } else {
            this.getPropertyFilters(propertyId, {});
            apiService.getPropertyById(propertyId, (res) => {
                if (res.res && res.res.data) {
                    const propertyObject = {...res.res.data};
                    let annualIncome = propertyObject.grossAnnualIncome;
                    if (annualIncome === 'N/A' || annualIncome === '-' || annualIncome === null || annualIncome === undefined) {
                        annualIncome = 0;
                    }
                    annualIncome = common.FormatNumber(annualIncome);
                    let dollarPerSquare = '';
                    if (propertyObject.price && propertyObject.squareFeet && common.FormatNumber(propertyObject.squareFeet) > 0 && common.FormatNumber(propertyObject.price) > 0) {
                        dollarPerSquare = common.FormatNumber(propertyObject.price) / common.FormatNumber(propertyObject.squareFeet);
                        dollarPerSquare = dollarPerSquare.toFixed(0);
                    }

                    const purchasePrice = common.FormatNumber(propertyObject.price);
                    const RentalIncome = annualIncome / 12;
                    const taxPercent = common.FormatNumber(propertyObject.countyTax);
                    this.setState({
                        propertyObject,
                        addressForMap: propertyObject.address.split(' ').join('+'),
                        cityFormap: propertyObject.city.split(' ').join('+'),
                        stateForMap: propertyObject.state.split(' ').join('+'),
                        zipForMap: propertyObject.zipCode.split(' ').join('+'),
                        propertyImages: propertyObject.propertyImages,
                        purchasePrice,
                        RentalIncome,
                        taxPercent,
                        dollarPerSquare,
                    }, () => {
                        this.onBlur();
                    });
                }
            });
        }

    }

    getPropertyFilters = (propertyId, stateObj) => {
        apiService.getProperties(propertyId, (res) => {
            const newState = stateObj;
            if (res && res.res && res.res.data) {
                const { capex, closingCost, downPayment, electric, garbage, gas, insurance,
                    interestRate, miscllaneous, mortgageYears, propertyManagement, purchasePrice,
                    rehabBudget, repairs, taxes, vacancy, waterSewer, rentalIncome } = res.res.data;
                if (purchasePrice) {
                    newState.purchasePrice = purchasePrice;
                }
                if (downPayment) {
                    newState.downCpy = downPayment;
                }
                if (interestRate) {
                    newState.interestCpy = interestRate;
                }
                if (mortgageYears) {
                    newState.yearsCpy = mortgageYears;
                }
                if (taxes) {
                    newState.taxPercent = taxes;
                }
                if (insurance) {
                    newState.InsurancePercent = insurance;
                }
                if (waterSewer) {
                    newState.WaterCost = waterSewer;
                }
                if (garbage) {
                    newState.Garbage = garbage;
                }
                if (electric) {
                    newState.Electric = electric;
                }
                if (gas) {
                    newState.Gas = gas;
                }
                if (vacancy) {
                    newState.VacancyPercent = vacancy;
                }
                if (repairs) {
                    newState.RepairCostPercent = repairs;
                }
                if (capex) {
                    newState.CapExPercent = capex;
                }
                if (propertyManagement) {
                    newState.PropertyManageCostPercent = propertyManagement;
                }
                if (miscllaneous) {
                    newState.MiscOther = miscllaneous;
                }
                if (closingCost) {
                    newState.ClosingCost = closingCost;
                }
                if (rehabBudget) {
                    newState.RehabBudget = rehabBudget;
                }
                if (rentalIncome) {
                    newState.RentalIncome = rentalIncome;
                }
            }
            this.setState({
                ...newState,
            }, () => {
                this.onBlur();
            });
        });
    }

    componentDidUpdate(prevState) {
        if (!prevState.propertyImages && this.state.propertyImages) {
            DoSlider();
        }
    }

    save = () => {
        const {ClosingCost, RehabBudget, propertyObject, WaterCost, Garbage, Electric, Gas, MiscOther,
            interestCpy, downCpy, yearsCpy, VacancyPercent, RepairCostPercent, CapExPercent, PropertyManageCostPercent, purchasePrice,
            taxPercent, InsurancePercent } = this.state;

        const c = (number) => common.FormatNumber(number);

        const data = {
            capex: c(CapExPercent),
            closingCost: c(ClosingCost),
            downPayment: c(downCpy),
            electric: c(Electric),
            garbage: c(Garbage),
            gas: c(Gas),
            insurance: c(InsurancePercent),
            interestRate: c(interestCpy),
            miscllaneous: c(MiscOther),
            mortgageYears: c(yearsCpy),
            propertyManagement: c(PropertyManageCostPercent),
            purchasePrice: c(purchasePrice),
            rehabBudget: c(RehabBudget),
            repairs: c(RepairCostPercent),
            taxes: c(taxPercent),
            vacancy: c(VacancyPercent),
            waterSewer: c(WaterCost),
        };

        apiService.createOrUpdateProperty(propertyObject.propertyId, data, () => {
            this.setState({
                editMode: false,
            });
        });

    }

    onChange = (e) => {
        const value = e.target.value.replace(/\$/g, '').replace(/%/g, '');
        this.setState({
            [e.target.name]: value,
        });
    }

    onBlur = () => {
        const {purchasePrice, downCpy, interestCpy, yearsCpy, taxPercent, InsurancePercent, RentalIncome, MiscIncome, WaterCost,
            Garbage, Gas, Electric, VacancyPercent, RepairCostPercent, CapExPercent, PropertyManageCostPercent, HOAFees, MiscOther,
            ClosingCost, RehabBudget,
        } = this.state;

        const cocData = common.calculateCOC({purchasePrice, downCpy, interestCpy, yearsCpy, taxPercent, InsurancePercent, RentalIncome, MiscIncome, WaterCost,
            Garbage, Gas, Electric, VacancyPercent, RepairCostPercent, CapExPercent, PropertyManageCostPercent, HOAFees, MiscOther,
            ClosingCost, RehabBudget,
        });


        this.setState({
            CalculationData: {
                ...this.state.CalculationData,
                ...cocData,
            },
        });

    }

    onEdit = () => {
        this.setState({editMode: true});
        this.onBlur();

    }

    render() {
        const { downCpy, interestCpy, yearsCpy, addressForMap, cityFormap, zipForMap, stateForMap, editMode, CalculationData, propertyObject, tableFilter } = this.state;
        //const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d868.7749949322764!2d-98.49508986270675!3d29.42587416170619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c5f52c80b6859%3A0xb6f0b438895012dc!2s${addressForMap }%2C+${ cityFormap }%2C+${ stateForMap }+${ zipForMap }!5e0!3m2!1sen!2s!4v1508764482197&zoom=15`;
        const mapUrl = `https://www.google.com/maps/embed/v1/place?zoom=11&q=${ addressForMap || '' }, ${ cityFormap || '' },${ stateForMap || '' },${ zipForMap || '' }&key=AIzaSyByeGt-b4I_9fGy2kd3ubDM4zKgC2ZAOoE`;
        return (
            <div className="view-property">
                <div className="wrapper">
                    <div className="content">
                        <div>
                            <div className="edit-mode">
                                <div className="edit-header flex">
                                    <div className="mortgage-title">Mortgage
                                        <span>{`${downCpy}% down, ${interestCpy}% interest over ${yearsCpy} years`}</span>
                                    </div>
                                    {
                                        this.state.editMode ?
                                            <a className="primary-btn" onClick={this.save}>Save</a> :
                                            <a className="primary-btn" onClick={this.onEdit}>Edit</a>
                                    }
                                </div>

                                <Mortgage
                                    state={this.state}
                                    onChange={this.onChange}
                                    onBlur={this.onBlur}
                                />

                                <ViewPropertyCalc
                                    CalculationData={CalculationData}
                                    tableFilter={tableFilter}
                                    onChange={this.onChange}
                                />

                                <div className={`edit-tabs flex ${editMode ? '' : 'hide'}`}>
                                    <ul className="tabs">
                                        <li id="tab-1" className="active">Income</li>
                                        <li id="tab-2" className={tableFilter === 'gross' ? 'hide' : ''}>Expenses</li>
                                        <li id="tab-3" className={tableFilter !== 'coc' ? 'hide' : ''}>Upfront Expenses</li>
                                    </ul>
                                    <Tabs
                                        state={this.state}
                                        onChange={this.onChange}
                                        onBlur={this.onBlur}
                                    />
                                </div>
                            </div>
                            <br/>
                            { propertyObject ? <PropertyDetails propertyObject={propertyObject} mapUrl={mapUrl}/> : null }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewProperty;
