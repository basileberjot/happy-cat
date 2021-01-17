import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const navigationItems = ( props ) => {
    let navigationItems = null;

    if(!props.isAuthenticated) {
        navigationItems = (
            <Aux>
                <NavigationItem exact link="/">Happy Cat</NavigationItem>
                <NavigationItem link="/auth">Log In</NavigationItem>
            </Aux>
        );
    } else {
        navigationItems = (
        <Aux>
            <NavigationItem exact link="/">Happy Cat</NavigationItem>
            <NavigationItem link="/my-cat">My Cat</NavigationItem>
            <NavigationItem link="/logout">Log Out</NavigationItem>
        </Aux>
        );
    }

    return (
        <ul className={classes.NavigationItems}>
            {navigationItems}
        </ul>
    );
}

export default navigationItems;