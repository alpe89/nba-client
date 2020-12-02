# MVP

Questa branch rappresenta il minimo shippabile secondo le specifiche ricevute.

## Specifiche

- [x] Ricerca giocatore per Nome e Cognome
- [x] Visualizzazione di dettaglio del giocatore con immagine
- [x] Visualizzazione di dettaglio della squadra del giocatore
- [x] Gestione errori API
- [x] Utilizzo di Redux

## Analisi

Vista la richiesta si è optato per mantenere al minimo la complessità dell'applicazione utilizzando una libreria di componenti già rodata e testata [Ant Design](https://ant.design/) a scopo di prototipo. L'idea generale è di avere due "pagine" distinte, la **Home** ed il **Riepilogo del giocatore**, rispettivamente all'endpoint / e /player. Visto il requisito dell'utilizzo di Redux per rappresentare lo stato globale dell'applicazione, e non avendo trovato molto da poter ricondurre alle logiche di Redux, si è deciso di rappresentare il giocatore scelto all'interno dello stato per poi poterlo passare alla pagina di **Riepilogo del giocatore**.

## Utilizzo di Redux

Per quanto l'app fosse tranquillamente gestibile senza l'utilizzo di Redux, esso è stato implementato per l'unico elemento comune a più parti dell'applicazione. Visto che è il mio primo utilizzo di Redux e Typescript ho provato a sperimentare con i nuovi Hooks inseriti nel package @reduxjs/toolkit.

## Hooks

Al momento è presente un singolo Hook Custom, esso aiuta ad evitare di riutilizzare la logica dell'estrarre dati da un endpoint fornendo diverse informazioni utili gestendo le problematiche più comuni. Non è sicuramente un Hook pensato per una applicazione che debba andare in produzione mancando in primo luogo di qualsasi tipo di unit test, oltre che a far fronte ad usi specifici (quello specifico di questo progetto), come ad esempio la possibilità di inviare solamente richieste di tipo GET.

## Custom Types / Interfaces

Al momento ho scelto di rendere con una interfaccia il giocatore (Player) e la squadra (Team). Ci sono nel progetto altre interfacce per Redux o per le props nei vari componenti React, ma questi sono di utilizzo comune in una qualsiasi applicazione scritta con React, Typescript e Redux.

### Vista Home

La vista principale dell'app consiste fondamentalmente in un input di ricerca di un giocatore che accetta, come valore, una stringa qualsiasi ed interroga l'API messaci a disposizione per ricavare i dati del giocatore. Una volta cliccato il pulsante di ricerca o premuto il pulsante invio mentre si ha selezionato l'input di ricerca, verrà inviata una richiesta GET all'API di riferimento ed il risultato di questa interrogazione che può contenere i dati di più giocatori, verrà visualizzato sotto forma di elementi cliccabili. Per ogni elemento a schermo sarà visualizzato il nome, il cognome e la squadra di appartenenza del giocatore rappresentato e sarà possibile cliccare tramite il tasto destro del mouse uno di questi elementi; al click verranno caricate nello stato globale mantenuto dalla libreria Redux le informazioni del giocatore scelto ed immediatamente verrà fatto un redirect verso la pagina di **Riepilogo del giocatore**. Grazie all'utilizzo di Redux e di React-Router è possibile utilizzare le frecce del browser per tornare indietro ed avanti di una pagina e mantenere gli stessi dati senza effettuare nuovamente la ricerca del giocatore.

### Vista Riepilogo del giocatore

La vista di Riepilogo del giocatore semplicemente visualizza i dati provenienti dallo stato mantenuto da Redux a riguardo del giocatore scelto nella vista Home. L'unica aggiunta fatta alla specifica è stato il salvataggio dei loghi delle squadre NBA in immagini situate nella cartella _public/logos_ e che vengono mostrate in base alla squadra di appartenenza a fianco delle generalità dell'atleta.

