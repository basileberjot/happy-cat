import React from 'react';
import catLogo from '../../assets/images/catLogo.png';
import classes from './Logo.module.css';

let audio = new Audio("/meow.mp3");
const start = () => {
    audio.play()
}

const logo = (props) => (
    
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={catLogo} alt="CatLogo" onClick={start}/>
    </div>
);

export default logo;