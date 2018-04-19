import React from 'react';

const AdminTabs = (props) => {

    return (
        <div className="tabs-data">

            <div className="tab-data" id="tab-data-1">
                <table className="table table-small">
                    <tbody>
                        <tr>
                            <td>User 1</td>
                        </tr>
                        <tr>
                            <td>User 2</td>
                        </tr>
                        <tr>
                            <td>User 3</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="tab-data" id="tab-data-2">
                <div className="city-info">
                    <input type="text" placeholder="City Name" name="cityName" onChange={props.onChange} value={props.state.cityName} />
                    <input type="text" placeholder="State Code" onChange={props.onChange} name="state" value={props.state.state} />
                    <input type="text" placeholder="Url Link" onChange={props.onChange} name="link" value={props.state.link} />
                </div>
                <a className="primary-btn" onClick={props.addCity}>Add City</a>
                <p>{props.state.error}</p>
                <table className="table table-small table-striped">
                    <tbody>
                        {
                            props.state.cities.map((city, i) => (
                                <tr key={i}><td>{city}</td></tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AdminTabs;

