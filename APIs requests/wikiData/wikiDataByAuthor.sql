-- Request URL in JSON return format : https://query.wikidata.org/sparql?format=json&query=

SELECT distinct ?isbn ?book ?bookLabel ?authorLabel ?genre_label
WHERE
{
  ?author rdfs:label "Amélie Nothomb"@en .
  ?book wdt:P50 ?author .

  ?book wdt:P136 ?genre .
  ?genre rdfs:label ?genre_label filter (lang(?genre_label) = "fr").
  
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "fr" .
  }
}