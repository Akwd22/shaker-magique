import React, { useEffect, useMemo, useState } from "react";
import { apiDeleteIngredient } from "../../Axios/Axios";
import {
  DeleteButtonCell,
  EditButtonCell,
  ReactTable,
} from "../../Table/Table";
import "./AdminIngredientTable.css";

/**
 * Composant AdminIngredientTable
 * @param {*} param0 
 */
function AdminIngredientTable({ ingredients, search }) {
  //Colonne du tableau
  const columns = useMemo(
    () => [
      {
        Header: "Ingredients",
        accessor: "intitule",
      },
      { accessor: "edit", Cell: EditButtonCell },
      { accessor: "delete", Cell: DeleteButtonCell },
    ],
    []
  );

  const [data, setData] = useState(ingredients);

  useEffect(() => {
    setData(ingredients);
  }, [ingredients]);

  /**
   * Fonction appelé lorque l'on met à jour la table
   * @param {*} rowIndex 
   * @param {*} columnId 
   * @param {*} value 
   */
  const updateData = async (rowIndex, columnId, value) => {
    if (columnId === "delete") {
      if (await apiDeleteIngredient(data[rowIndex].id)) {
        setData((old) => {
          old.splice(rowIndex, 1);
          return [...old];
        });
      }
    }

    //Modifier un ingredient
    if (columnId === "edit") {
      window.location.href = `/admin/ingredients/modifier/${data[rowIndex].id}`;
    }
  };

  const [instance, setInstance] = React.useState(null);
  const getInstance = ({ setFilter }) => {
    setInstance({ setFilter });
  };

  if (instance) {
    instance.setFilter("intitule", search);
  }

  return (
    <div className="admin-ingredients-table">
      <ReactTable
        columns={columns}
        data={data}
        updateData={updateData}
        getInstance={getInstance}
        className="table"
      />
    </div>
  );
}

export default AdminIngredientTable;
