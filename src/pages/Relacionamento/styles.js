import { Button } from '@material-ui/core';
import styled from 'styled-components';

export const OptionsRalacionamentos = styled.div`
  background-color: #fff;
  padding: 5px;
  text-align: right;
`;

export const ContainerStatus = styled.div`
  background: #fff;
  padding: 20px 20px 40px 20px;
  text-align: left;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const ContainerItemStatus = styled.div`
  background-color: #fff;
  float: left;
  margin-right: 5px;
`;

export const BoxColorStatus = styled.div`
  border-radius: 5px;
  width: 10px;
  height: 10px;
  padding: 10px;
  float: left;
  margin-right: 5px;
`;

export const ContainerModal = styled.div`
`;

export const HeaderModal = styled.div`
  flex: 1;
  flex-direction: row;
  padding: 0px 0px 10px 10px;
  background-color: #eee;
  justify-content: stretch;
`;

export const TitleModal = styled.b`
`;

export const CloseModal = styled(Button)`
`;

export const ContainerButtonsModal = styled.div`
  text-align: right;
  padding: 10px;
`;

export const ContainerBodyModal = styled.div`
  padding: 10px;

  label {
    margin-left: 20px;
  }
`;

export const ContainerPesquisas = styled.div`
  background-color: #eeee;
  padding: 10px;

  label {
    margin-left: 20px;
  }
`;

export const ItemPesquisa = styled.div`
  padding-left: 20px;
  border-radius: 10px;
`;
  
export const DadosPesquisa = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 0px 10px 10px 0px;
`;
  