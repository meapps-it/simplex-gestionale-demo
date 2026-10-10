export class SyncEngine {
 constructor(repo,notify){this.repo=repo;this.notify=notify;}
 async run(){this.notify(navigator.onLine?'demo':'offline');}
 async resolve(){throw Error('Nessuna sincronizzazione cloud nella demo.');}
}
