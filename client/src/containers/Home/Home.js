import React, {Component} from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import classes from './Home.module.css';
import Button from '../../components/UI/Button/Button';

class Home extends Component {
    state = {
        controls: {
            weight: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Weight'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        }
    }

    // updates the input element when we enter something
    inputChangedHandler = (event, controlName) => {

        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        //prevents the reloading of the page
        event.preventDefault();

        const catId = this.props.catId;
        // this.props.onSubmitEdit(this.state.controls.name.value, this.state.controls.birthdate.value, this.state.controls.breed.value, userId, catId);
        // this.props.getCats(userId);
    }

    registerCatHandler = () => {
        this.props.history.push('/my-cat');
    }  

    render () {
    // Convert the state object into a array we can loop through
    const formElementsArray = [];
    for (let key in this.state.controls) {
        formElementsArray.push({
            id: key,
            config: this.state.controls[key]
        });
    }

    // Email and password inputs
    let form = formElementsArray.map(formElement => (
        <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
        ));

        return (
            this.props.hasCat ? 
                <div className={classes.Home}>
                    <h1>How much does {this.props.catName} weigh today ?</h1>
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="Success">Submit !</Button>
                    </form>
                </div>
                :
                <div className={classes.Home}>
                    You didn’t register your cat yet. Please tell us about your kitty <span className={classes.FollowLink} onClick={this.registerCatHandler}>here</span> !
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        catName: state.myCat.name,
        catId: state.myCat.catId,
        hasCat: state.myCat.hasCat
    };
}

export default connect(mapStateToProps, null)(Home);