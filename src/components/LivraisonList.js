/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React, {useEffect, useState} from "react";
import {getAllLivraisons} from "../requests/livraison";
import {DataGrid} from '@material-ui/data-grid';
import {useHistory} from 'react-router-dom'
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
      auteur: livraison.nom_auteur.value,
      titre: livraison.titre.value,
      id: livraison.reference_livraison.value
    }
  });
  const columns = [
    {field: 'id', headerName: 'Référence livraison', width: 200},
    {field: 'auteur', headerName: 'Auteur.rice', width: 200},
    {field: 'date', headerName: 'Date de parution', width: 200},
    {
      field: 'titre',
      headerName: 'Titre',
      type: 'string',
      width: 400,
    },
  ];
  return (<React.Fragment>
      <Typography align="center" mt={3} mb={3} variant="h1">Sherlock Édition</Typography>

      <Box css={() => css`
            margin: auto;
            width: 90%;
            height: 60vh;
        `}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          onCellClick={(row) => {
            history.push('/livraison/' + row.id)
          }}
        />
      </Box>
    </React.Fragment>
  );
}

export default LivraisonList;