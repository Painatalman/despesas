import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, REGISTER_USER } from '../actions/types.js'

export default function(state = {}, action) {
    switch(action.type) {
        case AUTH_USER:
          return { ...state, authenticated: true, error: null };
        case UNAUTH_USER:
          return { ...state, authenticated: false, error: null };
        case AUTH_ERROR:
          return { ...state, error: action.payload}
    }

    return state;
}
