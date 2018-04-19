import React from 'react';
import NumberFormat from 'react-number-format';

const Mortgage = ({ state, onChange, onBlur, cashOnCashSelected }) => {

    return (
        <div className={`mortgage-calculator flex ${state.editMode ? '' : 'hide'}`}>
            <h3>Mortgage <br/>Calculator</h3>
            <table className="table table-striped table-small">
                <tbody>
                    <tr>
                        <td>Purchase Price</td>
                        <td>
                            <input className="" type="text" name="purchasePrice" placeholder="$1,000"
                                onChange={onChange} onBlur={onBlur} value={`$${ state.purchasePrice}`}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>% Down Payment</td>
                        <td>
                            <input className="" type="text" name="downCpy" placeholder="30%" onChange={onChange}
                                onBlur={onBlur} value={`${state.downCpy}%`}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Total Down Payment</td>
                        <td><NumberFormat value={state.CalculationData.downPayment} displayType={'text'} thousandSeparator
                            prefix={'$'}
                        /></td>
                    </tr>
                    <tr>
                        <td>Interest Rate</td>
                        <td>
                            <input className="" type="text" name="interestCpy" placeholder="6%" onChange={onChange}
                                onBlur={onBlur} value={`${state.interestCpy}%`}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Amortization Years</td>
                        <td>
                            <input className="" type="text" name="yearsCpy" placeholder="30" onChange={onChange}
                                onBlur={onBlur} value={state.yearsCpy}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Monthly Payment</td>
                        <td className="red-color">
                            <NumberFormat value={state.CalculationData.monthlyPayment}
                                displayType={'text'} thousandSeparator prefix={'$'}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Estimated Taxes <input className="" type="text" name="taxPercent" placeholder="0.81%" disabled
                            onBlur={onBlur} onChange={onChange} value={`${state.taxPercent}%`}
                        /></td>
                        <td><NumberFormat value={state.CalculationData.monthlyTax} displayType={'text'} thousandSeparator
                            prefix={'$'}
                        /></td>
                    </tr>
                    <tr>
                        <td>Estimated Insurance <input className="" type="text" name="InsurancePercent" placeholder="0.81%"
                            onBlur={onBlur} onChange={onChange} value={`${state.InsurancePercent}%`}
                        /></td>
                        <td><NumberFormat value={state.CalculationData.monthlyInsurance} displayType={'text'} thousandSeparator
                            prefix={'$'}
                        /></td>
                    </tr>
                    <tr className="total">
                        <td>Total Mortgage Payment</td>
                        <td className="red-color"><NumberFormat value={state.CalculationData.mortgage} displayType={'text'}
                            thousandSeparator prefix={'$'}
                        /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Mortgage;
