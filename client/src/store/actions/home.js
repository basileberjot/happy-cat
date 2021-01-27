import * as actionTypes from './actionTypes';
import axios from 'axios';

// ------ CREATE ------

export const submitWeightStart = () => {
    return {
        type: actionTypes.SUBMIT_WEIGHT_START
    };
};

export const submitWeightSuccess = (catData) => {
    return {
        type: actionTypes.SUBMIT_WEIGHT_SUCCESS,
        weight: catData.value,
        catId: catData.cat_id
    };
    
};

export const submitWeightFail = (error) => {
    return {
        type: actionTypes.SUBMIT_WEIGHT_FAIL,
        error: error
    };
};

export const submitWeight = (catWeight, catId) => {
    return dispatch => {
        dispatch(submitWeightStart());
        const catData = {
            value: catWeight,
            cat_id: catId
        };
        console.log(catData);
        let url = 'http://localhost:3001/api/v1/weights';
        axios.post(url, catData)
            .then(response => {
                dispatch(submitWeightSuccess(catData));
            })
            .catch(err => {
                dispatch(submitWeightFail(err));
            });
    };
};

