import React, {useEffect, useState} from "react";
import {getEstampesByLivraisonReference, getLivraisonByReference} from "../requests/livraison";
import {Link, useParams, useLocation} from "react-router-dom";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DescriptionIcon from '@material-ui/icons/Description';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import EstampesInLivraison from "./EstampesInLivraison";

function Livraison() {
  const [livraison, setLivraison] = useState([]);
  const [estampes, setEstampes] = useState([]);
  const {livraisonReference} = useParams();
  const location = useLocation();

  useEffect(() => {
    getLivraisonByReference(livraisonReference).then(res => {
      setLivraison(res.results.bindings)
    });
    getEstampesByLivraisonReference(livraisonReference).then(res => {
      const estampesGroupedByIri = [];
      for (const row of res.results.bindings) {

        const g = estampesGroupedByIri.find(g => g.E36Estampe === row.E36_gravure.value);
        if (g) {
          g.titresEstampe.push(row.titre_estampe.value);
        } else {
          estampesGroupedByIri.push({
            E36Estampe: row.E36_gravure.value,
            labelCollection: row.label_collection.value,
            referenceEstampe: row.reference_gravure.value,
            titresEstampe: [row.titre_estampe.value]
          })
        }
      }
      setEstampes(estampesGroupedByIri);
    })
  }, []);

  console.log(livraison)

  return (
    <React.Fragment>
      <Box sx={{width: '100%'}}>
        <List component="nav">
          {livraison.map(article =>

              <Link
                to={{
                  pathname: location.pathname + '/article/' + article.reference_article.value,
                }}
                key={article.reference_article.value}
              >
              <ListItem button>
                <ListItemIcon>
                  <DescriptionIcon/>
                  {article.reference_gravure ? <MusicNoteIcon/> : null}
                </ListItemIcon>
                <ListItemText primary={computeTitle(article)}/>
              </ListItem>
              </Link>
            )
          }
          <EstampesInLivraison estampes={estampes}/>
        </List>
      </Box>
    </React.Fragment>

  );

  function getPageValueByArticleReference(reference) {
    return reference.slice(reference.length - 3);
  }

  function computeTitle(article) {
    return `${article.titre_article.value} - ${getPageValueByArticleReference(article.reference_article.value)}`
  }
}

export default Livraison;