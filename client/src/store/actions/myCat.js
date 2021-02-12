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

export const register = (name, birthdate, breed, userId, image) => {
    return dispatch => {
        dispatch(registerMyCatStart());

        const catData = new FormData();
        catData.append('name', name);
        catData.append('birthdate', birthdate);
        catData.append('breed', breed);
        catData.append('user_id', userId);
        catData.append('image', image);

        let url = 'http://localhost:3001/api/v1/cats';
        axios.post(url, catData)
            .then( () => {
                dispatch(registerMyCatSuccess(catData));
                dispatch(getCats(userId));
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
        breed: catData.breed,
        userId: catData.user_id,
        catId: catData.catId
    };
};

export const editMyCatFail = (error) => {
    return {
        type: actionTypes.EDIT_MY_CAT_FAIL,
        error: error
    };
};

export const edit = (name, birthdate, breed, userId, catId, image) => {
    return dispatch => {
        dispatch(editMyCatStart());
        const id = catId

        const catData = new FormData();
        catData.append('name', name);
        catData.append('birthdate', birthdate);
        catData.append('breed', breed);
        catData.append('user_id', userId);
        catData.append('catId', id);
        catData.append('image', image);

        let url = 'http://localhost:3001/api/v1/cats/' + id;
        axios.put(url, catData)
            .then( () => {
                dispatch(editMyCatSuccess(catData));
                dispatch(getCats(userId));
            })
            .catch(err => {
                dispatch(editMyCatFail(err));
            });
    };
};

// ------ GET WEIGHTS ------

export const getWeightsStart = () => {
    return {
        type: actionTypes.GET_WEIGHTS_START
    };
};

export const getWeightsSuccess = (weights) => {
    return {
        type: actionTypes.GET_WEIGHTS_SUCCESS,
        weights: weights
    };
    
};

export const getWeightsFail = (error) => {
    return {
        type: actionTypes.GET_WEIGHTS_FAIL,
        error: error
    };
};

export const getWeights = (catId) => {
    return dispatch => {
        dispatch(getWeightsStart());
        let url = 'http://localhost:3001/api/v1/cat/' + catId + '/weights';
        axios.get(url)
            .then(response => {
                dispatch(getWeightsSuccess(response.data));
            })
            .catch(err => {
                dispatch(getWeightsFail(err));
            });
    };
};

// ------ DELETE ------

export const deleteMyCatStart = () => {
    return {
        type: actionTypes.DELETE_CAT_START
    };
};

export const deleteMyCatSuccess = () => {
    return {
        type: actionTypes.DELETE_CAT_SUCCESS
    };
    
};

export const deleteMyCatFail = (error) => {
    return {
        type: actionTypes.DELETE_CAT_FAIL,
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

// ------ GET CATS ------

export const getCatStart = () => {
    return {
        type: actionTypes.GET_CAT_START
    };
};

export const getCatSuccess = (catData) => {
    return {
        type: actionTypes.GET_CAT_SUCCESS,
        cats: catData,
        name: catData.name,
        birthdate: catData.birthdate,
        breed: catData.breed,
        userId: catData.user_id,
        catId: catData.id,
        image: catData.image,
        hasCat: true
    };
};

export const getCatFail = (error) => {
    return {
        type: actionTypes.GET_CAT_FAIL,
        error: error
    };
};

export const getCats = (userId) => {
    return dispatch => {        
        dispatch(getCatStart());
        let catData = null;
        let url = 'http://localhost:3001/api/v1/user/' + userId + '/cats';
        axios.get(url)
            .then(response => {
                catData = (response.data);
                if (catData.length !== 0) {
                    console.log(response.data);
                    dispatch(getCatSuccess(catData));
                    dispatch(getWeights(catData.id));
                } else {
                    dispatch(getCatFail());
                }
            })
            .catch(err => {
                dispatch(getCatFail(err));
            });
    }
}

