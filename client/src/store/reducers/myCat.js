import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    name: null,
    birthdate: null,
    weight: null,
    breed: null,
    userId: null,
    loading: false
};

const registerMyCatStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const registerMyCatSuccess = (state, action) => {
    return updateObject(state, {
        name: action.name,
        birthdate: action.birthdate,
        weight: action.weight,
        breed: action.breed,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const registerMyCatFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_MY_CAT_START: return registerMyCatStart(state, action);
        case actionTypes.REGISTER_MY_CAT_SUCCESS: return registerMyCatSuccess(state, action);
        case actionTypes.REGISTER_MY_CAT_FAIL: return registerMyCatFail(state, action);
        default: 
            return state;
    };
};

export default reducer;