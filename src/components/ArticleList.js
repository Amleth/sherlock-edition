/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {getAllArticles, getArticlesByConcepts} from "../requests/article";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {DataGrid} from "@material-ui/data-grid";
import ConceptSelector from "./ConceptSelector";
import ConceptRemover from "./ConceptRemover";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";
import ToggleButton from "@material-ui/core/ToggleButton";

function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  const [articleIriFilteredList, setArticleIriFilteredList] = useState([]);
  const [conceptList, setConceptList] = useState([]);
  const [conceptExclusivityFilter, setConceptExclusivityFilter] = useState("ET");
  const history = useHistory();

  useEffect(() => {
    getAllArticles().then(res => {
      setArticleList(res.results.bindings)
    })
  }, []);

  useEffect(() => {
    if (conceptList.length) {
      getArticlesByConcepts(conceptList, conceptExclusivityFilter === "ET").then(r => {
        setArticleIriFilteredList(r.results.bindings.map(row => row.article_iri.value))
      })
    }
  }, [conceptList, conceptExclusivityFilter])

  const addConcept = (row) => {
    if (!conceptList.find(concept => row === concept)) {
      setConceptList([...conceptList, row]);
    }
  }
  const removeConcept = (row) => {
    setConceptList(conceptList.filter(concept => concept !== row));
  }

  const rows = articleList.map(article => {
    return {
      date: article.date.value,
      titre_livraison: article.titre_livraison.value,
      titre_article: article.titre_article.value,
      id: article.reference_article.value,
      reference_livraison: article.reference_livraison.value,
      articleIri: article.F2_article_tei.value
    }
  });

  const filterIriOperator = [
    {
      label: 'filterIri',
      value: 'filterIri',
      getApplyFilterFn: (filterItem) => {
        return (params) => {
          // Si il y a des concepts sélectionnés
          if (conceptList.length) {
            return articleIriFilteredList.includes(params.row.articleIri);
          }
          return true;
        };
      }
    }
  ];

  const columns = [
    {field: 'id', headerName: 'Référence article', width: 150, filterOperators: filterIriOperator},
    {field: 'date', headerName: 'Date de parution', width: 120},
    {field: 'titre_article', flex: 1, headerName: 'Titre article', width: 260},
    {field: 'titre_livraison', headerName: 'Titre Livraison', width: 260},
  ];

  return <React.Fragment>
    <Typography align="center" mt={3} mb={3} variant="h1">Sherlock Édition</Typography>
    <ConceptSelector addConcept={addConcept}/>
    <Box minHeight={40} width="80%" mt={2} ml={10} display="flex">
      <Box css={() => css` flex: 1;`}>
        <ConceptRemover removeConcept={removeConcept} conceptList={conceptList}/>
      </Box>
      <Box css={() => css` width: 20%;`}>
        <ToggleButtonGroup
          color="primary"
          value={conceptExclusivityFilter}
          exclusive
          onChange={(e, newAlignment) => {if (newAlignment !== null) setConceptExclusivityFilter(newAlignment)}}
        >
          <ToggleButton value="ET">ET</ToggleButton>
          <ToggleButton value="OU">OU</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
    <Box css={() => css`
            margin: auto;
            margin-top: 10vh;
            width: 90%;
            height: 90vh;
        `}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={9}
        filterModel={{
          items: [{ columnField: 'id', value: articleIriFilteredList, operatorValue: 'filterIri' }],
        }}
        onCellClick={(row) => {
          history.push('/livraison/' + row.reference_livraison + '/article/' + row.id)
        }}
      />
    </Box>
  </React.Fragment>
}

export default ArticleList;