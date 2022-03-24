-- Request URL in JSON return format : https://query.wikidata.org/sparql?format=json&query=

SELECT DISTINCT
  ?item
  ?isbn13 
  ?isbn10 
  ?image 
  ?title 
  ?typeLabel 
  ?authorLabel 
  ?work 
  ?workLabel 
  ?genre 
  ?quotation 
  ?characters 
  ?subject 
  ?pagesNb 
  ?languageLabel 
  ?publisher 
  ?publicationDate 
  ?format
  ?editor 
  ?worldCatID 
  ?openLibrairyID 
  ?googleBooksID 
  ?internetArchiveID 
  ?bnfID 
WHERE {
  ?item wdt:P212 '978-2-7096-2286-8' .
  OPTIONAL { ?item wdt:P212 ?isbn13 . }
  OPTIONAL { ?item wdt:P957 ?isbn10 . }
  OPTIONAL { ?item wdt:P18 ?image . }
  OPTIONAL { ?item wdt:P1476 ?title . }
  OPTIONAL { ?item wdt:P31 ?type . }
  OPTIONAL { ?item wdt:P50 ?author . }
  OPTIONAL { ?item wdt:P629 ?work . }
  OPTIONAL { ?item wdt:P136 ?genre . }
  OPTIONAL { ?item wdt:P1683 ?quotation . }
  OPTIONAL { ?item wdt:P674 ?characters . }
  OPTIONAL { ?item wdt:P921 ?subject . }
  OPTIONAL { ?item wdt:P1104 ?pagesNb . }
  OPTIONAL { ?item wdt:P407 ?language . }
  OPTIONAL { ?item wdt:P123 ?publisher . }
  OPTIONAL { ?item wdt:P577 ?publicationDate . }
  OPTIONAL { ?item wdt:P437 ?format . }
  OPTIONAL { ?item wdt:P98 ?editor . }
  OPTIONAL { ?item wdt:P243 ?worldCatID . }
  OPTIONAL { ?item wdt:P648 ?openLibrairyID . }
  OPTIONAL { ?item wdt:P675 ?googleBooksID . }
  OPTIONAL { ?item wdt:P724 ?internetArchiveID . }
  OPTIONAL { ?item wdt:P268 ?bnfID . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE]". }
}
LIMIT 10