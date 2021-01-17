import React from 'react';
import classes from './Spinner.module.css';

const spinner = () => (
    <div className={classes.skcircle}>
        <div className={classes.skcircle1 + ' ' + classes.skchild}></div>
        <div className={classes.skcircle2 + ' ' + classes.skchild}></div>
        <div className={classes.skcircle3 + ' ' + classes.skchild}></div>
        <div className={classes.skcircle4 + ' ' + classes.skchild}></div>
        <div className={classes.skcircle5 + ' ' + classes.skchild}></div>
        <div className={classes.skcircle6 + ' ' + classes.skchild}></div>
        <div className={classes.skcircle7 + ' ' + classes.skchild}></div>
        <div className={classes.skcircle8 + ' ' + classes.skchild}></div>
        <div className={classes.skcircle9 + ' ' + classes.skchild}></div>
        <div className={classes.skcircle10 + ' ' + classes.skchild}></div>
        <div className={classes.skcircle11 + ' ' + classes.skchild}></div>
        <div className={classes.skcircle12 + ' ' + classes.skchild}></div>
    </div>
);

export default spinner;