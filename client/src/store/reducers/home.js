import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    error: false,
    weights: null,
    hasSubmitWeight: false
};

const submitWeightStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const submitWeightSuccess = (state, action) => {
    return updateObject(state, {
        weights: action.weights,
        error: null,
        loading: false,
        hasSubmitWeight: true
    });
};

const submitWeightFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUBMIT_WEIGHT_START: return submitWeightStart(state, action);
        case actionTypes.SUBMIT_WEIGHT_SUCCESS: return submitWeightSuccess(state, action);
        case actionTypes.SUBMIT_WEIGHT_FAIL: return submitWeightFail(state, action);
        default: 
            return state;
    };
};

export default reducer;