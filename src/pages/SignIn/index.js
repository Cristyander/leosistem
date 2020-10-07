import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Copyright from '../../components/Copyright';
import useStyles from '../../styles/default';

import { signInRequest } from '../../store/modules/auth/actions';

import {ContainerForm, ContainerLabel} from './styles';

import logo from '../../assets/logo.png';
import { Grid } from '@material-ui/core';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido.')
    .required('Insira um e-mail.'),
  password: Yup.string()
    .min(6, 'A senha precisa ter no minimo 6 caracteres.')
    .required('Insira sua senha.'),
});

export default function SignIn() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} width={275}/>
        <ContainerForm>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => {
            handleSubmit(values);
          }}
          validationSchema={schema}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <ContainerLabel>
              <label>
                Id ou e-mail: *
              </label>
              </ContainerLabel>
                <TextField
                  className="inputRounded"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  autoComplete="email"
                  autoFocus
                  error={errors.email}
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  helperText={errors.email}
                />
                <ContainerLabel>
                <label>
                Senha: *
              </label>
              </ContainerLabel>
                <TextField
                  className="inputRounded"
                  variant="outlined"
                  required
                  margin="normal"
                  fullWidth
                  type="password"
                  id="password"
                  error={errors.password && touched.password}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                />
                <Button
                  type="submit"
                  disabled={loading}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Entrar
                </Button>
              </form>
            );
          }}
        </Formik>
        </ContainerForm>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
