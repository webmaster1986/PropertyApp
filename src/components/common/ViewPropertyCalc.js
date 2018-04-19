import React from 'react';
import NumberFormat from 'react-number-format';
import './view-property-calc.css';

const ViewPropertyCalc = ({ CalculationData, onChange, tableFilter }) => {
    const { totalAnnualIncome, totalAnnualExpense, totalAnnualCashFlow, totalInvestment, COC, netIncome, netExpense, netOperatingIncome, purchasePrice, capRate, grossRentMultiplier } = CalculationData;
    if (tableFilter === 'coc') {
        return (
            <div className="coc-return flex">
                <div className="coc-options">
                    <h6>Annual Income</h6>
                    <strong>
                        {totalAnnualIncome ? <NumberFormat value={parseInt(totalAnnualIncome, 10)} displayType={'text'} thousandSeparator
                        prefix={'$'}/> : '---'}
                    </strong>
                    <div className="month">&nbsp;</div>
                </div>
                <div className="coc-minus"/>
                <div className="coc-options">
                    <h6>Annual Expenses</h6>
                    <strong className="red-color">
                        {totalAnnualExpense ? <NumberFormat value={parseInt(totalAnnualExpense, 10)} displayType={'text'} thousandSeparator
                            prefix={'$'}/> : '-'}
                    </strong>
                    <div className="month">&nbsp;</div>
                </div>
                <div className="coc-equal"/>
                <div className="coc-options tableFilter">
                    <h6>Annual Cash Flow</h6>
                    <strong className={totalAnnualCashFlow > 0 ? 'green-color' : 'red-color'}>
                        {totalAnnualCashFlow ? <NumberFormat value={parseInt(totalAnnualCashFlow, 10)} displayType={'text'} thousandSeparator
                            prefix={'$'}/> : '-'}
                    </strong>
                    <hr/>
                    <strong>
                        {totalInvestment ? <NumberFormat value={parseInt(totalInvestment, 10)} displayType={'text'} thousandSeparator
                            prefix={'$'}/> : '-' }
                        <h6>Upfront Expenses</h6>
                    </strong>
                </div>
                <div className="coc-options tableFilter">
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
                    <div className="total-coc-percentage">{COC}%</div>
                </div>
            </div>
        );
    } else if (tableFilter === 'cap') {
        return (
            <div className="coc-return flex">
                <div className="coc-options">
                    <h6>Annual Income</h6>
                    <strong>
                        {netIncome ? <NumberFormat value={parseInt(netIncome, 10)} displayType={'text'} thousandSeparator
                            prefix={'$'}
                        /> : '-'}
                    </strong>
                    <div className="month">&nbsp;</div>
                </div>
                <div className="coc-minus"/>
                <div className="coc-options">
                    <h6>Annual Expenses</h6>
                    <strong className="red-color">
                        {netExpense ? <NumberFormat value={parseInt(netExpense, 10)} displayType={'text'} thousandSeparator
                            prefix={'$'}/> : '-'}
                    </strong>
                    <div className="month">&nbsp;</div>
                </div>
                <div className="coc-equal"/>
                <div className="coc-options tableFilter">
                    <h6>Net Operating Income</h6>
                    <strong>
                        {netOperatingIncome ? <NumberFormat value={parseInt(netOperatingIncome, 10)} displayType={'text'} thousandSeparator
                            prefix={'$'}/> : '-' }
                    </strong>
                    <hr/>
                    <strong>
                        {purchasePrice ? <NumberFormat value={parseInt(purchasePrice, 10)} displayType={'text'} thousandSeparator
                            prefix={'$'}/> : '-' }
                        <h6>Purchase Price</h6>
                    </strong>
                </div>
                <div className="coc-options tableFilter">
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
                    <div className="total-coc-percentage">{capRate}%</div>
                </div>
            </div>
        );
    } else if (tableFilter === 'gross') {
        return (
            <div className="coc-return flex">

                <div className="coc-minus devide hide"/>
                <div className="coc-options">
                    <strong className="red-color">
                    </strong>
                </div>
                <div className="coc-options tableFilter">
                </div>
                <div className="coc-options tableFilter">
                    <h6>Purchase Price</h6>
                    <strong>
                        {purchasePrice ? <NumberFormat value={parseInt(purchasePrice, 10)} displayType={'text'} thousandSeparator
                            prefix={'$'}
                        /> : '-'}
                    </strong>
                    <hr/>
                    <strong>
                        {netIncome ? <NumberFormat value={parseInt(netIncome, 10)} displayType={'text'} thousandSeparator
                            prefix={'$'}
                        /> : '-'}
                        <h6>Gross Annual Income</h6>
                    </strong>
                </div>
                <div className="coc-equal"/>
                <div className="coc-options tableFilter">
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
                    <div className="total-coc-percentage">{grossRentMultiplier}</div>
                </div>
            </div>
        );
    }

};

export default ViewPropertyCalc;
