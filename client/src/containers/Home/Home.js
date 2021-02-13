import React, {Component} from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import classes from './Home.module.css';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Weight from '../../components/Weight/Weight';

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
        },
        displayWeights: false,
        hasSelectedCat: false,

        catName: null,
        catBirthdate: null,
        catBreed: null,
        catId: null,
        weights: null,
        catImage: null
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

    submitHandler = (event) => {
        //prevents the reloading of the page
        event.preventDefault();

        const catId = this.state.catId;
        this.props.onSubmitWeight(this.state.controls.weight.value, catId);
        this.setState({displayWeights: true});
    }

    registerCatHandler = () => {
        this.props.history.push('/my-cat');
    }  

    logInHandler = () => {
        this.props.history.push('/auth');
    }

    displayWeightFormHandler = (event) => {
        event.preventDefault();

        this.setState({displayWeights: false});
    }

    displayWeightsHandler = () => {
        this.setState({displayWeights: true});
    }

    clearWeightsHandler = () => {
        let catId = this.state.catId;
        let confirm = window.confirm('Are you sure you want to clear your Cat\'s weight history ?');
        if (confirm) {
            this.props.onClearWeights(catId);
        } 
    }

    selectCatHandler = (cat) => {
        this.setState({
            displayWeights: true,
            hasSelectedCat: true,

            catName: cat.name,
            catBirthdate: cat.birthdate,
            catBreed: cat.breed,
            catImage: cat.image,
            catId: cat.id
        });

        this.props.onGetWeights(cat.id);
    }

    returnHandler = () => {
        this.setState({ 
            displayWeights: false, 
            addNewCat: false, 
            changeImage: false,
            hasSelectedCat: false,

            catName: null,
            catBirthdate: null,
            catBreed: null,
            catId: null,
            weights: null,
            catImage: null
        });
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

        let weights = <Spinner />;
        if (!this.props.loading && this.props.weights) {
            weights = this.props.weights.map(weight => (
                <div>
                    <Weight 
                        key={weight.id}
                        date={new Date(weight.created_at).toLocaleDateString('ja-JP')}
                        value={weight.value + ' kg'}
                    />
                </div>
            ))
        }

        let image = <Spinner />;
        if (!this.props.loading && this.state.catImage) {
            image = (
                <img className={classes.Image} src={this.state.catImage.url} />
            );
        }

        let catsImage = <Spinner />;
        if (!this.props.loading) {
            catsImage = this.props.cats.map(cat => (
                <img className={classes.Image} src={cat.image.url} onClick={() => this.selectCatHandler(cat)}/>
            ))
        }
    
        return (
            this.props.isAuthenticated ?
                this.props.hasCat ?
                    this.state.hasSelectedCat ?
                        this.state.displayWeights ?
                            <div className={classes.Home}>
                                {image}
                                <br />
                                <Button btnType="Success" clicked={this.displayWeightFormHandler}>Enter a new weight !</Button>
                                <br />
                                {this.props.weights.length >= 1 ? <Button btnType="Change" clicked={this.clearWeightsHandler}>Clear weight history</Button> : null}
                                {this.props.weights.length >= 1 ? <h1>{this.state.catName}'s weight history</h1> : null}
                                {weights}
                                <Button btnType="Change" clicked={this.returnHandler}>Back to Home</Button>
                            </div>
                        :
                            <div className={classes.Home}>
                                <h1>How much does {this.state.catName} weigh today ?</h1>
                                <form onSubmit={this.submitHandler}>
                                    {form}
                                    <Button btnType="Success">Submit !</Button>
                                    {!this.state.displayWeights ? <Button btnType="Change" clicked={this.displayWeightsHandler}>Back</Button> : null}
                                </form>
                            </div>
                    :
                    <div className={classes.Home}>
                        <h1>Select a Cat !</h1>
                        {catsImage}
                    </div>
                :
                    <div className={classes.Home}>
                        You didn’t register your cat yet. Please tell us about your kitty <span className={classes.FollowLink} onClick={this.registerCatHandler}>here</span> !
                    </div>
            :
                <div className={classes.Home}>
                    Welcome to your favorite cat health monitoring app, Happy Cat ! <br/> To start using the application, please <span className={classes.FollowLink} onClick={this.logInHandler}>log in</span> or <span className={classes.FollowLink} onClick={this.logInHandler}>create an account</span> !
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        hasCat: state.myCat.hasCat,
        weights: state.myCat.weights,
        loading: state.home.loading,
        hasSubmitWeight: state.home.hasSubmitWeight,
        cats: state.myCat.cats
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitWeight: (weight, catId) => dispatch(actions.submitWeight(weight, catId)),
        onClearWeights: (catId) => dispatch(actions.deleteWeights(catId)),
        onGetWeights: (catId) => dispatch(actions.getWeights(catId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);