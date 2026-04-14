# Configuration Firebase runtime

Cette version conserve la logique du site original :

- la configuration Firebase est saisie depuis le panneau Admin
- elle est stockée dans `localStorage` sous la clé `yell_firebase_config`
- si aucune configuration n'est fournie, le site fonctionne en local

Format attendu :

```json
{
  "apiKey": "...",
  "authDomain": "...",
  "databaseURL": "https://xxxx.firebaseio.com",
  "projectId": "...",
  "storageBucket": "...",
  "messagingSenderId": "...",
  "appId": "..."
}
```
