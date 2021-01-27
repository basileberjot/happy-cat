import React from 'react';
import classes from './Weight.module.css';

const weight = (props) => {
    
    return (
        <div className={classes.Weight}>
            <p>Date : {props.date}</p>
            <p>Weight : <strong>{props.value}</strong></p>
        </div>
    );
}

export default weight;