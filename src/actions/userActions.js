import userApi from '../helpers/api/userApi';
import { LOGIN, CHECK_SESSION, LOGOUT, USER_LOADING, ERROR_LOGIN, ERROR_SIGNUP } from '../helpers/types';

export const singUp = (form, props) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOADING });
    const response = await userApi.signUp(form);
    localStorage.setItem('token', response.headers.authorization);
    dispatch({ type: LOGIN, payload: response.data });
    props.history.push('/');
  }catch (error) {
    if (error.response) {
      dispatch({ type: ERROR_SIGNUP, payload: error.response.data.data });
    } else {
      dispatch({ type: ERROR_SIGNUP, payload: error });
    }
  }
}

export const login = (form, props) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOADING });
    const response = await userApi.login(form);
    localStorage.setItem('token', response.headers.authorization);
    dispatch({ type: LOGIN, payload: response.data });
    props.history.push('/');
  }catch (error) {
    dispatch({ type: ERROR_LOGIN, payload: 'Usuario o contraseña incorrectos' });
  }
}

export const checkSession = () => async (dispatch) => {
  if ( localStorage.token ) {
    try {
      dispatch({ type: USER_LOADING });
      const response = await userApi.checkSession();
      dispatch({ type: CHECK_SESSION, payload: response.data });
    }catch (error) {
      // localStorage.removeItem('token');
      // localStorage.setItem('logged', false);
      if (error.response) {
        dispatch({ type: ERROR_LOGIN, payload: error.response.data.data });
      } else {
        dispatch({ type: ERROR_LOGIN, payload: error });
      }
    }
  }
}

export const logOut = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  localStorage.removeItem('token');
  localStorage.setItem('logged', false);
  dispatch({ type: LOGOUT });
}
