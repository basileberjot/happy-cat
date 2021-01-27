import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    name: null,
    birthdate: null,
    weight: null,
    breed: null,
    userId: null,
    catId: null,
    loading: false,
    error: false,
    editCat: false,
    hasCat: false,
    weights: null
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
    return updateObject(state, {error: null, loading: true });
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
        loading: false,
        editCat: false
    });
};

const editMyCatFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const getWeightsStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const getWeightsSuccess = (state, action) => {
    return updateObject(state, {
        weights: action.weights,
        error: null,
        loading: false
    });
};

const getWeightsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const getCatStart = (state, action) => {
    return updateObject(state, {error: null, loading: true });
};

const getCatSuccess = (state, action) => {
    return updateObject(state, {
        name: action.name,
        birthdate: action.birthdate,
        weight: action.weight,
        breed: action.breed,
        userId: action.userId,
        catId: action.catId,
        error: null,
        loading: false,
        hasCat: true
    });
};

const getCatFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const deleteCatStart = (state, action) => {
    return updateObject(state, {error: null, loading: true });
};

const deleteCatSuccess = (state, action) => {
    return updateObject(state, {
        name: '',
        birthdate: '',
        weight: '',
        breed: '',
        userId: '',
        catId: '',
        error: null,
        loading: false,
        hasCat: false
    });
};

const deleteCatFail = (state, action) => {
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
        case actionTypes.GET_WEIGHTS_START: return getWeightsStart(state, action);
        case actionTypes.GET_WEIGHTS_SUCCESS: return getWeightsSuccess(state, action);
        case actionTypes.GET_WEIGHTS_FAIL: return getWeightsFail(state, action);
        case actionTypes.GET_CAT_START: return getCatStart(state, action);
        case actionTypes.GET_CAT_SUCCESS: return getCatSuccess(state, action);
        case actionTypes.GET_CAT_FAIL: return getCatFail(state, action);
        case actionTypes.DELETE_CAT_START: return deleteCatStart(state, action);
        case actionTypes.DELETE_CAT_SUCCESS: return deleteCatSuccess(state, action);
        case actionTypes.DELETE_CAT_FAIL: return deleteCatFail(state, action);
        default: 
            return state;
    };
};

export default reducer;