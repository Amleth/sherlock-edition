import React from 'react'
import LivraisonList from "./components/LivraisonList";
import Livraison from "./components/Livraison";
import Article from "./components/Article";
import {Route} from "react-router-dom";

function App() {
  return (
      <React.Fragment>
        <Route exact path="/" component={LivraisonList} />
        <Route path="/livraison/:livraisonId" component={Livraison} />
        <Route path="/article/:articleId" component={Article} />
      </React.Fragment>
  );
}
export default App;