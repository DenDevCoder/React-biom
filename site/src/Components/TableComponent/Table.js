import React, { useState } from 'react';
import style from "./Table.module.css";

export default function Table({ Data, Rows }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  //фильтрация исходной информации по title *имени*
  const filteredData = Rows.filter((item) =>
    item.metadata.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //поиск оригинального индекса Row (*до фильтрации*)
  const originalIndex = (index)=>{
    const filterRow = filteredData[index];
    const originalIndex = Rows.findIndex((row)=>row===filterRow);
    return originalIndex;
  };

  // обработчик клика по строке
  const handleRowClick = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };


  return (
    <>
      <input
        className={style.input}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name"
      />

      {/* создание заголовков таблицы */}
      <table className={style.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tax ID</th>
            <th>Abundance score</th>
            <th>Relative abundance</th>
            <th>Unique matches frequency</th>
          </tr>
        </thead>

        {/* тело таблицы */}
        <tbody>
          {filteredData.map((item, index) =>{
            const originalId = originalIndex(index)
          return(
            <React.Fragment key={index}>
              <tr
                onClick={() => handleRowClick(originalId)}
                className={selectedRow === originalId ? style["selected-row"] : ""}
              >
                <td>{item.metadata.title}</td>
                <td>{item.metadata.tax_id}</td>
                <td>{Data[originalId][1]}</td>
                <td>
                  {/* проверка числа на <0.01 */}
                  {parseFloat((Data[originalId][0] * 100).toPrecision(4)) < 0.01
                    ? '<0.01%'
                    : (Data[originalId][0] * 100).toFixed(2) + "%"}
                </td>
                <td>{Data[originalId][2]}</td>
              </tr>
              {/* отображение lineage бактерии при клике по строке */}
              {selectedRow === originalId && (
                <tr>
                  <td colSpan="5">{Rows[originalId].metadata.taxonomy.join('  -->  ')}</td>
                </tr>
              )}
            </React.Fragment>
          )})}
        </tbody>
      </table>
    </>
  );
}