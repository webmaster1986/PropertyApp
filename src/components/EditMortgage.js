import React, { Component } from 'react';
import Footer from '../components/common/Footer';
import NumberFormat from 'react-number-format';
import ProfileHeader from '../components/common/ProfileHeader';
import image1 from '../static/images/slider-imgs/1.jpg';
import image2 from '../static/images/slider-imgs/2.jpg';
import image3 from '../static/images/slider-imgs/3.jpg';
import image4 from '../static/images/slider-imgs/4.jpg';
import image5 from '../static/images/slider-imgs/5.jpg';
import image6 from '../static/images/slider-imgs/6.jpg';
import image7 from '../static/images/slider-imgs/7.jpg';
import image8 from '../static/images/slider-imgs/8.jpg';

class EditMortgage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            propertyObject: '',
            loginUser: '',
            addressForMap: '',
            cityFormap: '',
            stateForMap: '',
            zipForMap: '',
            downCpy: '',
            interestCpy: '',
            yearsCpy: '',
        };
    }

    componentWillMount() {
        const loginUser = localStorage.getItem('loginUser');
        const propertyObject = JSON.parse(localStorage.getItem('propertyObject'));
        this.setState({
            loginUser: loginUser,
            addressForMap: propertyObject.address.split(' ').join('+'),
            cityFormap: propertyObject.city.split(' ').join('+'),
            stateForMap: propertyObject.state.split(' ').join('+'),
            zipForMap: propertyObject.zipCode.split(' ').join('+'),
        });
        this.setState({propertyObject: propertyObject});
        this.setState({downCpy: propertyObject.downMortage, interestCpy: propertyObject.interestMortage, yearsCpy: propertyObject.yearsMortage});
    }

    pmtFunction = (rate, nperiod, pv, fv, type) => {
        if (!fv) fv = 0;
        if (!type) type = 0;

        if (rate === 0) return -(pv + fv) / nperiod;

        const pvif = Math.pow(1 + rate, nperiod);
        let pmt = rate / (pvif - 1) * -(pv * pvif + fv);

        if (type === 1) {
            pmt /= (1 + rate);
        }

        return pmt;
    }

    save = (e) => {
        e.preventDefault();
        const arrayObj = this.state.propertyObject;
        this.state.propertyObject = '';
        this.calculateCOC(arrayObj);
    }

    calculateCOC = (data) => {
        const downMortage = parseFloat(this.state.downCpy);
        const interestMortage = parseFloat(this.state.interestCpy);
        const yearsMortage = parseFloat(this.state.yearsCpy);
        const purchasePrice = parseInt(data.price, 10);
        let downPayment = purchasePrice * downMortage / 100;
        const cal1 = interestMortage / 1200;
        const cal2 = yearsMortage * 12;
        const cal3 = purchasePrice - downPayment;
        let monthlyPayment = this.pmtFunction(cal1, cal2, cal3, 0, 0);
        downPayment = Math.abs(parseFloat(downPayment.toFixed(2)));
        monthlyPayment = Math.abs(parseFloat(monthlyPayment.toFixed(2)));
        const taxes = (purchasePrice * 0.81 / 100) / 12;
        const insurance = (purchasePrice * 1.09 / 100) / 12;
        const total = monthlyPayment - taxes - insurance;
        const closingCost = 0;
        const rehabBudget = 0;
        const miscOther = 0;
        const miscIncome = 0;
        const rentalIncome = 0;
        const monthlyExpense = 0;
        let annualCashFlow;
        const splitValue = data.grossAnnualIncome.split(',');
        splitValue[0] = splitValue[0].substr(1);
        annualCashFlow = `${splitValue[0]}${splitValue[1]}`;
        const totalInvestment = downPayment + closingCost + rehabBudget + miscOther;
        let cashValue = annualCashFlow / totalInvestment;
        cashValue = parseFloat(cashValue.toFixed(2));
        let cashOnCash = cashValue * 100;
        cashOnCash = cashOnCash.toFixed(2);
        const value = {
            income: rentalIncome,
            expenses: monthlyExpense,
            cashFlow: annualCashFlow,
            downMortage: parseFloat(this.state.downCpy),
            interestMortage: parseFloat(this.state.interestCpy),
            yearsMortage: parseFloat(this.state.yearsCpy),
            propertyType: data.propertyType,
            downPayment: downPayment,
            monthlyPayment: monthlyPayment,
            taxes: parseFloat(taxes.toFixed(2)),
            insurance: parseFloat(insurance.toFixed(2)),
            total: parseFloat(total.toFixed(2)),
            miscIncome: miscIncome,
            url: data.url,
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            price: data.price,
            bedNum: data.bedNum,
            bathNum: data.bathNum,
            squareFeet: data.squareFeet,
            yearBuilt: data.yearBuilt,
            daysOnSite: data.daysOnSite,
            dollarPerSquare: data.dollarPerSquare,
            status: data.status,
            rents: data.rents,
            details: data.details,
            grossAnnualIncome: data.grossAnnualIncome,
            netOperatingIncome: data.netOperatingIncome,
            annualOperatingExpense: data.annualOperatingExpense,
            hoa: data.hoa,
            numOfUnits: data.numOfUnits,
            imageURL: data.imageURL,
            coc: Math.abs(parseInt(cashOnCash, 10)),
        };
        this.setState({propertyObject: value});
    }

    updateDown = (e) => {
        this.setState({downCpy: e.target.value});
        const propertyObject = Object.assign({}, this.state.propertyObject);
        propertyObject.downMortage = e.target.value;
        this.setState({propertyObject});
    }

    updateInterest = (e) => {
        this.setState({interestCpy: e.target.value});
        const propertyObject = Object.assign({}, this.state.propertyObject);
        propertyObject.interestMortage = e.target.value;
        this.setState({propertyObject});
    }

    updateYears = (e) => {
        this.setState({yearsCpy: e.target.value});
        const propertyObject = Object.assign({}, this.state.propertyObject);
        propertyObject.yearsMortage = e.target.value;
        this.setState({propertyObject});
    }

    render() {
        const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d868.7749949322764!2d-98.49508986270675!3d29.42587416170619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c5f52c80b6859%3A0xb6f0b438895012dc!2s${this.state.addressForMap }%2C+${ this.state.cityFormap }%2C+${ this.state.stateForMap }+${ this.state.zipForMap }!5e0!3m2!1sen!2s!4v1508764482197`;
        return (
            <div>
                <div className="wrapper">
                    <div className="content no-margin">
                        <div>
                            <div className="">
                                <div className="">
                                    <div className="mortgage-title">Mortgage
                                        <input className="" type="text" name="" placeholder="25" onChange={this.updateDown} value={this.state.propertyObject.downMortage}/>
                                        <input className="" type="text" name="" placeholder="interest Rate" onChange={this.updateInterest} value={this.state.propertyObject.interestMortage} />
                                        <input className="" type="text" name="" placeholder="Amortization Years" onChange={this.updateYears} value={this.state.propertyObject.yearsMortage} />
                                    </div>
                                    <button className="primary-btn-outline icon-only" style={{float: 'right', paddingTop: '0px'}} onClick={this.save}>Save</button><br/><br/>
                                </div>
                                <div className="mortgage-table-allign">
                                    <div className="mortgage-table-allign-table">
                                        <div className="mortgage-table-allign-h">
                                            <h3 className="mort-header"> Mortgage Calculator</h3>
                                        </div>
                                        <div className="data-tables">
                                            <table className="table table-striped table-hover">
                                                <tbody>
                                                    <tr style={{lineHeight: 0.8}}>
                                                        <td>Purchase Price</td>
                                                        <td><NumberFormat value={this.state.propertyObject.price} displayType={'text'} thousandSeparator prefix={'$'} /></td>
                                                    </tr>
                                                    <tr style={{lineHeight: 0.5}}>
                                                        <td> % Down</td>
                                                        <td><NumberFormat value={this.state.propertyObject.downMortage} displayType={'text'} thousandSeparator suffix={'%'} /></td>
                                                    </tr>
                                                    <tr style={{lineHeight: 0.5}}>
                                                        <td>Down Payment</td>
                                                        <td><NumberFormat value={this.state.propertyObject.downPayment} displayType={'text'} thousandSeparator prefix={'$'} /></td>
                                                    </tr>
                                                    <tr style={{lineHeight: 0.5}}>
                                                        <td>Interest Rate</td>
                                                        <td><NumberFormat value={this.state.propertyObject.interestMortage} displayType={'text'} thousandSeparator suffix={'%'} /></td>
                                                    </tr>
                                                    <tr style={{lineHeight: 0.5}}>
                                                        <td>Amortization Years</td>
                                                        <td>{this.state.propertyObject.yearsMortage}</td>
                                                    </tr>
                                                    <tr style={{lineHeight: 0.5}}>
                                                        <td>Monthly Payment</td>
                                                        <td style={{color: 'red'}}><NumberFormat value={this.state.propertyObject.monthlyPayment} displayType={'text'} thousandSeparator prefix={'$'} /></td>
                                                    </tr>
                                                    <tr style={{lineHeight: 0.5}}>
                                                        <td>Taxes(0.89%)</td>
                                                        <td><NumberFormat value={this.state.propertyObject.taxes} displayType={'text'} thousandSeparator prefix={'$'} /></td>
                                                    </tr>
                                                    <tr style={{lineHeight: 0.5}}>
                                                        <td>Insurance(1.09%)</td>
                                                        <td><NumberFormat value={this.state.propertyObject.insurance} displayType={'text'} thousandSeparator prefix={'$'} /></td>
                                                    </tr>
                                                    <tr style={{lineHeight: 0.5}}>
                                                        <td>Total</td>
                                                        <td style={{color: 'red'}}><NumberFormat value={this.state.propertyObject.total} displayType={'text'} thousandSeparator prefix={'$'} /></td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br/>
                            <div className="coc-return v2 flex">
                                <div className="coc-options">
                                    <h6 style={{paddingBottom: '33px'}}>Cash Flow</h6>
                                    <span style={{fontSize: '43px', color: '#2FC865'}}><b><NumberFormat value={this.state.propertyObject.cashFlow} displayType={'text'} thousandSeparator prefix={'$'} /></b></span>
                                    <div className="month">/month</div>
                                </div>
                                <div className="coc-options">
                                    <h6>Cash on Cash Return</h6>
                                    <div className="total-coc-percentage"><NumberFormat value={this.state.propertyObject.coc} displayType={'text'} thousandSeparator suffix={'%'} /></div>
                                </div>
                            </div>
                            <div className="data-details v2"><br/>
                                <div className="details-header flex">
                                    <div className="mortgage-title">
                                        {this.state.propertyObject.address}<span style={{display: 'inline'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.propertyObject.city}, {this.state.propertyObject.state} {this.state.propertyObject.zipCode}</span><br/><br/>
                                        <span style={{display: 'inline', verticalAlign: '0px'}}><strong>{this.state.propertyObject.bedNum}</strong> Beds</span>&nbsp;&nbsp;&nbsp;
                                        <span style={{display: 'inline', verticalAlign: '0px'}}><strong>{this.state.propertyObject.bathNum}</strong> Baths</span>&nbsp;&nbsp;&nbsp;
                                        <span style={{display: 'inline', verticalAlign: '0px'}}><strong>{this.state.propertyObject.squareFeet}</strong> sq.ft</span>&nbsp;&nbsp;&nbsp;
                                        <span style={{display: 'inline', verticalAlign: '0px'}}><strong>${this.state.propertyObject.dollarPerSquare}</strong>/sq.ft</span>&nbsp;&nbsp;&nbsp;
                                        <span style={{display: 'inline', verticalAlign: '0px'}}>Build <strong>{this.state.propertyObject.yearBuilt}</strong></span>
                                    </div>
                                    <div className="details-price" style={{color: '#6A6A6A'}}>
                                        <NumberFormat value={this.state.propertyObject.price} displayType={'text'} thousandSeparator prefix={'$'} />
                                    </div>
                                </div>

                                <div className="details-body">


                                    <div className="flex slider">
                                        <div id="ninja-slider">
                                            <div className="slider-inner">
                                                <ul>
                                                    <li><a className="ns-img" href={image1}></a></li>
                                                    <li><a className="ns-img" href={image2}></a></li>
                                                    <li><a className="ns-img" href={image3}></a></li>
                                                    <li><a className="ns-img" href={image4}></a></li>
                                                    <li><a className="ns-img" href={image5}></a></li>
                                                    <li><a className="ns-img" href={image6}></a></li>
                                                    <li><a className="ns-img" href={image7}></a></li>
                                                    <li><a className="ns-img" href={image8}></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div id="thumbnail-slider">
                                            <div className="inner">
                                                <ul>
                                                    <li>
                                                        <a className="thumb" href={image1}></a>
                                                    </li>
                                                    <li>
                                                        <a className="thumb" href={image2}></a>
                                                    </li>
                                                    <li>
                                                        <a className="thumb" href={image3}></a>
                                                    </li>
                                                    <li>
                                                        <a className="thumb" href={image4}></a>
                                                    </li>
                                                    <li>
                                                        <a className="thumb" href={image5}></a>
                                                    </li>
                                                    <li>
                                                        <a className="thumb" href={image6}></a>
                                                    </li>
                                                    <li>
                                                        <a className="thumb" href={image7}></a>
                                                    </li>
                                                    <li>
                                                        <a className="thumb" href={image8}></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <p>{this.state.propertyObject.details}</p>

                                    <iframe src={mapUrl} width="100%" height="350" frameBorder="0" styles="border:0" allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditMortgage;
