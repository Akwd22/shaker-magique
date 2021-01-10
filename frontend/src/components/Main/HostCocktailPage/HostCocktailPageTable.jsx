import React, { useEffect, useMemo, useState } from "react";
import { boolSortType, CheckboxCell, ReactTable } from "../../Table/Table";
import "./HostCocktailPageTable.css";

export default function HostCocktailPageTable({ cocktails, search }) {
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

  const [data, setData] = useState(cocktails);

  const [instance, setInstance] = useState(null);

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

  const getInstance = ({ setFilter }) => {
    setInstance({ setFilter });
  };

  if (instance) {
    instance.setFilter("intitule", search);
  }

  useEffect(() => {
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
