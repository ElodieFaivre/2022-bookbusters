// Request by ISBN : https://query.wikidata.org/#SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%22.%20%7D%0A%20%20%7B%0A%20%20%20%20SELECT%20DISTINCT%20%3Fitem%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fitem%20p%3AP212%20%3Fstatement0.%0A%20%20%20%20%20%20%3Fstatement0%20%28ps%3AP212%29%20%229782909450018%22.%0A%20%20%20%20%7D%0A%20%20%20%20LIMIT%20100%0A%20%20%7D%0A%7D

class SPARQLQueryDispatcher {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    query(sparqlQuery) {
        const fullUrl =
            this.endpoint + '?query=' + encodeURIComponent(sparqlQuery);
        const headers = { Accept: 'application/sparql-results+json' };

        return fetch(fullUrl, { headers }).then((body) => body.json());
    }
}

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `SELECT DISTINCT ?item ?itemLabel WHERE {
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE]". }
  {
    SELECT DISTINCT ?item WHERE {
      ?item p:P212 ?statement0.
      ?statement0 (ps:P212) "9782909450018".
    }
  }
}`;

const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
queryDispatcher.query(sparqlQuery).then(console.log);
