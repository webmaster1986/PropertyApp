import React, {Component} from 'react';
import NumberFormat from 'react-number-format';
import Pager from './Pager';
import CONST from '../../utils/CONST';
import ASC from '../../static/images/sort_asc.png';
import DESC from '../../static/images/sort_desc.png';

class PropertyList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            pageSize: 0,
        };
    }

    onPageChanged = (current) => {
        this.setState({
            current,
        });
    }

    pageSizeChange = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value, 10),
            current: 0,
        });
    }

    getData = (propertiesByCity) => {

        const {pageSize, current} = this.state;
        if (pageSize === 0 && propertiesByCity.length > 0) {
            this.setState({
                pageSize: propertiesByCity.length,
            });
            return propertiesByCity;
        }
        return propertiesByCity.filter((item, index) => index >= (current * pageSize) && index < ((current * pageSize) + pageSize));

    }

    render() {
        const {pageSize, current} = this.state;
        let total = (this.props.propertiesByCity || []).length;
        total = Math.ceil(total / pageSize);
        const propertiesData = this.getData(this.props.propertiesByCity || []);
        const tableFilter = this.props.tableFilter;

        return (
            <div className="data-table">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            {
                                ['Address', 'Price', 'Units', 'Sq. Ft', '$/Sq. Ft', 'On the market', tableFilter === 'cap' ? 'Cap Rate' : (tableFilter === 'gross' && 'GRM') || (tableFilter === 'coc' && 'COC')].map((i) => (
                                    <th key={i} onClick={() => this.props.Sort(i)}>{i}{this.props.sortProp === i && (this.props.sortAscDesc ? <img src={ASC} /> : <img src={DESC} />) || ''}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {propertiesData.length === 0 ?
                            <tr><td className="noData" colSpan={7}>No properties match your filters</td></tr> :
                            propertiesData.map((data, i) => (
                                <tr key={i} className={this.props.active === i ? 'selected' : ''} onClick={() => this.props.tableData(data, i)}>
                                    <td className="data-location">{data.address}</td>
                                    <td><NumberFormat value={data.price} displayType={'text'} thousandSeparator prefix={'$'} /></td>
                                    <td>{data.numOfUnits}</td>
                                    <td>{data.squareFeet}</td>
                                    <td><NumberFormat value={data.dollarPerSquare} displayType={'text'} thousandSeparator prefix={'$'} /></td>
                                    <td>{data.daysOnSite ? `${data.daysOnSite} days` : '-'}</td>
                                    <td>{tableFilter === 'cap' ? data.capRate : (tableFilter === 'gross' && data.grossRentMultiplier) || (tableFilter === 'coc' && data.coc)}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className="pagination-block">
                    <div className="pull-left">
                        <select name="pageSize" onChange={this.pageSizeChange} value={this.state.pageSize}>
                            {
                                CONST.PAGE_SIZES.map((page) => (
                                    <option value={page} key={page}>{page}</option>
                                ))
                            }
                        </select>
                        <span>Records from {(current * pageSize) === 0 ? 1 : (current * pageSize)}
                         -{ ((current * pageSize) + pageSize) > (this.props.propertiesByCity || []).length ?
                                (this.props.propertiesByCity || []).length : (current * pageSize) + pageSize} of {(this.props.propertiesByCity || []).length}</span>
                    </div>
                    <div className="pull-right">
                        <Pager
                            total={total}
                            current={this.state.current}
                            visiblePages={CONST.PAGINATION_PAGES}
                            onPageChanged={this.onPageChanged}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export default PropertyList;
