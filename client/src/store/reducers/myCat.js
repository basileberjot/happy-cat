import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    name: null,
    birthdate: null,
    weight: null,
    breed: null,
    userId: null,
    catId: null,
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

const editMyCatStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const editMyCatSuccess = (state, action) => {
    return updateObject(state, {
        name: action.name,
        birthdate: action.birthdate,
        weight: action.weight,
        breed: action.breed,
        userId: action.userId,
        catId: action.catId,
        error: null,
        loading: false
    });
};

const editMyCatFail = (state, action) => {
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
        case actionTypes.EDIT_MY_CAT_START: return editMyCatStart(state, action);
        case actionTypes.EDIT_MY_CAT_SUCCESS: return editMyCatSuccess(state, action);
        case actionTypes.EDIT_MY_CAT_FAIL: return editMyCatFail(state, action);
        default: 
            return state;
    };
};

export default reducer;