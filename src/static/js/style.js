import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Common Mixins
    body: {
        height: [{ unit: '%V', value: 1 }],
        margin: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
        font: [{ unit: 'string', value: '"Raleway",' }, { unit: 'string', value: '"Arial",' }, { unit: 'string', value: 'sans-serif' }],
        color: '#455A64',
    },
    html: {
        height: [{ unit: '%V', value: 1 }],
        margin: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
        font: [{ unit: 'string', value: '"Raleway",' }, { unit: 'string', value: '"Arial",' }, { unit: 'string', value: 'sans-serif' }],
        color: '#455A64',
    },
    '#root': {
        display: 'flex',
        height: [{ unit: '%V', value: 1 }],
    },
    a: {
        color: 'inherit',
    },
    h1: {
        display: 'inline',
    },
    h6: {
        fontSize: [{ unit: '%V', value: 1.1 }],
        marginBottom: [{ unit: 'px', value: 10 }],
    },
    code: {
        fontSize: [{ unit: '%V', value: 1.15 }],
    },
    'buttonbutton-primary': {
        color: '#FFFFFF',
        backgroundColor: '#546E7A',
        borderColor: '#455A64',
    },
    'buttonbutton-primary': {
        color: '#FFFFFF',
        backgroundColor: '#546E7A',
        borderColor: '#455A64',
    },
    'input[type="submit"]button-primary': {
        color: '#FFFFFF',
        backgroundColor: '#546E7A',
        borderColor: '#455A64',
    },
    'input[type="reset"]button-primary': {
        color: '#FFFFFF',
        backgroundColor: '#546E7A',
        borderColor: '#455A64',
    },
    'input[type="button"]button-primary': {
        color: '#FFFFFF',
        backgroundColor: '#546E7A',
        borderColor: '#455A64',
    },
    'buttonbutton-primary:hover': {
        color: '#FFFFFF',
        backgroundColor: '#37474F',
        borderColor: '#263238',
    },
    'buttonbutton-primary:hover': {
        color: '#FFFFFF',
        backgroundColor: '#37474F',
        borderColor: '#263238',
    },
    'input[type="submit"]button-primary:hover': {
        color: '#FFFFFF',
        backgroundColor: '#37474F',
        borderColor: '#263238',
    },
    'input[type="reset"]button-primary:hover': {
        color: '#FFFFFF',
        backgroundColor: '#37474F',
        borderColor: '#263238',
    },
    'input[type="button"]button-primary:hover': {
        color: '#FFFFFF',
        backgroundColor: '#37474F',
        borderColor: '#263238',
    },
    'buttonbutton-primary:focus': {
        color: '#FFFFFF',
        backgroundColor: '#37474F',
        borderColor: '#263238',
    },
    'buttonbutton-primary:focus': {
        color: '#FFFFFF',
        backgroundColor: '#37474F',
        borderColor: '#263238',
    },
    'input[type="submit"]button-primary:focus': {
        color: '#FFFFFF',
        backgroundColor: '#37474F',
        borderColor: '#263238',
    },
    'input[type="reset"]button-primary:focus': {
        color: '#FFFFFF',
        backgroundColor: '#37474F',
        borderColor: '#263238',
    },
    'input[type="button"]button-primary:focus': {
        color: '#FFFFFF',
        backgroundColor: '#37474F',
        borderColor: '#263238',
    },
    'button-primary': {
        margin: [{ unit: 'px', value: 5 }, { unit: 'px', value: 5 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
        borderRadius: '2px',
    },
    code: {
        color: '#546E7A',
    },
    hr: {
        marginTop: [{ unit: 'rem', value: 1 }],
        marginBottom: [{ unit: 'rem', value: 1.5 }],
    },
    // REDUX STATE CODEBLOCK
    pre: {
        fontSize: [{ unit: '%V', value: 0.9 }],
        margin: [{ unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }, { unit: 'px', value: 0 }],
        backgroundColor: '#CFD8DC',
        counterReset: 'line-numbering',
        fontFamily: 'Consolas, Menlo, Monaco, monospace',
        padding: [{ unit: 'px', value: 5 }, { unit: 'px', value: 5 }, { unit: 'px', value: 5 }, { unit: 'px', value: 5 }],
        borderRadius: '3px 10px 3px 10px',
        color: '#455A64',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
    },
    'pre line::before': {
        content: 'counter(line-numbering)',
        counterIncrement: 'line-numbering',
        paddingRight: [{ unit: 'em', value: 1 }],
        // space after numbers
        width: [{ unit: 'em', value: 1.5 }],
        textAlign: 'right',
        fontWeight: '600',
        fontSize: [{ unit: 'px', value: 12 }],
        color: '#616161',
    },
    'header-container': {
        marginTop: [{ unit: 'px', value: 15 }],
    },
    'header-left': {
        color: '#2DC152',
        marginLeft: [{ unit: 'px', value: 50 }],
        fontWeight: 'bold',
        fontSize: [{ unit: 'px', value: 20 }],
        textAlign: 'left',
        width: [{ unit: '%H', value: 0.8 }],
        fontFamily: 'Roboto',
    },
    'header-right-span': {
        float: 'right',
        width: [{ unit: '%H', value: 0.2 }],
        marginRight: [{ unit: 'px', value: 40 }],
    },
    'header-right': {
        opacity: '0.8',
        color: '#575757',
        fontFamily: 'Roboto',
        fontSize: [{ unit: 'px', value: 14 }],
        fontWeight: '300',
        lineHeight: [{ unit: 'px', value: 16 }],
        marginRight: [{ unit: 'px', value: 10 }],
    },
    'button-style': {
        color: '#fff',
        borderRadius: '2px',
        backgroundColor: '#2FC865',
        textAlign: 'center',
    },
    'footer-container': {
        bottom: [{ unit: 'px', value: 0 }],
    },
    'footer-left': {
        marginLeft: [{ unit: 'px', value: 50 }],
        width: [{ unit: '%H', value: 0.8 }],
    },
    'footer-right': {
        color: '#575757',
        fontFamily: 'Roboto',
        fontSize: [{ unit: 'px', value: 14 }],
        fontWeight: '300',
    },
    'footer-right-span': {
        float: 'right',
        width: [{ unit: '%H', value: 0.2 }],
    },
    'margin-right': {
        marginRight: [{ unit: 'px', value: 10 }],
    },
    'margin-right-20': {
        marginRight: [{ unit: 'px', value: 20 }],
    },
    'a:hover': {
        color: '#2DC152',
        textDecoration: 'underline',
    },
    'register-one-content': {
        color: '#2DC152',
        fontSize: [{ unit: 'px', value: 38 }],
        marginLeft: [{ unit: '%H', value: 0.32 }],
        marginTop: [{ unit: '%V', value: 0.1 }],
        fontWeight: '500',
        fontFamily: 'Roboto',
    },
    'register-text-container': {
        marginLeft: [{ unit: '%H', value: 0.32 }],
        marginTop: [{ unit: 'px', value: 25 }],
    },
    'register-text-style': {
        fontFamily: 'Roboto',
        fontSize: [{ unit: 'px', value: 20 }],
    },
    'register-text-field-style': {
        width: [{ unit: '%H', value: 0.53 }],
        height: [{ unit: 'px', value: 45 }, { unit: 'string', value: '!important' }],
        backgroundColor: '#f2f2f2 !important',
    },
    'press-enter-style': {
        marginLeft: [{ unit: 'px', value: 10 }],
        color: '#999999',
        fontSize: [{ unit: 'px', value: 11 }],
    },
    'dont-worry-text-style': {
        marginLeft: [{ unit: '%H', value: 0.13 }],
        color: '#999999',
        fontSize: [{ unit: 'px', value: 11 }],
    },
    'register-five-content': {
        color: '#2DC152',
        fontSize: [{ unit: 'px', value: 38 }],
        marginLeft: [{ unit: '%H', value: 0.4 }],
        fontWeight: '500',
        fontFamily: 'Roboto',
        marginTop: [{ unit: '%V', value: 0.1 }],
    },
    'register-five-content1': {
        color: '#2DC152',
        fontSize: [{ unit: 'px', value: 38 }],
        marginLeft: [{ unit: '%H', value: 0.23 }],
        fontWeight: '500',
        fontFamily: 'Roboto',
    },
    '*::-webkit-input-placeholder': {
        color: '#ccc',
    },
    '*:-moz-placeholder': {
    // FF 4-18
        color: '#ccc',
    },
    '*::-moz-placeholder': {
    // FF 19+
        color: '#ccc',
    },
    '*:-ms-input-placeholder': {
    // IE 10+
        color: '#ccc',
    },
    'register-button-right-span': {
        float: 'right',
        marginRight: [{ unit: '%H', value: 0.05 }],
    },
    'login-text-field-style': {
        width: [{ unit: '%H', value: 0.45 }],
        height: [{ unit: 'px', value: 45 }, { unit: 'string', value: '!important' }],
    },
    'login-container': {
        marginTop: [{ unit: '%V', value: 0.08 }],
        marginLeft: [{ unit: '%H', value: 0.35 }],
    },
    'login-text-style': {
        fontSize: [{ unit: 'px', value: 30 }],
        color: '#2DC152',
    },
    'margin-top-10': {
        marginTop: [{ unit: 'px', value: 10 }],
    },
    'margin-top-15': {
        marginTop: [{ unit: 'px', value: 15 }],
    },
    'forgot-password-text': {
        marginLeft: [{ unit: '%H', value: 0.19 }],
        color: '#999999',
        cursor: 'pointer',
    },
    'input:focus': {
        borderColor: '#2DC152 !important',
    },
});
