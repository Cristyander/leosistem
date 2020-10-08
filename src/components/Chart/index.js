import { Grid } from '@material-ui/core';
import React, { useEffect, useState, forwardRef } from 'react';
import {Doughnut, Bar} from 'react-chartjs-2';

import {
  ContainerStatus, 
  BoxColorStatus, 
  ContainerItemStatus, 
  ContainerChart,
  TitleChart,
  BoxChart,
  ContainerStatusCollumn,
  ContainerItemStatusCollumn,
  ContainerDoughnut,
ContainerChartBar } from './styles';


export const Chart = (props) => {

  const { titleDoughnutChart,
          titleBarChart,
          dataDoughnut,
          status,
          dataBarChart,} = props;

  return (
    <>
      <ContainerChart>
        <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <BoxChart>
          <TitleChart>
            <b>{titleDoughnutChart}</b>
          </TitleChart>
          <ContainerStatusCollumn>
            <ContainerDoughnut>
              <Doughnut data={dataDoughnut} width={200} height={200} options={{legend: {display: false,}}}/>
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
            <b>{titleBarChart}</b>
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
          data={dataBarChart}
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
  );
}