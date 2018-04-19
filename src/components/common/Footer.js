import React from 'react';

const Footer = () => (
    <footer className="flex reg-footer">
        <ul className="social-icons">
            <li><a><i className="fa fa-facebook" aria-hidden="true" /></a></li>
            <li><a><i className="fa fa-twitter" aria-hidden="true" /></a></li>
            <li><a><i className="fa fa-google-plus" aria-hidden="true" /></a></li>
            <li><a><i className="fa fa-linkedin" aria-hidden="true" /></a></li>
        </ul>
        <ul className="footer-links">
            <li><a>About</a></li>
            <li><a>Contact</a></li>
            <li><a>Privacy Policy</a></li>
        </ul>
    </footer>
);

export default Footer;
