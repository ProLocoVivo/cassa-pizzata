#!/bin/bash
# Cassa "Pizza in piazza" - avvio su Mac.
#
# Apre la cassa in una finestra senza barre, come un'applicazione, e attiva la
# stampa silenziosa: premendo Stampa il foglio esce e basta, senza pannelli.
#
# Doppio clic su questo file. Se il Mac dice che non e' autorizzato:
#   tasto destro -> Apri -> Apri.
#
# IMPORTANTE: usa sempre questo lanciatore e non Chrome normale. Le comande
# registrate vivono nel profilo qui sotto: aprendo la cassa da un'altra finestra
# di Chrome si vedrebbe una cassa vuota.

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PROFILO="$HOME/.cassa-pizzata"
URL="https://prolocovivo.github.io/cassa-pizzata/cassa_pizzata.html"

if [ ! -x "$CHROME" ]; then
  echo "Google Chrome non trovato in /Applications."
  echo "Se e' altrove, correggi la riga CHROME= qui sopra."
  read -r -p "Premi Invio per chiudere."
  exit 1
fi

# --kiosk-printing  : window.print() stampa subito sulla predefinita, niente pannello
# --app             : finestra pulita, senza schede ne' barra indirizzi
# --user-data-dir   : profilo dedicato, cosi' i dati della serata restano separati
exec "$CHROME" \
  --kiosk-printing \
  --user-data-dir="$PROFILO" \
  --app="$URL"
