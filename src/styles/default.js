import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  link: {
    color: 'red',
    '& a': {
      color: '#2b2b2b',
    },
    '& a:hover': {
      color: '#4c4c4c',
    },
    margin: theme.spacing(1, 0, 1),
  },
  paper: {
    backgroundColor: '#f8f4f3',
  },
  defaultAlign: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    backgroundColor: '#fff',
  },
  formControl: {
    margin: theme.spacing(2, 0, 0),
    width: '100%',
  },
  alignInput: {
    margin: theme.spacing(2, 0, 0),
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: 120,
    backgroundColor: "#fff",
    color: "#000",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    '&:hover': {
      backgroundColor: "#fbfbfb",
    },
  },
  textfield: {
    borderRadius: 50,
  },
  danger: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  gridDefault: {
    width: '100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default useStyles;
