import React from "react";
import { apiDeleteCocktail } from "../../Axios/Axios";
import {
  CheckboxCell,
  EditboxCell,
  ReactTable,
  boolSortType,
} from "../../Table/Table";
import ReactTableSearchBar from "../../Table/ReactTableSearchBar";
import "./AdminEditCocktailTable.css";

/**
 * Créer une cellule contenant un champ de texte
 * qui ne s'affiche que si Contenir est cochée
 *
 * @param {*} props Props de la table et la ligne
 */
const AdminEditCocktailEditboxCell = function (props) {
  return props.data[props.row.index].contenir ? (
    <EditboxCell {...props} />
  ) : null;
};

export default function AdminEditCocktailTable(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Ingrédient",
        accessor: "intitule",
      },
      {
        Header: "Qte.",
        accessor: "quantite",
        Cell: AdminEditCocktailEditboxCell,
      },
      {
        Header: "Unité",
        accessor: "unite",
        Cell: AdminEditCocktailEditboxCell,
      },
      {
        Header: "Contenir",
        accessor: "contenir",
        Cell: CheckboxCell,
        sortType: boolSortType,
      },
    ],
    []
  );

  const [data, setData] = React.useState(props.ingredients);
  const [selected, setSelected] = React.useState([]);

  React.useEffect(() => {
    setData(props.ingredients);
  }, [props.ingredients]);

  React.useEffect(() => {
    props.onChange(data);
  }, [data]);

  // When our cell renderer calls updateData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateData = (rowIndex, columnId, value) => {
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

  React.useEffect(() => {
    props.onChange(selected);
  }, [selected]);

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

  return (
    <div className="admin-edit-cocktail-table">
      <div className="admin-edit-cocktail-search">
        <ReactTableSearchBar
          onSearch={setSearch}
          placeholder="Un ingrédient..."
        />
      </div>
      <ReactTable
        columns={columns}
        data={data}
        updateData={updateData}
        getInstance={getInstance}
        initialState={{
          sortBy: [{ id: "contenir", desc: false }],
        }}
        className="table"
      />
    </div>
  );
}
