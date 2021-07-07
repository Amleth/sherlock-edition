import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";

function EstampesInLivraison({estampes}) {
  return <React.Fragment>
    {estampes.map(estampe => {
      return <Link
        target="_blank"
        to={{
          pathname: "https://picsum.photos/200?ref=" + estampe.referenceEstampe,
        }}
        key={estampe.E36Estampe}>
        <ListItem button>
          <ListItemIcon>
            <img src={`https://picsum.photos/50?ref=${estampe.referenceEstampe}`}/>
          </ListItemIcon>
          <ListItemText primary={estampe.titresEstampe.join(' / ')}/>
        </ListItem>
      </Link>
    })
    }
  </React.Fragment>
}

export default EstampesInLivraison;