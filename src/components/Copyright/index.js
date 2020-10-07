import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  direitos: {
    fontWeight: 700,
    color: '#a3a3a3',
    margin: theme.spacing(1, 0, 1),
  },
}));

export default function Copyright() {
  const classes = useStyles();

  return (
    <Typography className={classes.direitos} variant="body2" align="center">
      Todos os direitos reservados - {new Date().getFullYear()}
    </Typography>
  );
}
