/*eslint-disable*/
import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import {ShowHierarchy}  from 'hierarchy'
import {DataSingleton}  from 'Singleton';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';

interface Property extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Property> = ({  data, height, width }) => {
  const styles = getStyles();
  const check = getData(data);
    console.log('data',data);
    return (
      <div className={cx(
        styles["panel-content"],css`
          width: auto;
          height: ${height}px;
        `)}>
       <ShowHierarchy data={check} ></ShowHierarchy>
       </div>
    );
};

const getStyles = stylesFactory(() => {
  return {
    'panel-content': css`
      overflow: scroll;
   `,
  };
});


const getData = ((data:any) => {
    DataSingleton.data = data;
    DataSingleton.reloadFlag = true;
    return data;
});