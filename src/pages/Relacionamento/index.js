import React, { useEffect, useState, forwardRef } from 'react';
import {Doughnut, Bar} from 'react-chartjs-2';

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
  DehazeOutlined
} from '@material-ui/icons/';

import { 
  OptionsRalacionamentos, 
  ContainerStatus, 
  BoxColorStatus, 
  ContainerItemStatus, 
  ContainerChart,
  TitleChart,
  BoxChart,
  ContainerStatusCollumn,
  ContainerItemStatusCollumn,
  ContainerDoughnut,
  PercentDoughnut,
ContainerChartBar } from './styles';
import useStyles from '../../styles/default';

import api from '../../services/api';
import Modal from '../../components/Modal';
import { Grid, Paper } from '@material-ui/core';

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
  const [visualizaRelacionamentos, setVisualizaRelacionamentos] = useState(false);
  const [doughnutGeral, setDoughnutGeral] = useState({});
  const [barGeral, setBarGeral] = useState({});
  const [chartCarteiras, setChartCarteiras] = useState([]);

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
          cidade: 'São Luis',
          estado: 'MA',
          status: 'Satisfeito',
          pesquisa: 'Gerente: Esse mês foi muito bom o atendimento. Realmente foi ...',
        },
        {
          id: 2,
          classe: 'A1',
          nome: 'Mercadão Meneses',
          cidade: 'São Luis',
          estado: 'MA',
          status: 'Pendente',
          pesquisa: 'Gerente: Esse mês foi muito bom o atendimento. Realmente foi ...',
          parentId: 1,
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
        },
        {
          id: 4,
          classe: 'A1',
          nome: 'Mercadão Meneses',
          cidade: 'São Luis',
          estado: 'MA',
          status: 'A cancelar',
          pesquisa: 'Gerente: Esse mês foi muito bom o atendimento. Realmente foi ...',
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
          carteira: 'Carteira 1',
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

  useEffect(() => {
    loadGrupos();
  }, []);

  function modalRelacionamento() {
    return (
      <Modal open={true} body="oi" />
    );
  }

  return (
    <>
    <OptionsRalacionamentos>
      <Button
        onClick={() => {}}
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
        <ContainerChart>
        <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <BoxChart>
          <TitleChart>
            <b>Satisfação Geral</b>
          </TitleChart>
          <ContainerStatusCollumn>
            <ContainerDoughnut>
              <Doughnut data={doughnutGeral} width={200} height={200} options={{legend: {display: false,}}}/>
            </ContainerDoughnut>
            {status.map(item => {
                switch (item.status) {
                  case 'Satisfeito':
                    return (
                      <>
                      <ContainerItemStatusCollumn>
                        <BoxColorStatus style={{background: '#51D4FD' }} />
                        <a>{item.status}: </a>
                        <b>{item.total}%</b>
                      </ContainerItemStatusCollumn>
                      </>
                      )
                  case 'Pendências':
                    return (
                      <>
                      <ContainerItemStatusCollumn>
                        <BoxColorStatus style={{background: '#F8E007' }} />
                        <a>{item.status}: </a>
                        <b>{item.total}%</b>
                      </ContainerItemStatusCollumn>
                      </>
                      )
                  case 'Problemas':
                    return (
                      <>
                      <ContainerItemStatusCollumn>
                        <BoxColorStatus style={{background: '#FBAA1A' }} />
                        <a>{item.status}: </a>
                        <b>{item.total}%</b>
                      </ContainerItemStatusCollumn>
                      </>
                      )
                  case 'A cancelar':
                    return (
                      <>
                      <ContainerItemStatusCollumn>
                        <BoxColorStatus style={{background: '#FF5768' }} />
                        <a>{item.status}: </a>
                        <b>{item.total}%</b>
                      </ContainerItemStatusCollumn>
                      </>
                      )
                  case 'Cancelados':
                    return (
                      <>
                      <ContainerItemStatusCollumn>
                        <BoxColorStatus style={{background: '#BC9D67' }} />
                        <a>{item.status}: </a>
                        <b>{item.total}%</b>
                      </ContainerItemStatusCollumn>
                      </>
                      )
                  case 'Não pesquisados':
                    return (
                      <>
                      <ContainerItemStatusCollumn>
                        <BoxColorStatus style={{background: '#eee' }} />
                        <a>{item.status}: </a>
                        <b>{item.total}%</b>
                      </ContainerItemStatusCollumn>
                      </>
                      )
                  default: 
                    return (
                      <>
                        <ContainerItemStatusCollumn>
                        <BoxColorStatus style={{background: '#fdfdfd' }} />
                        <a>{item.status}: </a>
                        <a>{item.total}%</a>
                      </ContainerItemStatusCollumn>
                      </>
                        )
                }
              }
          )}
          </ContainerStatusCollumn>   
          </BoxChart>
        </Grid>
        <Grid item xs={12} md={8}>
          <BoxChart>
          <TitleChart>
            <b>Comparativo satisfação geral</b>
          </TitleChart>
          <ContainerStatus>
          <ContainerItemStatus>
            <BoxColorStatus style={{background: '#51D4FD' }} />
            <a>Satisfeitos</a>
          </ContainerItemStatus>
          <ContainerItemStatus>
            <BoxColorStatus style={{background: '#F8E007' }} />
            <a>Pendências</a>
          </ContainerItemStatus>
          <ContainerItemStatus>
            <BoxColorStatus style={{background: '#FBAA1A' }} />
            <a>Problemas</a>
          </ContainerItemStatus>
          <ContainerItemStatus>
            <BoxColorStatus style={{background: '#FF5768' }} />
            <a>A cancelar</a>
          </ContainerItemStatus>
          <ContainerItemStatus>
            <BoxColorStatus style={{background: '#BC9D67' }} />
            <a>Cancelados</a>
          </ContainerItemStatus>
          </ContainerStatus>
          <ContainerChartBar>
          <Bar
          data={barGeral}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: false,
            legend: { display: false }
          }}
        />
        </ContainerChartBar>
          </BoxChart>
        </Grid>
      </Grid>
      </ContainerChart>
      {chartCarteiras.map((item) => {
        return (
          <>
            <ContainerChart>
              <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <BoxChart>
                <TitleChart>
                  <b>Satisfação Geral</b>
                </TitleChart>
                <ContainerStatusCollumn>
                  <ContainerDoughnut>
                    <Doughnut data={doughnutGeral} width={200} height={200} options={{legend: {display: false,}}}/>
                  </ContainerDoughnut>
                  {status.map(item => {
                      switch (item.status) {
                        case 'Satisfeito':
                          return (
                            <>
                            <ContainerItemStatusCollumn>
                              <BoxColorStatus style={{background: '#51D4FD' }} />
                              <a>{item.status}: </a>
                              <b>{item.total}%</b>
                            </ContainerItemStatusCollumn>
                            </>
                            )
                        case 'Pendências':
                          return (
                            <>
                            <ContainerItemStatusCollumn>
                              <BoxColorStatus style={{background: '#F8E007' }} />
                              <a>{item.status}: </a>
                              <b>{item.total}%</b>
                            </ContainerItemStatusCollumn>
                            </>
                            )
                        case 'Problemas':
                          return (
                            <>
                            <ContainerItemStatusCollumn>
                              <BoxColorStatus style={{background: '#FBAA1A' }} />
                              <a>{item.status}: </a>
                              <b>{item.total}%</b>
                            </ContainerItemStatusCollumn>
                            </>
                            )
                        case 'A cancelar':
                          return (
                            <>
                            <ContainerItemStatusCollumn>
                              <BoxColorStatus style={{background: '#FF5768' }} />
                              <a>{item.status}: </a>
                              <b>{item.total}%</b>
                            </ContainerItemStatusCollumn>
                            </>
                            )
                        case 'Cancelados':
                          return (
                            <>
                            <ContainerItemStatusCollumn>
                              <BoxColorStatus style={{background: '#BC9D67' }} />
                              <a>{item.status}: </a>
                              <b>{item.total}%</b>
                            </ContainerItemStatusCollumn>
                            </>
                            )
                        case 'Não pesquisados':
                          return (
                            <>
                            <ContainerItemStatusCollumn>
                              <BoxColorStatus style={{background: '#eee' }} />
                              <a>{item.status}: </a>
                              <b>{item.total}%</b>
                            </ContainerItemStatusCollumn>
                            </>
                            )
                        default: 
                          return (
                            <>
                              <ContainerItemStatusCollumn>
                              <BoxColorStatus style={{background: '#fdfdfd' }} />
                              <a>{item.status}: </a>
                              <a>{item.total}%</a>
                            </ContainerItemStatusCollumn>
                            </>
                              )
                      }
                    }
                )}
                </ContainerStatusCollumn>   
                </BoxChart>
              </Grid>
              <Grid item xs={12} md={8}>
                <BoxChart>
                <TitleChart>
                  <b>Comparativo satisfação geral</b>
                </TitleChart>
                <ContainerStatus>
                <ContainerItemStatus>
                  <BoxColorStatus style={{background: '#51D4FD' }} />
                  <a>Satisfeitos</a>
                </ContainerItemStatus>
                <ContainerItemStatus>
                  <BoxColorStatus style={{background: '#F8E007' }} />
                  <a>Pendências</a>
                </ContainerItemStatus>
                <ContainerItemStatus>
                  <BoxColorStatus style={{background: '#FBAA1A' }} />
                  <a>Problemas</a>
                </ContainerItemStatus>
                <ContainerItemStatus>
                  <BoxColorStatus style={{background: '#FF5768' }} />
                  <a>A cancelar</a>
                </ContainerItemStatus>
                <ContainerItemStatus>
                  <BoxColorStatus style={{background: '#BC9D67' }} />
                  <a>Cancelados</a>
                </ContainerItemStatus>
                </ContainerStatus>
                <ContainerChartBar>
                <Bar
                data={barGeral}
                width={100}
                height={50}
                options={{
                  maintainAspectRatio: false,
                  legend: { display: false }
                }}
              />
              </ContainerChartBar>
                </BoxChart>
              </Grid>
            </Grid>
            </ContainerChart>
          </>
        )
      })}
      </>
      }
    </>
  );
}