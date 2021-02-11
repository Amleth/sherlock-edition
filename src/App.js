import React, { useEffect, useState } from 'react'

export const sparqlEndpoint = async query => {
  let res = await fetch(`http://data-iremus.huma-num.fr/sparql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow',
    body: `query=${encodeURIComponent(query)}`,
  })
  res = await res.json()
  return res
}

const query = `
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX lrmoo: <http://www.cidoc-crm.org/lrmoo/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
 
SELECT DISTINCT ?F2_livraison ?titre ?date ?nom_auteur
WHERE {
  GRAPH <http://data-iremus.huma-num.fr/graph/mercure-galant> {
    ?F18 a lrmoo:F18_Serial_Work .
    ?F18 lrmoo:R10_has_member ?F1_livraison .
    ?F27 lrmoo:R16_initiated ?F18 .
    ?F27 crm:P14_carried_out_by ?auteur .
    ?auteur crm:P1_is_identified_by ?nom_auteur .
    ?F1_livraison crm:P1_is_identified_by ?titre .
    ?F1_livraison    lrmoo:R3_is_realised_in ?F2_livraison .
    ?E63 crm:P92_brought_into_existence ?F2_livraison .
    ?E63 crm:P4_has_time-span/crm:P80_end_is_qualified_by ?date .
  }
}
`

function App() {
  const [livraisons, setLivraisons] = useState([]);

  useEffect(() => {
    sparqlEndpoint(query).then(res => {
      setLivraisons(res.results.bindings)
    })
  }, [])

  return (
    <div>
      <ul>
        {livraisons.map(_ => <li key={_.F2_livraison.value}>
          {_.titre.value}
        </li>)}
      </ul>
    </div>
  );
}

export default App;
