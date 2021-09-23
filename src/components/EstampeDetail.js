/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {Link, useParams, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getE13ByIris, getE36Structure, getEstampeIriByReference} from "../requests/estampes";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {DataGrid} from "@material-ui/data-grid";
import {renderCellExpand} from "./renderCellExpand";
import LaunchIcon from '@material-ui/icons/Launch';

function EstampeDetail() {
  const {estampeReference} = useParams();
  const history = useHistory();
  const [e36Structure, setE36Structure] = useState([]);
  const [e13ByE36, setE13ByE36] = useState([]);
  const [highlightedArea, setHighlightedArea] = useState({x: 0, y: 0, width: 0, height: 0});
  const [highlightedSubArea, setHighlightedSubArea] = useState({x: 0, y: 0, width: 0, height: 0});

  useEffect(() => {
    getEstampeIriByReference(estampeReference).then(r => getE36Structure(r.results.bindings[0].E36.value).then(response => {
      setE36Structure(response.results.bindings);
    }));
  }, [estampeReference]);

  useEffect(() => {
    if (e36Structure.length)
      getE13ByIris(["<" + e36Structure[0].E36_source.value + ">", ...e36Structure.map(row => "<" + row.E36_child.value + ">")].join('')).then(response => {
        setE13ByE36(response.results.bindings);
      })
  }, [e36Structure])

  const rowsByE36 = Array.from(e13ByE36.reduce((entryMap, e) => entryMap.set(e.P140.value, [...entryMap.get(e.P140.value) || [], e]), new Map()));

  function formatRowsByE36AsDataGridRows(rows) {
    return rows.map(row => {
      const subArea = row.P177.value === 'http://www.cidoc-crm.org/cidoc-crm/P106_is_composed_of'
        ? {x: 530, y: 530, width: 10, height: 10}
        : {x: 0, y: 0, width: 0, height: 0}
      return {
        P177: p177ToLabel(row.P177_label ? row.P177_label.value : row.P177.value),
        id: row.E13.value,
        sherlock: <Link target="_blank" to={{pathname: row.E13.value}}><LaunchIcon/></Link>,
        P14: row.P14_label ? row.P14_label.value : row.P14.value,
        P141: row.P177.value === 'http://www.cidoc-crm.org/cidoc-crm/P106_is_composed_of'
          ? <span css={css`color:blue`} onClick={() => setHighlightedSubArea(subArea)}>Voir sur l'image</span>
          : row.P141_label ? row.P141_label.value : row.P141.value,
      }
    });

  }

  const columns = [
    {field: 'P177', flex: 1, headerName: 'Type', width: 2000, renderCell: renderCellExpand},
    {
      field: 'P141', flex: 1, headerName: 'Objet', width: 260, renderCell: renderCellExpand

    },
    {field: 'P14', flex: 0, headerName: 'Créateur', width: 150, renderCell: renderCellExpand},
    {field: 'sherlock', flex: 1, headerName: 'sherlock', width: 10, renderCell: renderCellExpand}
  ];

  //estampeDetail.label_cote_bnf ? estampeDetail.label_cote_bnf.value : "pas de cote bnf"
  return e13ByE36.length ? <Box width={1} mt={1} css={css`height:100vh`} display="flex">
    <Box height={1} css={css`text-align:center; min-width: 50%; max-width: 50%`}>
      <Link to={{pathname: e36Structure[0].E36_source.value}} target="_blank">
        <Box css={css`width:40vw; margin: auto; position: relative`}>
          <Box
            css={css`
            position: absolute;
            background-color: pink; 
            opacity: 0.5;
            left:${highlightedArea.x}px;
            top:${highlightedArea.y}px;
            width:${highlightedArea.width}px;
            height:${highlightedArea.height}px;
            `}/>
          <Box
            css={css`
            position: absolute;
            background-color: blue; 
            opacity: 0.5;
            left:${highlightedSubArea.x}px;
            top:${highlightedSubArea.y}px;
            width:${highlightedSubArea.width}px;
            height:${highlightedSubArea.height}px;
            `}/>
          <img css={css`margin:auto; max-width:100%;max-height:100%;`}
               src={`https://picsum.photos/1000?ref=${estampeReference}`} alt=""/>
        </Box>
      </Link>
    </Box>
    <Divider orientation="vertical" flexItem/>
    <Box css={css`text-align:center; width: 90%;`}>
      <Typography variant="h2">Informations</Typography>
      {rowsByE36.map((rows) => {
        const area = {x: 500, y: 500, width: 50, height: 50};
        return <React.Fragment>
          <Link target="_blank" to={{pathname: rows[0]}}><Typography mt={3}  variant="h5">Zone {rowsByE36.indexOf(rows)+1}</Typography></Link>
          <Link css={css`color:pink`} onClick={() => setHighlightedArea(area)}>Voir sur l'image</Link>
          <DataGrid
            rows={formatRowsByE36AsDataGridRows(rows[1])}
            columns={columns}
            pageSize={5}
            autoHeight
            onCellClick={(row) => {
              history.push(row.E36)
            }}
          />
        </React.Fragment>
      })}
    </Box>
  </Box> : "..."
}

function p177ToLabel(p177) {
  switch (p177) {
    case 'http://www.cidoc-crm.org/cidoc-crm/P106_is_composed_of':
      return "Sous-zone d'image"
    case 'http://www.cidoc-crm.org/cidoc-crm/P138_represents':
      return "Représente"
    default:
      return p177
  }
}

export default EstampeDetail;