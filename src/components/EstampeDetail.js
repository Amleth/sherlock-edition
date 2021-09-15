/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getEstampeDetail} from "../requests/estampes";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

/**
 *
 * Format de l'objet Estampe :
 * Estampe {
 *   titre_descriptif: "",
 *   titre_peritexte: "",
 *   ...
 *   zones: [
 *     {
 *       label: "",
 *       uri: "http://",
 *       x et y ?
 *     },
 *   ],
 *   thematiques: [
 *     {
 *       label: "",
 *       uri: "http://"
 *     }
 *   ]
 * }
 */
function EstampeDetail() {
  const {estampeReference} = useParams();
  const [estampeDetail, setEstampeDetail] = useState(null);
  useEffect(() => {
    getEstampeDetail(estampeReference).then(response => {
      setEstampeDetail(getFormattedEstampeObject(response.results.bindings));
    })
  }, []);
  return estampeDetail ? <Box width={1} mt={1} css={css`height:100vh`} display="flex">
    <Box height={1} css={css`text-align:center; min-width: 50%`}>
      <Link to={{pathname: estampeDetail.E36_gravure.value}} target="_blank"><Typography variant="h4">{estampeDetail.titre_descriptif ? estampeDetail.titre_descriptif.value : "pas de titre trouvé"}</Typography></Link>
      <img css={css`max-width:100%;max-height:80%; margin:auto`} src={`https://picsum.photos/1000?ref=${estampeReference}`}/>
      <Typography variant="h5">{estampeDetail.label_cote_bnf ? estampeDetail.label_cote_bnf.value : "pas de cote bnf"}</Typography>
    </Box>
    <Divider orientation="vertical" flexItem />
    <Box>
      <Box css={css`text-align:center; width: 90%`}>
        <Typography variant="h2">Informations</Typography>
        <Box css={css`text-align:left`} ml={3} mt={5}>
          <Typography variant="h6"><Box component={"span"} fontWeight={1000}> Titre sur image :</Box> {estampeDetail.titre_sur_image ? estampeDetail.titre_sur_image.value : ""}</Typography>
          <Typography variant="h6"><Box component={"span"} fontWeight={1000}> Titre descriptif :</Box> {estampeDetail.titre_descriptif ? estampeDetail.titre_descriptif.value : ""}</Typography>
          <Typography variant="h6"><Box component={"span"} fontWeight={1000}> Titre péritexte :</Box> {estampeDetail.titre_peritexte ? estampeDetail.titre_peritexte.value : ""}</Typography>
          <Typography variant="h6"><Box component={"span"} fontWeight={1000}> Date : </Box>{estampeDetail.dateString}</Typography>
          <Typography variant="h6"><Box component={"span"} fontWeight={1000}> Voir aussi : </Box>{estampeDetail.see_also ? <Link to={{pathname: estampeDetail.see_also.value}}>{estampeDetail.see_also.value}</Link> : ""}</Typography>
          <Typography variant="h6"><Box component={"span"} fontWeight={1000}> Invenit :</Box>{estampeDetail.auteur ? estampeDetail.auteur.value : ""}</Typography>
          <Typography variant="h6"><Box component={"span"} fontWeight={1000}> Technique spécifique :</Box>{estampeDetail.technique_specifique ? estampeDetail.technique_specifique.value : ""}</Typography>
          <Typography variant="h6"><Box component={"span"} fontWeight={1000}> Technique générale :</Box>{estampeDetail.technique_generale ? estampeDetail.technique_generale.value : ""}</Typography>

          <Typography variant="h6"><Box component={"span"} fontWeight={1000}> Thématiques : </Box>
            {estampeDetail.thematiques.map(thematique => {
              return <Link target="_blank" key={thematique.uri.value} to={{pathname: thematique.uri.value}}>{thematique.label.value} - </Link>
            })}
          </Typography>
          <Typography variant="h6"><Box component={"span"} fontWeight={1000}> Sous-ensembles : </Box>
            {estampeDetail.zones.map(zone => {
              return <Link target="_blank" key={zone.uri.value} to={{pathname: zone.uri.value}}>{zone.label ? zone.label.value : "pas de label"} - </Link>
            })}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box> : "..."
}

function getFormattedEstampeObject(estampe) {
  const estampeFormatted = estampe[0];
  console.log(estampe)

  const datetime = new Date(estampeFormatted.date.value);
  estampeFormatted.dateString = datetime.toLocaleString('default', { year: 'numeric', month: 'long' });
  const zones = [];
  const thematiques = [];
  estampe.map(row => {
    if (row.E36_zone && ! zones.find(zone => zone.uri.value === row.E36_zone.value)) {
      zones.push({label: row.represents_label, uri: row.E36_zone});
    }
    if (row.thematique && ! thematiques.find(thematique => thematique.uri.value === row.E55_thematique.value)) {
      thematiques.push({label: row.thematique, uri: row.E55_thematique});
    }
  });
  estampeFormatted.zones = zones;
  estampeFormatted.thematiques = thematiques;
  return estampeFormatted;
}

export default EstampeDetail;