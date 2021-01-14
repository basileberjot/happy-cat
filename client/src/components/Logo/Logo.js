import React from 'react';
import catLogo from '../../assets/images/catLogo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={catLogo} alt="CatLogo"/>
    </div>
);

export default logo;