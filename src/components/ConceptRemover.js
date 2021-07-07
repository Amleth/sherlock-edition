import Chip from "@material-ui/core/Chip";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";

function ConceptRemover({removeConcept, conceptList}) {

  function computeAncestors(ancestors) {
    return ancestors.map(ancestor => ancestor.label).join('/');
  }

  //TODO: mr + ET/OU toggle + hauteur des lignes + recherche sur la key et non le label
  return conceptList.map(concept => {
    return <Box mr={1} display="inline" key={`remover-${concept.key}`}>
      <Tooltip title={computeAncestors(concept.ancestors)}>
        <Chip label={concept.concept}
              onDelete={() => removeConcept(concept)}/>
      </Tooltip>
    </Box>
  });
}

export default ConceptRemover;