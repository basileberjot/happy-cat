import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './MyCat.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
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
        addNewCat: false,
        featured_image: null,
        id: null,
        cat: [],
        changeImage: false
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
            const catId = this.state.cat.id;
            let image = null;
            if(!this.state.changeImage) {
                image = this.state.featured_image.signed_id;
            } else {
                image = this.state.featured_image;
            }
            this.props.onSubmitEdit(this.state.controls.name.value, this.state.controls.birthdate.value, this.state.controls.breed.value, userId, catId, image);
        }
        this.setState({ goToEdit: false, changeImage: false, addNewCat: false });
    }

    editContinueHandler = (cat) => {
        const updatedControls = {
            ...this.state.controls,
            name: {
                ...this.state.controls.name,
                value: cat.name
            },
            birthdate: {
                ...this.state.controls.birthdate,
                value: cat.birthdate
            },
            breed: {
                ...this.state.controls.breed,
                value: cat.breed
            }
        };
        
        this.setState({
            goToEdit: true,
            cat: cat,
            featured_image: cat.image,
            controls: updatedControls
        });
    }

    addNewCatHandler = () => {
        const updatedControls = {
            ...this.state.controls,
            name: {
                ...this.state.controls.name,
                value: ''
            },
            birthdate: {
                ...this.state.controls.birthdate,
                value: ''
            },
            breed: {
                ...this.state.controls.breed,
                value: ''
            }
        };

        this.setState({
            featured_image: null,
            goToEdit: true,
            addNewCat: true,
            controls: updatedControls
        });
    }

    returnHandler = () => {
        this.setState({ goToEdit: false, addNewCat: false, changeImage: false });
    }

    deleteHandler = (catId) => {
        let confirm = window.confirm('Are you sure you want to delete your Cat ?');
        if (confirm) {
            this.props.onDelete(catId, userId);
        } 
    }

    onImageChange = event => {
        this.setState({ featured_image: event.target.files[0], changeImage: true });
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
                    edit={() => this.editContinueHandler(cat)}
                    delete={() => this.deleteHandler(cat.id)}
                />
            ))
        }

        return (
            !this.props.hasCat || this.props.editCat || this.state.goToEdit ? 
            <div className={classes.MyCat}>
                <h1>{!this.state.goToEdit || this.state.addNewCat ? 'Who\'s your little buddy ? (^・ω・^ )' : 'Edit ' + this.state.cat.name}</h1>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <label htmlFor="image">{'Upload image '}
                        <input type="file" name="image" accept="image/*" onChange={this.onImageChange}/>
                    </label>
                    {this.state.featured_image  !== null && !this.state.changeImage ? <img className={classes.Image} src={this.state.featured_image.url}/> : null}
                    <Button btnType="Success">Submit !</Button>
                    {this.state.goToEdit ? <Button btnType="Change" clicked={this.returnHandler}>Back</Button> : null}
                </form>
            </div>
            : 
            <div className={classes.MyCat}>
                {this.props.cats.length > 1 ? <h1>My Cats</h1> : <h1>My Cat</h1>}
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
        onDelete: (catId, userId) => dispatch(actions.deleteCat(catId, userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCat);