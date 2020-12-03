# LEAGUE INSPECTOR
_Link al deploy:_[Link](https://gray-ocean-0148f5303.azurestaticapps.net)

# Indice

- [LEAGUE INSPECTOR](#league-inspector)
- [Indice](#indice)
- [Specifiche](#specifiche)
- [Istruzioni per l'utilizzo](#istruzioni-per-lutilizzo)
- [Analisi](#analisi)
- [Vista Home](#vista-home)
- [Vista Riepilogo del giocatore](#vista-riepilogo-del-giocatore)
- [Utilizzo di Redux](#utilizzo-di-redux)
- [Hooks](#hooks)
- [Custom Types / Interfaces](#custom-types--interfaces)
- [Improvements](#improvements)

# Specifiche

- [x] Ricerca giocatore per Nome e Cognome
- [x] Visualizzazione di dettaglio del giocatore con immagine
- [x] Visualizzazione di dettaglio della squadra del giocatore
- [x] Gestione errori API
- [x] Utilizzo di Redux
- [x] Deploy della branch Master su Azure tramite CI/CD
- [x] Mostrare gli altri giocatori della squadra
- [ ] Unit Test di esempio 

# Istruzioni per l'utilizzo

Per utilizzare il progetto per prima cosa clonare il repo
```bash
git clone https://github.com/alpe89/nba-client
```
Successivamente entrare nella cartella e procedere all'installazione dei moduli necessari per l'avvio dell'app
```bash
cd nba-client && npm install
```
Infine eseguire il comando start tramite npm
```bash
npm start
```

_Il progetto è stato creato tramite [create-react-app](https://github.com/facebook/create-react-app), quindi ogni comando descritto nelle loro docs funzionerà anche qui_

# Analisi

Vista la richiesta si è optato per mantenere al minimo la complessità dell'applicazione utilizzando una libreria di componenti già rodata e testata [Ant Design](https://ant.design/) a scopo di prototipo. L'idea generale è di avere due "pagine" distinte, la **Home** ed il **Riepilogo del giocatore**, rispettivamente all'endpoint / e /player. Visto il requisito dell'utilizzo di Redux per rappresentare lo stato globale dell'applicazione, e non avendo trovato molto da poter ricondurre alle logiche di Redux, si è deciso di rappresentare il giocatore scelto all'interno dello stato per poi poterlo passare alla pagina di **Riepilogo del giocatore**. Per quanto la richiesta finale, ossia quella di visualizzare gli altri giocatori facenti parte della squadra del giocatore selezionato, l'idea che ho avuto vista l'assenza di un filtro nell'API per la ricerca direttamente dei giocatori per team_id, è quella di cercare l'ultima partita giocata dal giocatore selezionato, ricavare l'id della partita e poi effettuare una ricerca di tutti i record per quella partita tramite l'API che espone i dati delle partite. Da qui possiamo filtrare in base all'id del team e recuperare gli ID di tutti i giocatori dello stesso team ed eseguire le varie richieste all'API dei giocatori ricavando anche i loro dati. Idealmente una volta ricavati i dati dei giocatori di un Team sarebbe bene salvarli nello stato globale gestito da Redux, sia per motivi di velocità di ricerca (non bisogna più fare chiamate HTTP per ricavare i dati), sia per il rate limiter imposto dagli sviluppatori dell'API (60 richieste per minuto). Viste le limitazioni dell'API al momento si riesce a trovare i dati dei compagni di squadra solamente se un giocatore ha disputato almeno una partita nell'annata 2019-2020, altrimenti appare un messaggio che spiega il problema.
# Vista Home

La vista principale dell'app consiste fondamentalmente in un input di ricerca di un giocatore che accetta, come valore, una stringa qualsiasi ed interroga l'API messaci a disposizione per ricavare i dati del giocatore. Una volta cliccato il pulsante di ricerca o premuto il pulsante invio mentre si ha selezionato l'input di ricerca, verrà inviata una richiesta GET all'API di riferimento ed il risultato di questa interrogazione che può contenere i dati di più giocatori, verrà visualizzato sotto forma di elementi cliccabili. Per ogni elemento a schermo sarà visualizzato il nome, il cognome e la squadra di appartenenza del giocatore rappresentato e sarà possibile cliccare tramite il tasto destro del mouse uno di questi elementi; al click verranno caricate nello stato globale mantenuto dalla libreria Redux le informazioni del giocatore scelto ed immediatamente verrà fatto un redirect verso la pagina di **Riepilogo del giocatore**. Grazie all'utilizzo di Redux e di React-Router è possibile utilizzare le frecce del browser per tornare indietro ed avanti di una pagina e mantenere gli stessi dati senza effettuare nuovamente la ricerca del giocatore.

# Vista Riepilogo del giocatore

La vista di Riepilogo del giocatore semplicemente visualizza i dati provenienti dallo stato mantenuto da Redux a riguardo del giocatore scelto nella vista Home. L'unica aggiunta fatta alla specifica è stato il salvataggio dei loghi delle squadre NBA in immagini situate nella cartella _public/logos_ e che vengono mostrate in base alla squadra di appartenenza a fianco delle generalità dell'atleta.


# Utilizzo di Redux

Per quanto l'app fosse tranquillamente gestibile senza l'utilizzo di Redux, esso è stato implementato per l'unico elemento comune a più parti dell'applicazione. Visto che è il mio primo utilizzo di Redux e Typescript ho provato a sperimentare con i nuovi Hooks inseriti nel package @reduxjs/toolkit.
Successivamente ho pensato all'idea di salvare nello stato tutti i Team di cui abbia già ricavato i dati dei componenti così da non dover rifare le chiamate all'API in un momento successivo.

# Hooks

Al momento è presente un singolo Hook Custom, esso aiuta ad evitare di riutilizzare la logica dell'estrarre dati da un endpoint fornendo diverse informazioni utili gestendo le problematiche più comuni. Non è sicuramente un Hook pensato per una applicazione che debba andare in produzione mancando in primo luogo di qualsasi tipo di unit test, oltre che a far fronte ad usi specifici (quello specifico di questo progetto), come ad esempio la possibilità di inviare solamente richieste di tipo GET.

# Custom Types / Interfaces

Al momento ho scelto di rendere con una interfaccia il giocatore (Player) e la squadra (Team). Ci sono nel progetto altre interfacce per Redux o per le props nei vari componenti React, ma questi sono di utilizzo comune in una qualsiasi applicazione scritta con React, Typescript e Redux.

# Improvements

L'app come già detto è solo un prototipo e sicuramente non è production ready, manca una gestione degli errori derivanti dall'API precisa. Inoltre si potrebbe rendere persistente i dati dei Team salvandoli nel local storage, mettendo come data di scadenza di questi dati una tempo ragionevole (i team non cambiano spesso). Ad esempio una volta caricati in memoria i dati dei Team, questi possono essere scritti nel local storage per una settimana e, ad ogni accesso all'app, questi verrebbero caricati direttamente dal local storage creando una vera e propria cache. Inoltre ci sarebbe molto da migliorare nella composizione dei vari componenti, soprattutto il componente PlayerCard è lungo e complesso; sicuramente in una app che deve andare in produzione si dovrebbe fare del refactoring e separare in più componenti le parti con logica. Visto che la gestione degli errori avviene tramite dei popup, sarebbe il caso di predisporre un componente (o ancor meglio un Hook) da importare e che gestisca in totale autonomia la gestione dell'errore, passando solamente una variabile di stato che possa attivare la visualizzazione del popup.