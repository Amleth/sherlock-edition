/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import {DataGrid, GridCellParams} from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/styles/makeStyles";
import * as conceptsJSON from '../mg.json';
import {Link} from "react-router-dom";
import {createRowsFromConcepts, normalizeString} from "../utils/utils";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Referentiels from "./Referentiels";

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  MuiDataGridRoot: {
    backgroundColor: 'red'
  },
  header: {
    width: '50%',
  }
});

function ConceptSelector({addConcept}) {
  const [input, setInput] = useState('')
  const [rows, setRows] = useState([])
  const classes = useStyles()

  useEffect(() => {
    setRows(createRowsFromConcepts(conceptsJSON.concepts, conceptsJSON.référentiels));
  }, [])

  const filterConceptsOperator = [
    {
      label: 'filterConcepts',
      value: 'filterConcepts',
      getApplyFilterFn: (filterItem) => {
        return (params) => {
          return params.row.normalizedStringConcept.includes(filterItem.value);
        };
      }
    }
  ];

  const columns = [
    {
      field: 'concept',
      headerName: 'Concept',
      flex: 1,
      width: 500,
      headerClassName: classes.header,
      headerAlign: 'center',
      filterOperators: filterConceptsOperator,
      renderCell: (params) => {
        return <Box css={css`flex: 1`} key={`conceptCell-${params.row.key}`}
                    onClick={() => addConcept(params.row)}>{params.row.concept}
        </Box>
      }
    },
    {
      field: 'ancestors',
      headerAlign: 'center',
      headerName: 'Concepts Parents',
      flex: 1,
      width: 500,
      headerClassName: classes.header,
      renderCell: (params) => {
        return params.row.ancestors.map(ancestor => <React.Fragment key={`ancestorsCell-${params.row.key}-${ancestor.iri}`}><ArrowForwardIosIcon/> <Link
             target="_blank" to={{pathname: ancestor.iri}}>

            {ancestor.label}
          </Link></React.Fragment>
        )
      }
    },
    {
      field: 'referentiel',
      headerName: 'Référentiel',
      flex: 1,
      width: 500,
      headerClassName: classes.header,
      headerAlign: 'center',
      renderCell: (params) => {
        return <Link css={css`flex: 1`} key={`referentielCell-${params.row.key}`} target="_blank"
                     to={{pathname: params.row.E32Iri}}>
          {params.row.E32Label}
        </Link>
      }
    },
  ]


  return <Box css={() => css`
            margin: auto;
            width: 90%;
        `}
  >
    <Referentiels referentiels={conceptsJSON.référentiels}/>
    <TextField fullWidth label="recherche" variant="filled" value={input} onChange={e => {
      setInput(e.target.value)
    }}/>
    <Box css={() => css`
            height: 55vh;
        `}
    >
      <DataGrid
        rowHeight={30}
        className={classes.root}
        rows={rows}
        columns={columns}
        pageSize={7}
        filterModel={{
          items: [{ columnField: 'concept', value: normalizeString(input), operatorValue: 'filterConcepts' }],
        }}
      />
    </Box>
  </Box>
}

export default ConceptSelector;