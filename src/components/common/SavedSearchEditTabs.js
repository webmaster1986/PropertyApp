import React from 'react';

const SavedSearchEditTabs = (props) => {
    const cities = props.state.cities;
    return (
        <div className="tabs-data">

            <div className="tab-data" id="tab-data-1">
                {
                    cities.map((city, i) => (
                        <div className="city-list">
                            <p className="city-name">{city}</p>
                            {props.editableIndex === i ? <button className="saveBtn" onClick={props.onSave}> Save</button> : <span onClick={() => props.editInfo(i)}> <i className="fa fa-pencil"></i> </span>}
                            {props.editableIndex === i &&
                            <div className="">
                                <div className="mortgage">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <th colSpan="2" style={{paddingLeft: '10px'}}>Mortgage</th>
                                        </thead>
                                        <tbody>
                                            <tr style={{lineHeight: 0.8}}>
                                                <td>Interest Rate</td>
                                                <td><input className="" type="text" name="" placeholder="" /></td>
                                            </tr>
                                            <tr style={{lineHeight: 0.8}}>
                                                <td>Amortization</td>
                                                <td><input className="" type="text" name="" placeholder="" /></td>
                                            </tr>
                                            <tr style={{lineHeight: 0.8}}>
                                                <td>Down Payment</td>
                                                <td> <input className="" type="text" name="" placeholder="" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="expenses">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <th colSpan="2" style={{paddingLeft: '10px'}}>Expenses</th>
                                        </thead>
                                        <tbody>
                                            <tr style={{lineHeight: 0.8}}>
                                                <td>HOA</td>
                                                <td><input className="" type="text" name="" placeholder="" /></td>
                                            </tr>
                                            <tr style={{lineHeight: 0.8}}>
                                                <td>Garbabe</td>
                                                <td><input className="" type="text" name="" placeholder="" /></td>
                                            </tr>
                                            <tr style={{lineHeight: 0.8}}>
                                                <td>Capital expenditures</td>
                                                <td> <input className="" type="text" name="" placeholder="" /></td>
                                            </tr>
                                            <tr style={{lineHeight: 0.8}}>
                                                <td>Property management</td>
                                                <td> <input className="" type="text" name="" placeholder="" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="initial-investment">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <th colSpan="2" style={{paddingLeft: '10px'}}>Initial Investment</th>
                                        </thead>
                                        <tbody>
                                            <tr style={{lineHeight: 0.8}}>
                                                <td>Down Payment</td>
                                                <td> <input className="" type="text" name="" placeholder="" /></td>
                                            </tr>
                                            <tr style={{lineHeight: 0.8}}>
                                                <td>Rehab Budget</td>
                                                <td><input className="" type="text" name="" placeholder="" /></td>
                                            </tr>
                                            <tr style={{lineHeight: 0.8}}>
                                                <td>Misc</td>
                                                <td> <input className="" type="text" name="" placeholder="" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            }
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default SavedSearchEditTabs;

