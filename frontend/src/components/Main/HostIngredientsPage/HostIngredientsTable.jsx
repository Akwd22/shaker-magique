import React from "react";
import { apiUpdateIngredientStock } from "../../../Axios";
import { CheckboxCell, ReactTable, boolSortType } from "../../Table/Table";
import "./HostIngredientsTable.css";

export default function HostIngredientsTable(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Ingrédient",
        accessor: "intitule",
      },
      {
        Header: "Degré",
        accessor: "degrealcool",
        Cell: ({ value }) => (value > 0 ? `${value}°` : null),
      },
      {
        Header: "En stock",
        accessor: "enreserve",
        Cell: CheckboxCell,
        sortType: boolSortType,
      },
    ],
    []
  );

  const [data, setData] = React.useState(props.ingredients);

  React.useEffect(() => {
    setData(props.ingredients);
  }, [props.ingredients]);

  // When our cell renderer calls updateData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateData = (rowIndex, columnId, value) => {
    // Ajouter/enlever l'ingrédient du stock de l'hôte
    if (columnId === "enreserve") {
      apiUpdateIngredientStock(data[rowIndex].id, value);
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

  const [instance, setInstance] = React.useState(null);

  /**
   * Récupérer l'instance de la table, pour avoir accès à ses propriétés
   *
   * @param {*} instance Instance de la table
   */
  const getInstance = (a) => {
    setInstance(a);
  };

  /**
   * Appliquer la recherche sur la colonne intitulé
   * @param {string} search Mot-clé de recherche
   */
  const setSearch = (search) => {
    instance.setFilter("intitule", search);
  };

  React.useEffect(() => {
    if (instance) setSearch(props.search);
  }, [props.search]);

  return (
    <div className="host-ingredients-table">
      <ReactTable
        columns={columns}
        data={data}
        updateData={updateData}
        getInstance={getInstance}
        initialState={{
          sortBy: [{ id: "enreserve", desc: false }],
        }}
        className="table"
      />
    </div>
  );
}
