## Formation Node.js 20-22 décembre 2020

Contact : nicolas@chambrier.fr

### Ressources

- Les diagrammes ("tableau blanc") (lien inclus en fin de formation)
- Les slides dans le dossier "slides"
- Les quelques exemples isolés dans le dossier "samples"
- Le gros TP dans le dossier "app"

### Le TP

Chat avec bot et commandes :

- [ ] Authentification
- [ ] Envoi/réception de message
- [ ] Rooms
- Bot "fibo" (pool de workers "simple")
- Bot "NLP"

```
curl \
 -H 'Authorization: Bearer JJDAZQIGNWULDUPMPMC7FFNFJGB43ANJ' \
 'https://api.wit.ai/message?v=20210120&q=Jette%20neuf%20dés%20à%2012%20faces'
```

Pré-requis :

- Node
- Serveur Redis
  * Pour Windows [voir ServiceStack/redis-windows](https://github.com/ServiceStack/redis-windows)
  * Avec Docker : `docker run --name redis-formation -p 6379:6379 redis -d` puis `docker [start|stop|rm] redis-formation`
    * Client : `docker exec -it redis-formation redis-cli`

#### Démarrage

* Installation des dépendances : `npm install`
* Reste à définir

#### Idées d'évolution

À définir