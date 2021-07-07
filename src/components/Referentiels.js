import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function Referentiels({referentiels}) {

  return <React.Fragment>
    <Typography variant="h6">Filtrez les résultats d'articles en sélectionnant des concepts dans ces référentiels</Typography>
    {Object.keys(referentiels).map((key) => {
      return <Box key={key} mb={2}>
        <Typography display='inline' fontWeight="bold">{referentiels[key].label} : </Typography>
        <Typography display='inline'>{referentiels[key].note}</Typography>
      </Box>
    })
    }
  </React.Fragment>
}

export default Referentiels;