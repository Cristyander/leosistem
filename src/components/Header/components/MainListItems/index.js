import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {
  PeopleAltOutlined,
  Domain,
  HeadsetRounded,
  Code,
  Settings
} from '@material-ui/icons/';

import { Container, Selecionado, Desselecionado } from './styles';

export const MainListItems = (
  <Container>
  <Selecionado>
    <Link to="/relacionamento">
      <ListItem button style={{borderRadius: (20, 0, 0, 20)}}>
        <ListItemIcon aria-setsize={22}>
          <PeopleAltOutlined />
        </ListItemIcon>
        <a>Relacionamento</a>
      </ListItem>
    </Link>
    </Selecionado>
    <Desselecionado>
    <Link to="/">
      <ListItem button style={{borderRadius: (20, 0, 0, 20)}}>
        <ListItemIcon>
          <Domain />
        </ListItemIcon>
        <a>Administrativo</a>
      </ListItem>
    </Link>
    </Desselecionado>
    <Desselecionado>
    <Link to="/">
      <ListItem button style={{borderRadius: (20, 0, 0, 20)}}>
        <ListItemIcon>
          <HeadsetRounded />
        </ListItemIcon>
        <a>Suporte</a>
      </ListItem>
    </Link>
    </Desselecionado>
    <Desselecionado>
    <Link to="/">
      <ListItem button style={{borderRadius: (20, 0, 0, 20)}}>
        <ListItemIcon>
          <Code />
        </ListItemIcon>
        <a>Desenvolvimento</a>
      </ListItem>
    </Link>
    </Desselecionado>
    <Desselecionado>
    <Link to="/">
      <ListItem button style={{borderRadius: (20, 0, 0, 20)}}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <a>Geral</a>
      </ListItem>
    </Link>
    </Desselecionado>
  </Container>
);

