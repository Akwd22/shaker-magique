import React, { useEffect, useMemo, useState } from "react";
import { apiDeleteIngredient } from "../../Axios/Axios";
import {
  DeleteButtonCell,
  EditButtonCell,
  ReactTable,
} from "../../Table/Table";
import "./AdminIngredientTable.css";

function AdminIngredientTable({ ingredients, search }) {
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

  const updateData = async (rowIndex, columnId, value) => {
    if (columnId === "delete") {
      if (await apiDeleteIngredient(data[rowIndex].id)) {
        setData((old) => {
          old.splice(rowIndex, 1);
          return [...old];
        });
      }
    }

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
