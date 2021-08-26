/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from "react";
import { getAllLivraisons } from "../requests/livraison";
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom'
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function LivraisonList() {
  const [livraisons, setLivraisons] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAllLivraisons().then(res => {
      setLivraisons(res.results.bindings)
    })
  }, []);

  const rows = livraisons.map(livraison => {
    return {
      date: livraison.date.value,
      titre: livraison.titre.value,
      id: livraison.reference_livraison.value
    }
  });
  const columns = [
    {
      field: 'date', headerName: 'Date de parution',
      valueGetter: (params) => params.value.slice(0, 7),
      width: 200
    },
    {
      field: 'titre',
      headerName: 'Titre',
      type: 'string',
      flex: 1
    },
    {
      field: 'id',
      headerName: 'Identifiant',
      width: 150
    }
  ];
  return (<React.Fragment>
    <Typography align="center" mt={10} mb={10} variant="h1">LIVRAISONS</Typography>
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      pageSize={25}
      onCellClick={(row) => {
        history.push('/livraison/' + row.id)
      }}
    />
  </React.Fragment>
  );
}

export default LivraisonList