import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './MyCat.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Cat from '../../components/Cat/Cat';

const userId = localStorage.getItem('userId');

class MyCat extends Component {
    state = {
        controls: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: this.props.catName !== '' ? this.props.catName : '',
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
                value: this.props.catBirthdate !== '' ? this.props.catBirthdate : '',
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
                value: this.props.catBreed !== '' ? this.props.catBreed : '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        goToEdit: false,
        addNewCat: false,
        featured_image: null
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

        if(!this.state.goToEdit || this.state.addNewCat) {
            this.props.onSubmitRegister(this.state.controls.name.value, this.state.controls.birthdate.value, this.state.controls.breed.value, userId, this.state.featured_image);
        } else {
            const catId = this.props.catId;
            this.props.onSubmitEdit(this.state.controls.name.value, this.state.controls.birthdate.value, this.state.controls.breed.value, userId, catId, this.state.featured_image);
            this.setState({ goToEdit: false });
        }
    }

    editContinueHandler = () => {
        this.setState({ 
            goToEdit: true
        });
    }

    addNewCatHandler = () => {
        this.setState({
            goToEdit: true,
            addNewCat: true
        });
    }

    returnHandler = () => {
        this.setState({ goToEdit: false, addNewCat: false });
    }

    deleteHandler = () => {
        let catId = this.props.catId;
        let confirm = window.confirm('Are you sure you want to delete your Cat ?');
        if (confirm) {
            this.props.onDelete(catId);
        } 
    }

    onImageChange = event => { 
        this.setState({ featured_image: event.target.files[0] });
    };

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

        let cats = <Spinner />;
        if (!this.props.loading) {
            cats = this.props.cats.map(cat => (
                <Cat 
                    key={cat.id}
                    name={cat.name}
                    birthdate={cat.birthdate}
                    breed={cat.breed}
                    image={cat.image.url}
                    editContinueHandler={this.editContinueHandler}
                    deleteHandler={this.deleteHandler}
                />
            ))
        }

        return (
            !this.props.hasCat || this.props.editCat || this.state.goToEdit ? 
            <div className={classes.MyCat}>
                <h1>{!this.state.goToEdit || this.state.addNewCat ? 'Who\'s your little buddy ? (^・ω・^ )' : 'Edit your Cat'}</h1>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <label htmlFor="image">Upload image
                        <input type="file" name="image" accept="image/*" onChange={this.onImageChange}/>
                    </label>
                    <Button btnType="Success">Submit !</Button>
                    {this.state.goToEdit ? <Button btnType="Change" clicked={this.returnHandler}>Back</Button> : null}
                </form>
            </div>
            : 
            <div>
                {cats}
                <Button btnType="Success" clicked={this.addNewCatHandler}>Add a new Cat</Button>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        cats: state.myCat.cats,
        catName: state.myCat.name,
        catBirthdate: state.myCat.birthdate,
        catBreed: state.myCat.breed,
        catId: state.myCat.catId,
        hasCat: state.myCat.hasCat,
        image: state.myCat.image,
        editCat: state.myCat.editCat
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCats: (userId) => dispatch(actions.getCats(userId)),
        onSubmitRegister: (name, birthdate, breed, userId, image) => dispatch(actions.register(name, birthdate, breed, userId, image)),
        onSubmitEdit: (name, birthdate, breed, userId, catId, image) => dispatch(actions.edit(name, birthdate, breed, userId, catId, image)),
        onDelete: (catId) => dispatch(actions.deleteCat(catId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCat);