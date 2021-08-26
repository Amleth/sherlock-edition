import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

function Home() {

  return <Container>
    <Typography align="center" mt={10} mb={10} variant="h1">MERCURE GALANT</Typography>
    <Typography color='red' align='center' p={5}>
      Ici, décrire le corpus, donner ses dimensions, et expliquer le principe de l'indexation.
    </Typography>
    <Grid container>
      {[
        [`/livraisons/`, `Livraisons`, `Classement chronologique de l'ensemble des livraisons`, ``],
        [`/articles-et-estampes/`, `Indexation`, `Indexations des articles et des estampes`, ``],
        [`/estampes/`, `Estampes`, `Affichage synoptique des estampes`, ``],
        [`/airs/`, `Airs`, `Liste des airs`, ``],
      ].map(_ => <Grid item xs={4} p={1}>
        <Link
          to={{
            pathname: _[0],
          }}
        >
          <Card>
            <CardActionArea>
              <CardMedia
                sx={{ height: 140 }}
                image=""
                title={_[1]}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {_[1]}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>)
      }
    </Grid>
  </Container>
}

export default Home;
