import * as TYPES from '../action-types';
import {validate, register, login} from '../../api/profile';
import {push} from 'connected-react-router';
import {LoginPayload, LoginResult} from '@/types/state'
import {message} from 'antd'

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
    },
    login(values: LoginPayload) {
        return function (dispatch: any) {
            (async function () {
                try {
                    let result: LoginResult = await login<LoginResult>(values);
                    if (result.success) { 
                        sessionStorage.setItem('access_token', result.data.token);
                        dispatch(push('/profile'));
                    } else {
                        message.error(result.message);
                    }
                } catch (error) {
                    message.error('登录失败');
                }
            })();
        }
    },
};
