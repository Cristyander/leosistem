import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { signInSucess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    // const response = yield call(api.post, 'sessions', {
    //   email,
    //   password,
    // });

    //response.status === 200
    if (true) {
      // const { token, user } = response.data;
      const {token, user} = {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTYwMjIxMDA1NX0.Pvy2U855PJycC8CJnfRtGJ1BZVqWtm9JumDoQJdQnzw",
        "user": {
          "username": "Cristy Anderson Pereira dos Santos",
          "email": "cristyander@hotmail.com",
          "avatar": {
            "id": null,
            "url": null
          }
        }
      };

      api.defaults.headers.Authorization = `Bearer ${token}`;

      yield put(signInSucess(token, user));

      history.push('/relacionamento');
    } else {
      toast.error(
        'Não foi possivel realizar login com seu email e senha, verifique seus dados.',
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );

      yield put(signFailure());
    }
  } catch (err) {
    toast.error(
      'Não foi possivel realizar login com seu email e senha, verifique seus dados.',
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const {
      username,
      celular,
      email,
      email_confirmation,
      password,
      password_confirmation,
    } = payload;

    yield call(api.post, 'users', {
      username,
      celular,
      email,
      email_confirmation,
      password,
      password_confirmation,
    });

    history.push('/');

    toast.success('Cadastro realizado com sucesso!', {
      position: toast.POSITION.TOP_CENTER,
    });
  } catch (err) {
    const errorResponse = err.response.data;

    errorResponse.map(item => {
      if (item.field === 'email' && item.validation === 'unique') {
        toast.error('Esse e-mail já esta cadastrado', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else if (item.field === 'email' && item.validation === 'confirmed') {
        toast.error('Os e-mail devem ser iguais.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      if (item.field === 'password' && item.validation === 'confirmed') {
        toast.error('As senhas devem ser iguais.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
