import * as actionTypes from './actionTypes';
import axios from 'axios';

// use this action to set a loading state and show a loading spinner 
export const registerMyCatStart = () => {
    return {
        type: actionTypes.REGISTER_MY_CAT_START
    };
};

export const registerMyCatSuccess = (name, birthdate, weight, breed, userId) => {
    return {
        type: actionTypes.REGISTER_MY_CAT_SUCCESS,
        name: name,
        birthdate: birthdate,
        weight: weight,
        breed: breed,
        userId: userId
    };
};

export const registerMyCatFail = (error) => {
    return {
        type: actionTypes.REGISTER_MY_CAT_FAIL,
        error: error
    };
};

export const register = (name, birthdate, weight, breed, userId) => {
    return dispatch => {
        dispatch(registerMyCatStart());
        const catData = {
            name: name,
            birthdate: birthdate,
            weight: weight,
            breed: breed,
            user_id: userId
        };
        let url = 'http://localhost:3001/api/v1/cats#create';
        axios.post(url, catData)
            .then(response => {
                console.log(response);
                dispatch(registerMyCatSuccess(response.data.name, response.data.user.id));
            })
            .catch(err => {
                dispatch(registerMyCatFail(err));
            });
    };
};