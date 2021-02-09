import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as actions from '../../store/actions';

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
        let url = 'http://localhost:3001/api/v1/weights';
        axios.post(url, catData)
            .then( () => {
                dispatch(submitWeightSuccess(catData));
                dispatch(actions.getWeights(catId));
            })
            .catch(err => {
                dispatch(submitWeightFail(err));
            });
    };
};

// ------ DELETE ------

export const deleteWeightsStart = () => {
    return {
        type: actionTypes.DELETE_WEIGHTS_START
    };
};

export const deleteWeightsSuccess = () => {
    return {
        type: actionTypes.DELETE_WEIGHTS_SUCCESS
    };
    
};

export const deleteWeightsFail = (error) => {
    return {
        type: actionTypes.DELETE_WEIGHTS_FAIL,
        error: error
    };
};

export const deleteWeights = (catId) => {
    return dispatch => {
        dispatch(deleteWeightsStart());
        const id = catId;
        let url = 'http://localhost:3001/api/v1/cat/' + id + '/weights';
        axios.delete(url)
            .then(response => {
                dispatch(deleteWeightsSuccess());
                dispatch(actions.getWeights(catId));
            })
            .catch(err => {
                dispatch(deleteWeightsFail(err));
            });
    };
};