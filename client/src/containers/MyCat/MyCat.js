import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './MyCat.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions';
import axios from 'axios';

class MyCat extends Component {
    state = {
        controls: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            birthdate: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Birthdate :',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            weight: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Weight : e.g 2.83',
                    step: ".1"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            breed: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Breed'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        goToEdit: false,
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId');
        this.props.getCats(userId);
    }

    // Form validation rules 
    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
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
        const userId = localStorage.getItem('userId');

        if(!this.state.goToEdit) {
            this.props.onSubmitRegister(this.state.controls.name.value, this.state.controls.birthdate.value, this.state.controls.weight.value, this.state.controls.breed.value, userId);
        } else {
            const catId = this.props.catId;
            this.props.onSubmitEdit(this.state.controls.name.value, this.state.controls.birthdate.value, this.state.controls.weight.value, this.state.controls.breed.value, userId, catId);
            this.setState({ goToEdit: false });
        }
        this.props.getCats(userId);
    }

    editContinueHandler = () => {
        this.setState({ goToEdit: true });
    }

    returnHandler = () => {
        this.setState({ goToEdit: false });
    }

    deleteHandler = () => {
        let catId = this.props.catId;
        let confirm = window.confirm('Are you sure you want to delete your Cat ?');
        if (confirm) {
            this.props.onDelete(catId);
        } 
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
            !this.props.hasCat || this.props.editCat || this.state.goToEdit ? 
            <div className={classes.MyCat}>
                <h1>{!this.state.goToEdit ? 'Who\'s your little buddy ? (^・ω・^ )' : 'Edit your Cat'}</h1>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit !</Button>
                    {this.state.goToEdit ? <Button btnType="Change" clicked={this.returnHandler}>Back</Button> : null}
                </form>
            </div>
            : 
            <div className={classes.MyCat}>
                    <h1>{this.props.catName}</h1>
                    <p>
                        {this.props.catBirthdate} | {this.props.catWeight} kg | {this.props.catBreed}
                    </p>
                    <Button btnType="Success" clicked={this.editContinueHandler}>Edit</Button>
                    <Button btnType="Danger" clicked={this.deleteHandler}>Delete</Button>
            </div> 
        );
    };
};

const mapStateToProps = state => {
    return {
        catName: state.myCat.name,
        catBirthdate: state.myCat.birthdate,
        catWeight: state.myCat.weight,
        catBreed: state.myCat.breed,
        catId: state.myCat.catId,
        hasCat: state.myCat.hasCat,
        editCat: state.myCat.editCat
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCats: (userId) => dispatch(actions.getCats(userId)),
        onSubmitRegister: (name, birthdate, weight, breed, userId) => dispatch(actions.register(name, birthdate, weight, breed, userId)),
        onSubmitEdit: (name, birthdate, weight, breed, userId, catId) => dispatch(actions.edit(name, birthdate, weight, breed, userId, catId)),
        onDelete: (catId) => dispatch(actions.deleteCat(catId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCat);