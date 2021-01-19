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
        hasCat: false,
        editCat: false,
        catId: 0,
        catName: null,
        catBirthdate: null,
        catWeight: null,
        catBreed: null
    }

    componentDidMount() {
        this.getCats();
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

        if(!this.state.editCat) {
            this.props.onSubmitRegister(this.state.controls.name.value, this.state.controls.birthdate.value, this.state.controls.weight.value, this.state.controls.breed.value, userId);
        } else {
            const catId = this.state.catId;
            this.props.onSubmitEdit(this.state.controls.name.value, this.state.controls.birthdate.value, this.state.controls.weight.value, this.state.controls.breed.value, userId, catId);
        }
        this.getCats();
    }

    getCats = () => {
        let cats = null;
        const userId = localStorage.getItem('userId');
        if(userId) {
            let url = 'http://localhost:3001/api/v1/users/' + userId + '/cats';
            axios.get(url)
                .then(response => {
                    cats = (response.data);
                    console.log(cats);
                    if(cats.length !== 0) {
                        this.setState({
                            hasCat: true,
                            catId: cats[0].id,
                            catName: cats[0].name,
                            catBirthdate: cats[0].birthdate,
                            catWeight: cats[0].weight,
                            catBreed: cats[0].breed
                        });
                    } 
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    editContinueHandler = () => {
        this.setState({ editCat: true });
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

            !this.state.hasCat || this.state.editCat ? 
            <div className={classes.MyCat}>
                <h1>{!this.state.editCat ? 'Who\'s your little buddy ? (^・ω・^ )' : 'Edit your Cat'}</h1>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit !</Button>
                </form>
            </div>
            : 
            <div className={classes.MyCat}>
                    <h1>{this.state.catName}</h1>
                    <p>
                        {this.state.catBirthdate} | {this.state.catWeight} kg | {this.state.catBreed}
                    </p>
                    <Button btnType="Success" clicked={this.editContinueHandler}>Edit</Button>
                    <Button btnType="Danger">Delete</Button>
            </div> 
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitRegister: (name, birthdate, weight, breed, userId) => dispatch(actions.register(name, birthdate, weight, breed, userId)),
        onSubmitEdit: (name, birthdate, weight, breed, userId, catId) => dispatch(actions.edit(name, birthdate, weight, breed, userId, catId))
    };
}

export default connect(null, mapDispatchToProps)(MyCat);