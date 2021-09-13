import React from 'react'
import LivraisonList from "./components/LivraisonList";
import Livraison from "./components/Livraison";
import PageArticle from "./pages/PageArticle";
import { Route, Switch } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import theme from './SherlockEditionMuiTheme'
import Home from "./components/Home";
import CorpusSearchEngine from "./components/CorpusSearchEngine";
import Estampes from "./components/Estampes";
import EstampeDetail from "./components/EstampeDetail";

function App() {
  return (

    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/estampes" component={Estampes} />
          <Route exact path="/estampe/:estampeReference" component={EstampeDetail} />
          <Route exact path="/livraisons" component={LivraisonList} />
          <Route exact path="/articles-et-estampes/" component={CorpusSearchEngine} />
          <Route exact path="/livraison/:livraisonReference" component={Livraison} />
          <Route exact path="/livraison/:livraisonReference/article/:articleReference" component={PageArticle} />
        </Switch>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;