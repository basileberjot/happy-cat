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
        displayWeights: true
    }

    componentDidMount() {
        // console.log(this.props.image);
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

        const catId = this.props.catId;
        console.log(catId);
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
                    <h1>{this.props.catName}'s weight history</h1>
                    <Weight 
                        key={weight.id}
                        date={new Date(weight.created_at).toLocaleDateString('ja-JP')}
                        value={weight.value + ' kg'}
                    />
                </div>
            ))
        }

        let image = <Spinner />;
        if (!this.props.loading && this.props.image) {
            console.log(this.props.image);
            image = (
                <img className={classes.Image} src={this.props.image.url} />
            );
        }
    
        return (
            this.props.isAuthenticated ?
                this.props.hasCat ?
                    this.state.displayWeights ? 
                        <div className={classes.Home}>
                            {image}
                            <Button btnType="Success" clicked={this.displayWeightFormHandler}>Enter a new weight !</Button>
                            {weights}
                        </div>
                    :
                        <div className={classes.Home}>
                            <h1>How much does {this.props.catName} weigh today ?</h1>
                            <form onSubmit={this.submitHandler}>
                                {form}
                                <Button btnType="Success">Submit !</Button>
                                {!this.state.displayWeights ? <Button btnType="Change" clicked={this.displayWeightsHandler}>Back</Button> : null}
                            </form>
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
        catName: state.myCat.name,
        catId: state.myCat.catId,
        hasCat: state.myCat.hasCat,
        loading: state.home.loading,
        weights: state.myCat.weights,
        image: state.myCat.image,
        hasSubmitWeight: state.home.hasSubmitWeight,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitWeight: (weight, catId) => dispatch(actions.submitWeight(weight, catId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);