import React from 'react';
import classes from './Cat.module.css';
import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Button/Button';

const cat = (props) => {
    let image = <Spinner />;
    if (props.image) {
        image = (
            <img className={classes.Image} src={props.image} />
        );
    }

    return (
        <div className={classes.MyCat}>
            {image}
            <h1>{props.name}</h1>
            <p>
                {props.birthdate} | {props.breed}
            </p>
            <Button btnType="Success" clicked={props.edit}>Edit</Button>
            <Button btnType="Danger" clicked={props.delete}>Delete</Button>
        </div> 
    );
} 

export default cat;