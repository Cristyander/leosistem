import styled from 'styled-components';

export const Container = styled.div``;

export const Selecionado = styled.div`
    padding: 10px;
    width: 96%;
    background: #fff;
    margin-left: 4%;
    border-radius: 50px 0 0 50px;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);

a {
  color: #000;
  font-size: 16px;
  font-weight: 700;
  border-radius: 50px 0 0 50px;
}

`;

export const Desselecionado = styled.div`
    width: 96%;
    margin: 4% 2% 0% 2%;
    border-radius: 50px 0 0 50px;

  a {
    color: #7e7e7e;
    font-size: 16px;
    font-weight: 700;
    border-radius: 50px 0 0 50px;
  }
`;

export const ItemMenu = styled.label`
  color: #000;
  font-size: 16px;
  font-weight: 700;
  border-radius: 50px 0 0 50px;
`;