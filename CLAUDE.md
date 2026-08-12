# Contesto progetto — Cassa "Pizza in piazza"

## Cosa stiamo facendo
Nella cartella c'è `cassa_pizzata.html`: **una bozza funzionante ma da rifinire insieme**.
È il sistema di cassa per una serata pizza organizzata dalla Pro Loco Vivo d'Orcia in piazza,
**giovedì 13 agosto**. Non è codice da riscrivere da zero: funziona, va sistemato nei dettagli.

Prima di modificare, leggi tutto il file e dimmi cosa non ti convince.
Voglio ragionare insieme sulle scelte, non ricevere una riscrittura completa.

## Come funziona l'evento
- Una signora esterna viene in piazza col forno a legna e cuoce le pizze.
- Noi (Pro Loco) prepariamo antipasto (ciaccino bianco con affettato) e dolce (salame al cioccolato).
- **Si paga alla cassa all'ingresso**, prima di sedersi. La cassa assegna anche il tavolo.
- **Menù fisso €20 a persona**: antipasto + pizza + dolce + bevanda.
- Antipasto e bevande si ritirano subito a un banco accanto alla cassa: NON passano dalle comande.
- **Prima dell'apertura del servizio ai tavoli si fa asporto**, a prezzo per singola pizza
  (niente menù fisso, niente tavolo, niente coperti).

## Menù pizze (5, fisse)
Margherita · Bianca con crudo · Margherita con salsiccia ·
Margherita con salame piccante · Napoli (pomodoro, acciughe, capperi)

Margherita e Napoli costano meno delle farcite: nell'asporto ogni pizza ha il suo prezzo,
modificabile dall'interfaccia e salvato in locale.

## Struttura dei tagliandi (ragionata a lungo, NON cambiarla senza discuterne)

**Modalità TAVOLO** — un foglio, tre tagliandi:
1. **Tagliando forno** → alla pizzaiola. N° comanda e TAVOLO grandi, solo le pizze
   effettivamente ordinate (non le righe a zero). Niente prezzi: al forno non servono.
2. **Matrice cassa** → resta in cassa, si infilza. N°, tavolo, coperti, incassato.
   Serve per la quadratura di fine serata.
3. **Copia cliente** → al tavolo. Con in fondo un **buono dolce staccabile a mano**
   (linea tratteggiata marcata, non da tagliare con la taglierina).
   Il cliente lo consegna a un cameriere quando vuole il dolce: così i dolci escono
   scaglionati invece che tutti insieme.

**Modalità ASPORTO** — stessa logica ma:
- niente tavolo → c'è il **nome del cliente** (senza, la pizzaiola non sa a chi dare la pizza)
- numerazione separata con prefisso **A** (A1, A2…) per non confondersi con i tavoli
- lo scontrino cliente ha la colonna importi e il totale
- niente buono dolce, niente coperti

**Chiusura cassa** — foglio A4 con incasso diviso tavoli/asporto, pizze per tipo con
percentuali, tabella afflusso per ora, e indicatori per la prossima edizione
(ora di picco, coperti medi, pizze per coperto, quota asporto, scontrino medio).

## Vincoli tecnici — NON NEGOZIABILI

1. **Deve funzionare completamente offline.** In piazza non c'è wifi.
   → nessuna CDN, nessuna libreria esterna, nessun font remoto, nessuna chiamata di rete.
   Il grafico è fatto a mano con div/CSS apposta per questo. Se serve un grafico più
   ricco, si fa in SVG inline, non con una libreria.
2. **File singolo HTML**, nessun build step. Vanilla JS, niente framework.
   Deve funzionare aprendolo con doppio clic da `file://`.
3. **Deve girare sia su iPad (Safari) che su PC.** Touch target da almeno 44px,
   input che non fanno zoomare iOS al focus.
4. **Stampa**: due formati (A4 foglio unico da tagliare / A5 fogli separati) e tre viste
   (tagliandi tavolo, tagliandi asporto, chiusura cassa). Gestita con `@page` riscritto
   a runtime + classi sul body.
   Margini di stampa a 12mm: sotto quella soglia la stampante taglia i bordi.
5. **Dati in localStorage**, nessun backend. Ogni comanda salvata con timestamp.
   Presenti già: annulla ultima comanda, export CSV, azzera serata con doppia conferma.

## Stampante di destinazione
HP DeskJet 2820e. Supporta A4 e A5, AirPrint, Wi-Fi Direct.
~10-12 secondi a foglio: in A5 una comanda sono 3 fogli, quindi 30 secondi.
Per questo l'A4 resta il formato principale e l'A5 un'opzione.

## Vincolo di tempo
L'evento è **giovedì 13 agosto**. Le funzionalità sono **congelate**:
da qui in avanti solo rifiniture e correzioni su quello che c'è già.
Se ti viene in mente una funzione nuova, **proponimela ma non implementarla**:
decido io se sta dentro o fuori. Il rischio da evitare non è che manchi qualcosa,
è che una modifica dell'ultimo minuto rompa la stampa.

## Come voglio lavorare
- Prima di ogni modifica non banale, dimmi cosa cambi e perché. Una cosa alla volta.
- Stile diretto e concreto, niente teoria. Sono un tecnico, non serve spiegarmi le basi.
- Se sto complicando qualcosa inutilmente o sto sbagliando approccio, dimmelo.
- Dopo ogni modifica alla stampa, ricordami di rifare la prova su carta:
  è l'unica parte che non si verifica leggendo il codice.

## Da fare (in ordine)
1. Leggi il file e dimmi cosa non ti torna, prima di toccare qualsiasi cosa.
2. Poi ti dico io le "cosette" da sistemare e le affrontiamo una per una.
