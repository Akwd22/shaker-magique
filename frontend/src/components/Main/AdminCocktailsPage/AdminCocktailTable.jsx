import React from "react";
import { apiDeleteCocktail } from "../../Axios/Axios";
import { ButtonCell, ReactTable } from "../../Table/Table";
import "./AdminCocktailTable.css";

/**
 * Créer une cellule contenant un bouton de suppression
 * @param {*} props Props de la table et la ligne
 */
const DeleteButtonCell = (props) => {
  const onClick = (e, index, id, value) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce cocktail ?"))
      props.updateData(index, id, value);
  };

  return (
    <ButtonCell {...props} onClick={onClick}>
      <i class="fas fa-trash"></i>
    </ButtonCell>
  );
};

/**
 * Créer une cellule contenant un bouton d'édition
 * @param {*} props Props de la table et la ligne
 */
const EditButtonCell = (props) => {
  const onClick = (e, index, id, value) => {
    props.updateData(index, id, value);
  };

  return (
    <ButtonCell {...props} onClick={onClick}>
      <i class="fas fa-edit"></i>
    </ButtonCell>
  );
};

export default function AdminCocktailTable({ cocktails, search }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Cocktail",
        accessor: "intitule",
      },
      /*{
          Header: "Column 3",
          accessor: "col3",
          Cell: CheckboxCell,
          sortType: (rowA, rowB, id, desc) => {
            if (rowA.original[id] && !rowB.original[id]) return -1;
            if (!rowA.original[id] && rowB.original[id]) return 1;
            return 0;
          },
        },*/
      {
        accessor: "edit",
        Cell: EditButtonCell,
      },
      {
        accessor: "delete",
        Cell: DeleteButtonCell,
      },
    ],
    []
  );

  const [data, setData] = React.useState(cocktails);

  React.useEffect(() => {
    setData(cocktails);
  }, [cocktails]);

  // When our cell renderer calls updateData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateData = async (rowIndex, columnId, value) => {
    if (columnId === "delete") {
      if (await apiDeleteCocktail(data[rowIndex].id)) {
        setData((old) => {
          old.splice(rowIndex, 1);
          return [...old];
        });
      }
    }
  };

  const [instance, setInstance] = React.useState(null);

  /**
   * Récupérer l'instance de la table, pour avoir accès à ses propriétés
   *
   * @param {*} instance Instance de la table
   */
  const getInstance = ({ setFilter }) => {
    setInstance({ setFilter });
  };

  // Appliquer le filtre de recherche, lorsque l'instance existe
  if (instance) {
    instance.setFilter("intitule", search);
  }

  return (
    <div className="admin-cocktails-table">
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
