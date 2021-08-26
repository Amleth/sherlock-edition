import React, { useEffect, useState } from "react";
import { getEstampesByLivraisonReference, getLivraisonByReference } from "../requests/livraison";
import { useHistory, useParams, useLocation } from "react-router-dom";
import DescriptionIcon from '@material-ui/icons/Description';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";

function Livraison() {
  const [livraison, setLivraison] = useState([]);
  const [estampes, setEstampes] = useState([]);
  const { livraisonReference } = useParams();
  const history = useHistory();
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
            //TODO labelCollection: row.label_collection.value,
            referenceEstampe: row.reference_gravure.value,
            titresEstampe: [row.titre_estampe.value]
          })
        }
      }
      setEstampes(estampesGroupedByIri);
    })
  }, []);

  return <React.Fragment>
    <Typography variant="h2" mt={10} mb={5} align="center">Articles</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Page</TableCell>
          <TableCell>Titre</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {livraison.map(article => <TableRow
          key={article.reference_article.value}
          onClick={() => { history.push(location.pathname + '/article/' + article.reference_article.value) }}>
          <TableCell>
            <DescriptionIcon />
            {article.reference_gravure ? <MusicNoteIcon /> : null}
          </TableCell>
          <TableCell>{getPageValueByArticleReference(article.reference_article.value)}</TableCell>
          <TableCell>{article.titre_article.value}</TableCell>
        </TableRow>)}
      </TableBody>
    </Table>
    {estampes.length === 0
      ? <Typography align="center" mt={5} mb={5}>Aucune estampe dans cette livraison</Typography>
      : <React.Fragment>
        <Typography variant="h2" mt={10} mb={5} align="center">Estampes</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Estampe</TableCell>
              <TableCell>Titre(s)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estampes.map(estampe => <TableRow>
              <TableCell>
                <img src={`https://picsum.photos/50?ref=${estampe.referenceEstampe}`} />
              </TableCell>
              <TableCell>
                {estampe.titresEstampe.join(' / ')}
              </TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </React.Fragment>
    }
  </React.Fragment>

  function getPageValueByArticleReference(reference) {
    return reference.slice(reference.length - 3);
  }
}

export default Livraison;