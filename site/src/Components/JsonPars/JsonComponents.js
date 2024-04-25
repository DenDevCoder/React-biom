import React, { useEffect, useState } from 'react';
import Table from '../TableComponent/Table';

export default function JsonComponents() {
  const [rowsData, setRowsData] = useState([]);
  const [dataPars, setDataPars] = useState([]);

  const[dataArray, setDataArray] = useState([]);

  //Парсинг массива data из biom.json (*функция*)
  const getData = () => {
    fetch('/biom.json')
      .then(response => response.json())
      .then(data => setDataPars(data.data))//Сохранение результата в dataPars
      .catch(error => console.error(error));
  };

  //Парсинг массива rowa из biom.json (*функция*)
  const getDataRows = () => {
    fetch('/biom.json')
      .then(response => response.json())
      .then(data => setRowsData(data.rows))//Сохранение результата в rowsData
      .catch(error => console.error(error));
  };

  //Вызов функциий для парсинга необходимой информации
  useEffect(() => {
    getData();
    getDataRows();
  }, []);

  //Сохранение информации из dataPars в массив (*необязательно, просто для удобства*)
  useEffect(()=>{
      const mas = [];

      dataPars.forEach(item=>{
        const key1 = item[0];
        const key2 = item[1];
        const value = item[2];

        if(!mas[key1]){
          mas[key1] = [];
        }
        
        mas[key1][key2] = value;
      })

      setDataArray(mas)
  },[dataPars]);


  if (!rowsData || !dataPars) {
    return <div>Loading...</div>;
  }
  return (
      <div>
        {/* создание таблицы  из спаршенной информации */}
       {(rowsData).length > 0 && (dataArray).length>0 && <Table Data={dataArray} Rows={rowsData} />}
      </div>
  );
  }

