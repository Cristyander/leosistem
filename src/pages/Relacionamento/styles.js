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
  height: 200px;
  overflow-y: scroll;

  label {
    margin-left: 20px;
  }
`;

export const ItemPesquisa = styled.div`
  padding-left: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;
  
export const DadosPesquisa = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 0px 10px 10px 0px;
`;

export const ContainerForm = styled.div`
  margin-top: 5%;
  text-align: center;
  background-color: #fbfbfb;
  padding: 10%;
  border-radius: 40px;
`;
  
export const ContainerLabel = styled.div`

text-align: left;

label {
    font-size: 16px;
    text-align: left;
    font-weight: 700;
  }
`;

export const ContainerPrint = styled.div`
  @media print {
    .divToPrint {
        background-color: white;
        height: 1200px;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        margin: 0;
        padding: 15px;
        font-size: 14px;
        line-height: 18px;
    }
}
`;