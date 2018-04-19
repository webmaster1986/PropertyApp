import React, {Component} from 'react';
import SavedSearchEditTabs from './common/SavedSearchEditTabs';
import '../static/scss/layout/SavedSearch.css';

class SavedSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: props.allCities,
            cityName: '',
            state: '',
            link: '',
            editableIndex: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cities: nextProps.allCities,
        });
    }

    componentDidMount() {
    //	jcf.replaceAll();

        if (this.props.allCities.length === 0) {
            this.props.actions.getCities();
        }
    }

    componentWillMount() {
        const loginUser = this.props.user;
        if (!loginUser) {
            this.props.history.push({
                pathname: '/',
            });
            return;
        }
        if (localStorage.getItem('propertyObject') === null) {
            this.props.history.push({
                pathname: '/propertyList',
            });
            return;
        }
    }

  addCity = () => {
      const {cityName, link, state} = this.state;
      if (!cityName || !link || !state) {
          this.setState({
              error: 'All fields required',
          });
          return;
      }
      const data = {
          city: cityName,
          link,
          state,
      };
      this.props.actions.addCity(data, (res) => {
          if (!res.error && res.message === 'City Saved Successfully') {
              this.setState({
                  error: 'City added successfully',
                  cityName: '',
                  link: '',
                  state: '',
              });
          } else {
              this.setState({
                  error: res.error,
              });
          }

      });
  }

  onChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value,
      });
  }

  editInfo = (index) => {
      if (index >= 0) {
          this.setState({
              editableIndex: index,
          });
      }
  }

  onSave = () => {
      this.setState({
          editableIndex: null,
      });
  }

  render() {
      return (
          <div className="view-property saved-search">
              <div className="wrapper">
                  <div className="content no-margin">
                      <div>
                          <div className="edit-mode">
                              <div className="edit-tabs flex">
                                  <ul className="tabs">
                                      <li id="tab-1">Savaed searchs</li>
                                  </ul>
                                  <SavedSearchEditTabs
                                      state={this.state}
                                      addCity={this.addCity}
                                      onChange={this.onChange}
                                      onSave={this.onSave}
                                      editInfo={this.editInfo}
                                      editableIndex={this.state.editableIndex}
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}

export default SavedSearch;
