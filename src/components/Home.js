import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import React from "react";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";

function Home() {

  return <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="center" spacing={1}
  >
    <Grid mt={3} mb={5} item xs={12}>
      <Typography align="center" variant="h1">Sherlock Édition</Typography>
    </Grid>
    <Grid item xs={10} md={3}>
      <Link
        to={{
          pathname: '/livraisons/',
        }}
      >
        <Card>
          <CardActionArea>
            <CardMedia
              sx={{height: 140}}
              image=""
              title="Liste des livraisons"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Livraisons
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Consultez la liste des livraisons du mercure Galant classées temporellement
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
    <Grid item xs={10} md={3}>
      <Link
        to={{
          pathname: '/articles/',
        }}
      >
        <Card>
          <CardActionArea>
            <CardMedia
              sx={{height: 140}}
              image=""
              title="Liste des articles"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Articles
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Consultez tous les articles du Mercure Galant et filtrez-les par mots-clefs
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
    <Grid item xs={10} md={3}>
      <Link
        to={{
          pathname: '/estampes/',
        }}
      >
        <Card>
          <CardActionArea>
            <CardMedia
              sx={{height: 140}}
              image=""
              title="Liste des estampes"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Estampes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Affichage synoptique de toutes les estampes du Mercure Galant
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  </Grid>
}

export default Home;
