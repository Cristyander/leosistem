import React, { useEffect, useState, forwardRef } from 'react';
import { Formik } from 'formik';

import Button from '@material-ui/core/Button';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';

import {
  BarChartSharp,
  PrintOutlined,
  DehazeOutlined,
  CloseOutlined,
  EditOutlined,
  AddRounded
} from '@material-ui/icons/';

import { Chart } from '../../components/Chart';

import { 
  OptionsRalacionamentos, 
  ContainerStatus, 
  BoxColorStatus, 
  ContainerItemStatus,
  HeaderModal,
  TitleModal,
  ContainerButtonsModal,
  ContainerBodyModal,
  ContainerPesquisas,
  ItemPesquisa,
  DadosPesquisa,
  ContainerLabel,
  ContainerPrint
 } from './styles';
import useStyles from '../../styles/default';

import api from '../../services/api';
import Modal from '../../components/Modal';
import { Grid, TextField } from '@material-ui/core';
import ScreenLoad from '../../components/ScreenLoad';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Relacionamento() {
  const classes = useStyles();

  const [relacionamentos, setRelacionamentos] = useState([]);
  const [status, setStatus] = useState([]);
  const [visualizaRelacionamentos, setVisualizaRelacionamentos] = useState(true);
  const [doughnutGeral, setDoughnutGeral] = useState({});
  const [barGeral, setBarGeral] = useState({});
  const [chartCarteiras, setChartCarteiras] = useState([]);
  const [modalClient, setModalClient] = useState('');
  const [alterarCadastro, setAlterarCadastro] = useState(false);
  const [addPesquisa, setAddPesquisa] = useState(false);

const colunasGrupos = [
    { 
      title: 'Classe', 
      field: 'classe', 
      cellStyle: (e, rowData) => { 
        switch (rowData.status) {
          case 'Satisfeito':
            return { background: '#51D4FD' }
          case 'Pendente':
            return { background: '#F8E007' }
          case 'Problema':
            return { background: '#FBAA1A' }
          case 'A cancelar':
            return { background: '#FF5768' }
          case 'Cancelado':
            return { background: '#BC9D67' }
          default: 
            return { background: '#fff' }
        }
      }
    },
    { 
      title: 'Nome', 
      field: 'nome', 
      cellStyle: (e, rowData) => { 
        switch (rowData.status) {
          case 'Satisfeito':
            return { background: '#51D4FD' }
          case 'Pendente':
            return { background: '#F8E007' }
          case 'Problema':
            return { background: '#FBAA1A' }
          case 'A cancelar':
            return { background: '#FF5768' }
          case 'Cancelado':
            return { background: '#BC9D67' }
          default: 
            return { background: '#fff' }
        } 
      }
    },
    { 
      title: 'Cidade', 
      field: 'cidade', 
      cellStyle: (e, rowData) => { 
        switch (rowData.status) {
          case 'Satisfeito':
            return { background: '#51D4FD' }
          case 'Pendente':
            return { background: '#F8E007' }
          case 'Problema':
            return { background: '#FBAA1A' }
          case 'A cancelar':
            return { background: '#FF5768' }
          case 'Cancelado':
            return { background: '#BC9D67' }
          default: 
            return { background: '#fff' }
        }  
      }
    },
    { 
      title: 'Estado', 
      field: 'estado', 
      cellStyle: (e, rowData) => { 
        switch (rowData.status) {
          case 'Satisfeito':
            return { background: '#51D4FD' }
          case 'Pendente':
            return { background: '#F8E007' }
          case 'Problema':
            return { background: '#FBAA1A' }
          case 'A cancelar':
            return { background: '#FF5768' }
          case 'Cancelado':
            return { background: '#BC9D67' }
          default: 
            return { background: '#fff' }
        }  
      }
    },
    { 
      title: 'Status', 
      field: 'status', 
      cellStyle: (e, rowData) => { 
        switch (rowData.status) {
          case 'Satisfeito':
            return { background: '#51D4FD' }
          case 'Pendente':
            return { background: '#F8E007' }
          case 'Problema':
            return { background: '#FBAA1A' }
          case 'A cancelar':
            return { background: '#FF5768' }
          case 'Cancelado':
            return { background: '#BC9D67' }
          default: 
            return { background: '#fff' }
        } 
      }
    },
    { 
      title: 'Pesquisa', 
      field: 'pesquisa', 
      cellStyle: (e, rowData) => { 
        switch (rowData.status) {
          case 'Satisfeito':
            return { minWidth: 600, background: '#51D4FD' }
          case 'Pendente':
            return { minWidth: 600, background: '#F8E007' }
          case 'Problema':
            return { minWidth: 600, background: '#FBAA1A' }
          case 'A cancelar':
            return { minWidth: 600, background: '#FF5768' }
          case 'Cancelado':
            return { minWidth: 600, background: '#BC9D67' }
          default: 
            return { minWidth: 600, background: '#fff' }
        }  
      }
    },
  ];

  async function loadGrupos() {
    try {
      const data = [
        {
          id: 1,
          classe: 'A1',
          nome: 'Mercadão Meneses',
          cidade: 'São Luis - Ma',
          estado: 'MA',
          status: 'Satisfeito',
          pesquisa: 'Gerente: Esse mês foi muito bom o atendimento. Realmente foi ...',
          cliente: {
            cnpj: '842.251.253-00032/014',
            telefone: '(62)9 9923-0142',
            proprietario: 'Natanael Menezes',
            gerente: 'Ribamar',
            funcionario: 'Joana Gabriel Aparecida',
          },
          pesquisas: [{
            status: 'Satisfeito',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          },
          {
            status: 'Pendências',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          },
          {
            status: 'A cancelar',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          }],
        },
        {
          id: 2,
          classe: 'A1',
          nome: 'Mercadão Menesessss',
          cidade: 'São Luis',
          estado: 'MA',
          status: 'Pendente',
          pesquisa: 'Gerente: Esse mês foi muito bom o atendimento. Realmente foi ...',
          parentId: 1,
          cliente: {
            cnpj: '842.251.253-00032/014',
            telefone: '(62)9 9923-0142',
            proprietario: 'Natanael Menezes',
            gerente: 'Ribamar',
            funcionario: 'Joana Gabriel Aparecida',
          },
          pesquisas: [{
            status: 'Satisfeito',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          },
          {
            status: 'Pendências',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          },
          {
            status: 'A cancelar',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          }],
        },
        {
          id: 3,
          classe: 'A1',
          nome: 'Mercadão Meneses',
          cidade: 'São Luis',
          estado: 'MA',
          status: 'Problema',
          pesquisa: 'Gerente: Esse mês foi muito bom o atendimento. Realmente foi ...',
          parentId: 1,
          cliente: {
            cnpj: '842.251.253-00032/014',
            telefone: '(62)9 9923-0142',
            proprietario: 'Natanael Menezes',
            gerente: 'Ribamar',
            funcionario: 'Joana Gabriel Aparecida',
          },
          pesquisas: [{
            status: 'Satisfeito',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          },
          {
            status: 'Pendências',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          },
          {
            status: 'A cancelar',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          }],
        },
        {
          id: 4,
          classe: 'A1',
          nome: 'Mercadão Meneses',
          cidade: 'São Luis',
          estado: 'MA',
          status: 'A cancelar',
          pesquisa: 'Gerente: Esse mês foi muito bom o atendimento. Realmente foi ...',
          cliente: {
            cnpj: '842.251.253-00032/014',
            telefone: '(62)9 9923-0142',
            proprietario: 'Natanael Menezes',
            gerente: 'Ribamar',
            funcionario: 'Joana Gabriel Aparecida',
          },
          pesquisas: [{
            status: 'Satisfeito',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          },
          {
            status: 'Pendências',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          },
          {
            status: 'A cancelar',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          }],
        },
        {
          id: 5,
          classe: 'A1',
          nome: 'Mercadão Meneses',
          cidade: 'São Luis',
          estado: 'MA',
          status: 'Satisfeito',
          pesquisa: 'Gerente: Esse mês foi muito bom o atendimento. Realmente foi ...',
          parentId: 4,
          cliente: {
            cnpj: '842.251.253-00032/014',
            telefone: '(62)9 9923-0142',
            proprietario: 'Natanael Menezes',
            gerente: 'Ribamar',
            funcionario: 'Joana Gabriel Aparecida',
          },
          pesquisas: [{
            status: 'Satisfeito',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          },
          {
            status: 'Pendências',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          },
          {
            status: 'A cancelar',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          }],
        },
        {
          id: 6,
          classe: 'A1',
          nome: 'Mercadão Meneses',
          cidade: 'São Luis',
          estado: 'MA',
          status: 'Cancelado',
          pesquisa: 'Gerente: Esse mês foi muito bom o atendimento. Realmente foi ...',
          parentId: 4,
          cliente: {
            cnpj: '842.251.253-00032/014',
            telefone: '(62)9 9923-0142',
            proprietario: 'Natanael Menezes',
            gerente: 'Ribamar',
            funcionario: 'Joana Gabriel Aparecida',
          },
          pesquisas: [{
            status: 'Satisfeito',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          },
          {
            status: 'Pendências',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          },
          {
            status: 'A cancelar',
            data: '03 de agosto de 2020',
            falou_com: 'Gerente Ribamar',
            pesquisa: 'Olha esse mês foi muito bom o atendimento.'
          }],
        }
      ];

      const dataStatus = [{
        id: 1,
        status: 'Satisfeito',
        total: 30,
      },
      {
        id: 1,
        status: 'Pendências',
        total: 30,
      },
      {
        id: 1,
        status: 'Problemas',
        total: 30,
      },
      {
        id: 1,
        status: 'A cancelar',
        total: 30,
      },
      {
        id: 1,
        status: 'Cancelados',
        total: 30,
      },
      {
        id: 1,
        status: 'Não pesquisados',
        total: 30,
      }];

      const dataDoughnutGeral = {
        labels: [
          'Satisfeito',
          'Pendências',
          'Problemas',
          'A cancelar',
          'Cancelados',
          'Não pesquisados'
        ],
        datasets: [{
          data: [300, 50, 100, 500, 210, 50],
          backgroundColor: [
          '#51D4FD',
          '#F8E007',
          '#FBAA1A',
          '#FF5768',
          '#BC9D67',
          '#eee'
          ],
        }]
      };

      const dataBarGeral = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: '',
            backgroundColor: '#51D4FD',
            borderColor: '#51D4FD',
            borderWidth: 1,
            hoverBackgroundColor: '#51D4FD',
            hoverBorderColor: '#51D4FD',
            data: [65, 59, 80, 81, 56, 55, 55, 87, 100, 58, 60, 80, 0]
          }
        ]
      };

      const dataChartCarteiras = [{
          carteira: 'Satisfação Carteira 1',
          dataDoughnutGeral: {
            labels: [
              'Satisfeito',
              'Pendências',
              'Problemas',
              'A cancelar',
              'Cancelados',
              'Não pesquisados'
            ],
            datasets: [{
              data: [300, 50, 100, 500, 210, 50],
              backgroundColor: [
              '#51D4FD',
              '#F8E007',
              '#FBAA1A',
              '#FF5768',
              '#BC9D67',
              '#eee'
              ],
            }]
          },
          dataBarGeral: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: '',
                backgroundColor: '#51D4FD',
                borderColor: '#51D4FD',
                borderWidth: 1,
                hoverBackgroundColor: '#51D4FD',
                hoverBorderColor: '#51D4FD',
                data: [65, 59, 80, 81, 56, 55, 55, 87, 100, 58, 60, 80, 0]
              }
            ]
          }
      }];

      setStatus(dataStatus);
      setRelacionamentos(data);
      setDoughnutGeral(dataDoughnutGeral);
      setBarGeral(dataBarGeral);
      setChartCarteiras(dataChartCarteiras);
    } catch (error) {
      toast.error(
        'Houve um erro ao carregar as informações. Tente novamente.',
        {
          position: 'top-center',
        }
      );
    }
  }

  function colorsStatus(status) {
    switch (status) {
      case 'Satisfeito':
        return '#51D4FD'
      case 'Pendências':
        return '#F8E007'
      case 'Problema':
        return '#FBAA1A'
      case 'A cancelar':
        return '#FF5768'
      case 'Cancelado':
        return '#BC9D67'
      default: 
        return '#fff'
    }
  }

  function handlePesquisa(values) {
    const dataPesquisa = values;
  }

  function handleAlterarCadastro(values) {
    const dataAlterarCadastro = values;
  }

  useEffect(() => {
    loadGrupos();
  }, []);

  const modalAddPesquisa = (
    <>
      {
        addPesquisa &&
        <Grid container style={{width: 600}}>
        <Grid item xs={12} md={12}>
        <HeaderModal>
        <Button
        onClick={() => setAddPesquisa(false)}
        style={{width: 0, marginLeft: '84%'}}
        variant="contained"
        color="primary"
        className={classes.submit}
        >
          <CloseOutlined />
        </Button>
        <br />
        <TitleModal>Adicionar Pesquisa em {modalClient.nome}</TitleModal>
        </HeaderModal>
        <ContainerBodyModal>
        <Formik
          initialValues={{ 
            data: '',
            mes: '',
            falou_com: '',
            pesquisa: '',
            }}
          onSubmit={values => {
            handlePesquisa(values);
          }}
        >
          {props => {
            const {
              values,
              handleChange,
              handleSubmit,
            } = props;
            return (
              <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <ContainerLabel>
                <label>
                  Data: *
                </label>
                </ContainerLabel>
                  <TextField
                    className="inputRounded"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    name="nome"
                    value={values.data}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                <ContainerLabel>
                  <label>
                    Mês: *
                  </label>
                  </ContainerLabel>
                  <TextField
                    className="inputRounded"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="mes"
                    name="mes"
                    value={values.mês}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                <ContainerLabel>
                <label>
                  Falou com: *
                </label>
                </ContainerLabel>
                  <TextField
                    className="inputRounded"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="falou_com"
                    name="falou_com"
                    value={values.falou_com}
                    onChange={handleChange}
                  />
                </Grid>
                </Grid>
                <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                <ContainerLabel>
                  <label>
                    Pesquisa: *
                  </label>
                  </ContainerLabel>
                  <TextField
                    className="inputRounded"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="pesquisa"
                    name="pesquisa"
                    value={values.pesquisa}
                    onChange={handleChange}
                  />
                </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Salvar
                </Button>
              </form>
            );
          }}
        </Formik>
        </ContainerBodyModal>
        </Grid>
      </Grid>
      }
    </>
  );

  const modalAlterarCadastro = (
    <>
      {
        alterarCadastro &&
        <Grid container style={{width: 600}}>
        <Grid item xs={12} md={12}>
        <HeaderModal>
        <Button
        onClick={() => setAlterarCadastro(false)}
        style={{width: 0, marginLeft: '84%'}}
        variant="contained"
        color="primary"
        className={classes.submit}
        >
          <CloseOutlined />
        </Button>
        <br />
        <TitleModal>{modalClient.nome}</TitleModal>
        </HeaderModal>
        <ContainerBodyModal>
        <Formik
          initialValues={{ 
            nome: modalClient.nome,
            classe: modalClient.classe,
            cidade: modalClient.cidade,
            estado: modalClient.estado,
            cnpj: modalClient.cliente.cnpj,
            telefone: modalClient.cliente.telefone,
            }}
          onSubmit={values => {
            handleAlterarCadastro(values);
          }}
        >
          {props => {
            const {
              values,
              handleChange,
              handleSubmit,
            } = props;
            return (
              <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <ContainerLabel>
                <label>
                  Nome: *
                </label>
                </ContainerLabel>
                  <TextField
                    className="inputRounded"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                <ContainerLabel>
                  <label>
                    Classe: *
                  </label>
                  </ContainerLabel>
                  <TextField
                    className="inputRounded"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="classe"
                    name="classe"
                    value={values.classe}
                    onChange={handleChange}
                  />
                </Grid>
                </Grid>
                <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                <ContainerLabel>
                <label>
                  Cidade: *
                </label>
                </ContainerLabel>
                  <TextField
                    className="inputRounded"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="cidade"
                    name="cidade"
                    value={values.cidade}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                <ContainerLabel>
                  <label>
                    Estado: *
                  </label>
                  </ContainerLabel>
                  <TextField
                    className="inputRounded"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="estado"
                    name="estado"
                    value={values.estado}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                <ContainerLabel>
                  <label>
                    Cnpj: *
                  </label>
                  </ContainerLabel>
                  <TextField
                    className="inputRounded"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="cnpj"
                    name="cnpj"
                    value={values.cnpj}
                    onChange={handleChange}
                  />
                </Grid>
                </Grid>
                <ContainerLabel>
                  <label>
                    Telefone:
                  </label>
                  </ContainerLabel>
                  <Grid container spacing={2}>
                <Grid item xs={6} md={5}>
                  <TextField
                    className="inputRounded"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="telefone"
                    name="telefone"
                    value={values.telefone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} md={5}>
                  <TextField
                    className="inputRounded"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="telefone"
                    name="telefone"
                    value={values.telefone}
                    onChange={handleChange}
                  />
                </Grid>
                </Grid>
                <Grid container spacing={2}>
                <Grid item xs={6} md={5}>
                  <TextField
                    className="inputRounded"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="telefone"
                    name="telefone"
                    value={values.telefone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} md={5}>
                  <TextField
                    className="inputRounded"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="telefone"
                    name="telefone"
                    value={values.telefone}
                    onChange={handleChange}
                  />
                </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Salvar
                </Button>
              </form>
            );
          }}
        </Formik>
        </ContainerBodyModal>
        </Grid>
      </Grid>
      }
    </>
  );

  const modalRelacionamento = (
    <>
      {modalClient !== '' && 
        <Grid container style={{width: 600}}>
        <Grid item xs={12} md={12}>
        <HeaderModal>
        <Button
        onClick={() => setModalClient('')}
        style={{width: 0, marginLeft: '84%'}}
        variant="contained"
        color="primary"
        className={classes.submit}
        >
          <CloseOutlined />
        </Button>
      <br />
        <TitleModal>{modalClient.nome}</TitleModal>
        </HeaderModal>
        <ContainerButtonsModal>
        <Button
        onClick={() => setAlterarCadastro(true)}
        style={{width: 200, marginRight: 10}}
        variant="contained"
        color="primary"
        className={classes.submit}
        >
          <EditOutlined />
          Alterar Cadastro
        </Button>
        <Button
        onClick={() => setAddPesquisa(true)}
        style={{width: 100 }}
        variant="contained"
        color="primary"
        className={classes.submit}
        >
          <AddRounded />
          Pesquisa
        </Button>
        </ContainerButtonsModal>
        <ContainerBodyModal>
          <label>Nome</label>: <b>{modalClient.nome}</b>
          <label>Classe</label>: <b>{modalClient.classe}</b>
          <br />
          <label>Cidade/Estado</label>: <b>{modalClient.cidade}</b>
          <label>CNPJ</label>: <b>{modalClient.cliente.cnpj}</b>
          <br />
          <label>Telefone</label>: <b>{modalClient.cliente.telefone}</b>
          <br />
          <label>Proprietário</label>: <b>{modalClient.cliente.proprietario}</b>
          <br />
          <label>Gerente(s)</label>: <b>{modalClient.cliente.gerente}</b>
          <label>Funcionario(s)</label>: <b>{modalClient.cliente.funcionario}</b>
          <br />
          <label>Status</label>: <b>{modalClient.status}</b>
        </ContainerBodyModal>
        <ContainerPesquisas>
        {modalClient.pesquisas !== undefined && modalClient.pesquisas.map((item) => {
          return (
            <>
            <ItemPesquisa style={{backgroundColor: colorsStatus(item.status)}}>
              <DadosPesquisa>
                <label>Status</label>: <b>{item.status}</b>
                <label>Data</label>: <b>{item.data}</b>
                <br />
                <label>Falou com</label>: <b>{item.falou_com}</b>
                <br />
                <label>Pesquisa</label>
                <br />
                <label><b>{item.pesquisa}</b></label>
              </DadosPesquisa>
            </ItemPesquisa>
            </>
          );
        })}
        </ContainerPesquisas>
        </Grid>
      </Grid>}
    </>
  );

  return (
    <>
    {
      addPesquisa &&
      <Modal open={true} body={modalAddPesquisa} />
    }
    {
      modalClient !== '' &&
      <Modal open={true} body={modalRelacionamento} />
    }
    {
      alterarCadastro &&
      <Modal open={true} body={modalAlterarCadastro} />
    }
    <OptionsRalacionamentos>
      <Button
        onClick={() => window.print()}
        style={{width: 280, marginRight: 20}}
        variant="contained"
        color="primary"
        className={classes.submit}
      >
      <PrintOutlined />
        Imprimir relatórios
      </Button>
      {visualizaRelacionamentos && <Button
        onClick={() => setVisualizaRelacionamentos(!visualizaRelacionamentos)}
        style={{width: 60}}
        variant="contained"
        color="primary"
        className={classes.submit}
      >
      <BarChartSharp />
      </Button> || <Button
        onClick={() => setVisualizaRelacionamentos(!visualizaRelacionamentos)}
        style={{width: 60}}
        variant="contained"
        color="primary"
        className={classes.submit}
      >
      <DehazeOutlined />
      </Button>}
      </OptionsRalacionamentos>
    {visualizaRelacionamentos && 
    <>
      <MaterialTable
        title="Grupos"
        columns={colunasGrupos}
        data={relacionamentos}
        icons={tableIcons}
        parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
        onRowClick={(_, cliente) => setModalClient(cliente)}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: 'first',
          search: false,
          columnsButton: false,
          toolbar: false,
          defaultExpanded: true
        }}
      />
          <ContainerStatus>
          {status.map(item => {
                switch (item.status) {
                  case 'Satisfeito':
                    return (
                      <>
                      <ContainerItemStatus>
                        <BoxColorStatus style={{background: '#51D4FD' }} />
                        <a>{item.status}: </a>
                        <b>{item.total}%</b>
                      </ContainerItemStatus>
                      </>
                      )
                  case 'Pendências':
                    return (
                      <>
                      <ContainerItemStatus>
                        <BoxColorStatus style={{background: '#F8E007' }} />
                        <a>{item.status}: </a>
                        <b>{item.total}%</b>
                      </ContainerItemStatus>
                      </>
                      )
                  case 'Problemas':
                    return (
                      <>
                      <ContainerItemStatus>
                        <BoxColorStatus style={{background: '#FBAA1A' }} />
                        <a>{item.status}: </a>
                        <b>{item.total}%</b>
                      </ContainerItemStatus>
                      </>
                      )
                  case 'A cancelar':
                    return (
                      <>
                      <ContainerItemStatus>
                        <BoxColorStatus style={{background: '#FF5768' }} />
                        <a>{item.status}: </a>
                        <b>{item.total}%</b>
                      </ContainerItemStatus>
                      </>
                      )
                  case 'Cancelados':
                    return (
                      <>
                      <ContainerItemStatus>
                        <BoxColorStatus style={{background: '#BC9D67' }} />
                        <a>{item.status}: </a>
                        <b>{item.total}%</b>
                      </ContainerItemStatus>
                      </>
                      )
                  case 'Não pesquisados':
                    return (
                      <>
                      <ContainerItemStatus>
                        <BoxColorStatus style={{background: '#eee' }} />
                        <a>{item.status}: </a>
                        <b>{item.total}%</b>
                      </ContainerItemStatus>
                      </>
                      )
                  default: 
                    return (
                      <>
                        <ContainerItemStatus>
                        <BoxColorStatus style={{background: '#fdfdfd' }} />
                        <a>{item.status}: </a>
                        <a>{item.total}%</a>
                      </ContainerItemStatus>
                      </>
                        )
                }
              }
          )}
        </ContainerStatus>
        </>
        ||
        <>
        <ContainerPrint>
        <div class="divToPrint">
        <Chart titleDoughnutChart="Satisfação Geral" titleBarChart="Comparativo satisfação geral" dataDoughnut={doughnutGeral} status={status} dataBarChart={barGeral}/>
        {chartCarteiras.map((item) => {
          return (
            <>
            <Chart titleDoughnutChart={`Satisfação ${item.carteira}`} titleBarChart={`Comparativo satisfação ${item.carteira}`} dataDoughnut={item.dataDoughnutGeral} status={status} dataBarChart={item.dataBarGeral}/>
            </>
          )
        })}
        </div>
        </ContainerPrint>
      </>
      }
    </>
  );
}