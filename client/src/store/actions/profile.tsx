import * as TYPES from '../action-types';
import {validate} from '@/api/profile';
import {push} from 'connected-react-router';
export default {
    validate() {
        return {
            type: TYPES.VALIDATE,
            payload: validate()
        }
    },
    logout() {
       return function(dispatch: any) {
           sessionStorage.removeItem('access-token');
           dispatch(push('/login'))
       }
    }
};
