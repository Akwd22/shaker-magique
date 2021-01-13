import React, { useEffect, useMemo, useState } from "react";
import { apiDeleteCocktailsProposer, apiGetCocktailsProposer, apiGetCocktailsProposer2 } from "../../Axios/Axios";
import { boolSortType, CheckboxCell, ReactTable } from "../../Table/Table";
import "./HostCocktailPageTable.css";

/**
 * Composant HostCocktailPageTable
 * @param {*} param0 
 */
export default function HostCocktailPageTable({ cocktails, search }) {
  /**
   * Colonne de la table
   */
  const columns = useMemo(
    () => [
      {
        Header: "Cocktail",
        accessor: "intitule",
      },
      {
        Header: "Proposer",
        accessor: "proposer",
        Cell: CheckboxCell,
        sortType: boolSortType,
      },
    ],
    []
  );

  // Variables d'étas
  const [data, setData] = useState(cocktails);
  const [instance, setInstance] = useState(null);

  // Fonction appelé lors de la mise à jour de la table
  const updateData = (rowIndex, columnId, value) => {
    if(columnId === "proposer"){
      if(value){
        apiGetCocktailsProposer2(data[rowIndex].id);
      }else{
        apiDeleteCocktailsProposer(data[rowIndex].id);
      }
    }

    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const getInstance = ({ setFilter }) => {
    setInstance({ setFilter });
  };

  if (instance) {
    instance.setFilter("intitule", search);
  }

  useEffect(() => {
    console.dir(data);
    setData(cocktails);
  }, [cocktails]);

  return (
    <div className="host-cocktails-table">
      <ReactTable
        columns={columns}
        data={data}
        updateData={updateData}
        getInstance={getInstance}
        initialState={{
          sortBy: [{ id: "proposer", desc: false }],
        }}
        className="table"
      />
    </div>
  );
}
