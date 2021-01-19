import * as actionTypes from './actionTypes';
import axios from 'axios';

// ------ CREATE ------

// use this action to set a loading state and show a loading spinner 
export const registerMyCatStart = () => {
    return {
        type: actionTypes.REGISTER_MY_CAT_START
    };
};

export const registerMyCatSuccess = (catData) => {
    return {
        type: actionTypes.REGISTER_MY_CAT_SUCCESS,
        name: catData.name,
        birthdate: catData.birthdate,
        weight: catData.weight,
        breed: catData.breed,
        userId: catData.user_id
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
        let url = 'http://localhost:3001/api/v1/cats';
        axios.post(url, catData)
            .then(response => {
                console.log(response);
                dispatch(registerMyCatSuccess(catData));
            })
            .catch(err => {
                dispatch(registerMyCatFail(err));
            });
    };
};

// ------ EDIT ------

export const editMyCatStart = () => {
    return {
        type: actionTypes.EDIT_MY_CAT_START
    };
};

export const editMyCatSuccess = (catData) => {
    return {
        type: actionTypes.EDIT_MY_CAT_SUCCESS,
        name: catData.name,
        birthdate: catData.birthdate,
        weight: catData.weight,
        breed: catData.breed,
        userId: catData.user_id
    };
    
};

export const editMyCatFail = (error) => {
    return {
        type: actionTypes.EDIT_MY_CAT_FAIL,
        error: error
    };
};

export const edit = (name, birthdate, weight, breed, userId, catId) => {
    return dispatch => {
        dispatch(editMyCatStart());
        const id = catId
        const catData = {
            name: name,
            birthdate: birthdate,
            weight: weight,
            breed: breed,
            user_id: userId,
            catId: catId
        };
        let url = 'http://localhost:3001/api/v1/cats/' + id;
        axios.put(url, catData)
            .then(response => {
                dispatch(editMyCatSuccess(catData));
            })
            .catch(err => {
                dispatch(editMyCatFail(err));
            });
    };
};

// ------ DELETE ------

export const deleteMyCatStart = () => {
    return {
        type: actionTypes.DELETE_MY_CAT_START
    };
};

export const deleteMyCatSuccess = () => {
    return {
        type: actionTypes.DELETE_MY_CAT_SUCCESS
    };
    
};

export const deleteMyCatFail = (error) => {
    return {
        type: actionTypes.DELETE_MY_CAT_FAIL,
        error: error
    };
};

export const deleteCat = (catId) => {
    return dispatch => {
        dispatch(deleteMyCatStart());
        const id = catId;
        let url = 'http://localhost:3001/api/v1/cats/' + id;
        axios.delete(url)
            .then(response => {
                dispatch(deleteMyCatSuccess());
            })
            .catch(err => {
                dispatch(deleteMyCatFail(err));
            });
    };
};