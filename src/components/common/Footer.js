import React from 'react';

const Footer = () => (
    <footer className="flex reg-footer">
        <ul className="social-icons">
            <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
            <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
            <li><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
            <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
        </ul>
        <ul className="footer-links">
            <li><a>About</a></li>
            <li><a>Contact</a></li>
            <li><a>Privacy Policy</a></li>
        </ul>
    </footer>
);

export default Footer;
