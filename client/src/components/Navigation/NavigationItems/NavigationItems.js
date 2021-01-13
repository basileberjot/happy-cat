import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">Happy Cat</NavigationItem>
        { !props.isAuthenticated 
            ? <NavigationItem link="/auth">Log In</NavigationItem>
            : <NavigationItem link="/logout">Log Out</NavigationItem>
        }
        
    </ul>
);

export default navigationItems;