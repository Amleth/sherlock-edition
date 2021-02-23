import React from 'react'
import LivraisonList from "./components/LivraisonList";
import Livraison from "./components/Livraison";
import PageArticle from "./pages/PageArticle";
import {Route, Switch} from "react-router-dom";

function App() {
  return (
      <Switch>
        <Route exact path="/" component={LivraisonList} />
        <Route exact path="/livraison/:livraisonReference" component={Livraison} />
        <Route exact path="/livraison/:livraisonReference/article/:articleReference" component={PageArticle} />
      </Switch>
  );
}
export default App;