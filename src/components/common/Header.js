import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../static/images/logo2.png';

const Header = (props) => {

    return (
        <header className="flex">
            <div className="logo">
                <Link to={'/propertyList'}>
                    <img className="imgLogo" alt="logo" src={logo}/>
                </Link>
            </div>
            {
                props.redirectLoginPage ?
                    <div className="login" onClick={props.redirectLoginPage}>
                        <p>Already have an account?</p>
                        <a className="primary-btn">Login</a>
                    </div> :
                    props.redirectRegisterPage && <div className="login" onClick={props.redirectRegisterPage}>
                        <a className="primary-btn">Register</a>
                    </div>
            }
        </header>
    );
};

export default Header;

