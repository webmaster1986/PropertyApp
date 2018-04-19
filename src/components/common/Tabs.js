import React from 'react';
import NumberFormat from 'react-number-format';

const Tabs = ({ onBlur, onChange, state}) => {
    const { RentalIncome, ClosingCost, RehabBudget, CapExPercent, PropertyManageCostPercent, MiscOther, MiscIncome, RepairCost, RepairCostPercent, CalculationData, WaterCost, Garbage, Electric, Gas, HOAFees, VacancyPercent } = state;

    return (
        <div className="tabs-data">

            <div className="tab-data" id="tab-data-1">
                <table className="table table-small">
                    <tbody>
                        <tr>
                            <td>Rental Income <i>+</i></td>
                            <td>
                                <input className="" type="text" name="RentalIncome" placeholder="$1,000"
                                    onBlur={onBlur} onChange={onChange} value={`$${ RentalIncome}`}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Misc Income <i>+</i></td>
                            <td><input className="" type="text" name="MiscIncome" placeholder="$1,000"
                                onBlur={onBlur} onChange={onChange} value={`$${ MiscIncome}`}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><NumberFormat value={CalculationData.totalMonthlyIncome} displayType={'text'}
                                thousandSeparator prefix={'$'}
                                /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="tab-data" id="tab-data-2">
                <table className="table table-small table-striped">
                    <tbody>
                        <tr>
                            <td>Water/Sewer</td>
                            <td>
                                <input className="" type="text" name="WaterCost" placeholder="$1,000"
                                    onChange={onChange} value={`$${WaterCost}`}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Garbage</td>
                            <td>
                                <input className="" type="text" name="Garbage" placeholder="$1,000"
                                    onChange={onChange}
                                    onBlur={onBlur} value={`$${Garbage}`}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Electric</td>
                            <td>
                                <input className="" type="text" name="Electric" placeholder="$1,000"
                                    onBlur={onBlur} onChange={onChange} value={`$${ Electric}`}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Gas</td>

                            <td>
                                <input className="" type="text" name="Gas" placeholder="$1,000"
                                    onChange={onChange}
                                    onBlur={onBlur} value={`$${ Gas}`}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>HOA Fees</td>
                            <td><NumberFormat value={HOAFees} displayType={'text'} thousandSeparator
                                prefix={'$'}
                                /></td>
                        </tr>
                        <tr>
                            <td>Vacancy
                                <input className="" type="text" name="VacancyPercent" placeholder="$1,000"
                                onBlur={onBlur} onChange={onChange}
                                value={`${VacancyPercent}%`}
                            />
                            </td>
                            <td><NumberFormat value={CalculationData.VacancyCost}
                                displayType={'text'} thousandSeparator prefix={'$'}
                                /></td>
                        </tr>
                        <tr>
                            <td>Repairs
                                <input className="" type="text" name="RepairCostPercent" placeholder="1%"
                                onBlur={onBlur} onChange={onChange}
                                value={`${ RepairCostPercent}%`}
                            />
                            </td>
                            <td><
                                NumberFormat value={CalculationData.RepairCost}
                                displayType={'text'} thousandSeparator prefix={'$'}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>CapEx
                                <input
                                    className=""
                                    type="text"
                                    name="CapExPercent"
                                    placeholder="1%"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    value={`${ CapExPercent}%`}
                            />

                            </td>
                            <td><NumberFormat value={CalculationData.CapExCost}
                                displayType={'text'} thousandSeparator prefix={'$'}
                            /></td>
                        </tr>
                        <tr>
                            <td>Property Management
                                <input
                                    className=""
                                    type="text"
                                    name="PropertyManageCostPercent"
                                    placeholder="$1,000"
                                    onBlur={onBlur} onChange={onChange}
                                    value={`${ PropertyManageCostPercent}%`}
                            />
                            </td>
                            <td><NumberFormat value={CalculationData.PropManageCost}
                                displayType={'text'} thousandSeparator prefix={'$'}
                            /></td>
                        </tr>
                        <tr>
                            <td>Miscellaneous</td>
                            <td><input className="" type="text" name="MiscOther"
                                placeholder="$1,000"
                                onBlur={onBlur} onChange={onChange}
                                value={`$${ MiscOther}`}
                            /></td>
                        </tr>
                        <tr>
                            <td>Mortgage</td>
                            <td><NumberFormat value={CalculationData.mortgage}
                                displayType={'text'} thousandSeparator prefix={'$'}
                            /></td>
                        </tr>
                        <tr>
                            <td>Total Expencses</td>
                            <td className="red-color"><NumberFormat value={CalculationData.totalMonthlyExpense}
                                displayType={'text'} thousandSeparator prefix={'$'}
                            /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="tab-data" id="tab-data-3">
                <table className="table table-small table-striped">
                    <tbody>
                        <tr>
                            <td>Down Payment</td>
                            <td><NumberFormat value={CalculationData.downPayment}
                                displayType={'text'} thousandSeparator prefix={'$'}
                            /></td>
                        </tr>
                        <tr>
                            <td>Closing Costs</td>
                            <td>
                                <input className="" type="text" name="ClosingCost" placeholder="$1,000"
                                    onBlur={onBlur} onChange={onChange} value={`$${ ClosingCost}`}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Rebab Budget</td>
                            <td>
                                <input className="" type="text" name="RehabBudget" placeholder="$1,000"
                                    onBlur={onBlur} onChange={onChange} value={`$${RehabBudget}`}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Upfront Expenses</td>
                            <td>
                                <NumberFormat value={CalculationData.totalInvestment}
                                    displayType={'text'} thousandSeparator prefix={'$'}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tabs;
