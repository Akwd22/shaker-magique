import React from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import "./Table.css";

/**
 * Fonction de tri de colonne pour les booléens
 *
 * @param {*} rowA Ligne comparée A
 * @param {*} rowB Ligne comparée B
 * @param {*} id   Case concernée
 * @param {*} desc Ordre
 */
export const boolSortType = (rowA, rowB, id, desc) => {
  if (rowA.original[id] && !rowB.original[id]) return -1;
  if (!rowA.original[id] && rowB.original[id]) return 1;
  return 0;
};

/**
 * Créer une cellule contenant un champ de texte
 * @param {*} props Props de la table et la ligne
 */
export const EditboxCell = function ({
  value: initialValue, // Valeur initiale
  row: { index }, // Ligne se situant la cellule
  column: { id }, // Colonne se situant la cellule
  class: className, // Classe CSS
  updateData, // Fonction personnalisée passée à l'instance de la table
}) {
  // On sauvegarde l'état de la cellule
  const [value, setValue] = React.useState(initialValue);

  // On met à jour l'état de la case
  const onChange = (e) => {
    setValue(e.target.value);
  };

  // On met à jour les données extérieurs
  const onBlur = () => {
    updateData(index, id, value);
  };

  // Si initialValue est changé à l'extérieur du composant, on le sync avec notre état
  // ex. lors d'un re-render de ce composant et que initialValue a changé depuis la dernière fois
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // On retourne le composant rendu dans la cellule
  return (
    <input
      className={className + "-textbox"}
      type="text"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

/**
 * Créer une cellule contenant une case à cocher
 * @param {*} props Props de la table et la ligne
 */
export const CheckboxCell = function ({
  value: initialValue,
  row: { index },
  column: { id },
  class: className,
  updateData,
}) {
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    updateData(index, id, e.target.checked);
    setValue(e.target.checked);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      className={className + "-checkbox"}
      type="checkbox"
      checked={value}
      onChange={onChange}
    />
  );
};

/**
 * Créer une cellule contenant un bouton générique
 * @param {*} props Props de la table et la ligne
 */
export const ButtonCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  onClick: clickHandler,
  class: className,
  children: children,
}) => {
  const [value, setValue] = React.useState(initialValue);

  const onClick = (e) => {
    clickHandler(e, index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <a className={className + "-button"} onClick={onClick}>
      {children}
    </a>
  );
};

// Be sure to pass our updateData option
export function ReactTable({
  columns,
  data,
  updateData,
  className,
  getInstance,
  initialState,
}) {
  const instance = useTable(
    {
      columns,
      data,
      // updateData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!

      class: className,

      updateData,
      initialState,
    },
    useFilters,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = instance;

  console.log("INSTANCE PROPS:");
  console.dir(instance);

  // On donne l'instance au composant parent, pour lui
  // donner accès aux propriétés de la table
  React.useEffect(() => {
    getInstance(instance);
  }, []);

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps({ class: className })}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getSortByToggleProps()}>
                  {column.render("Header")}{" "}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i class="fas fa-arrow-down"></i>
                      ) : (
                        <i class="fas fa-arrow-up"></i>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
