# cookies-cross-domain

1. Configurer son `/etc/host` :
   ```
   127.0.0.1 localhost.a
   127.0.0.1 localhost.b
   ```
3. Ouvrir http://localhost.a:3000/
4. Regarder la console et vérifier qu'à la seconde ouverture de http://localhost.a:3000/, le cookie fixé sur le domaine localhost.b est visible dans la console
