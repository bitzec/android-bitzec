// @flow
import type { TRANSLATION_OBJ } from '../types'

export const ITALIAN_TRANSLATION: TRANSLATION_OBJ = {
  General: {
    loading: 'caricamento...',
    address: 'Indirizzo',
    privateKey: 'Chiave Privata',
    cancel: 'Annulla',
    fees: 'Costi',
    version: 'Versione',
    in: 'In',
    out: 'Out'
  },
  MainPage: {
    title: 'BZC Wallet',
    value: 'Valore',
    send: 'Invia',
    received: 'Ricevi',
    sent: 'Inviato',
    noTxFound: 'Nessuno storico delle transazioni.',
    noConnection: 'Disconnesso'
  },
  AddressInfoPage: {
    copyToClipboard: 'Copia Indirizzo negli Appunti'
  },
  SendPage: {
    title: 'Invia BZC',
    payTo: 'Paga a',
    amountToPay: 'Ammontare del pagamento',
    balance: 'Saldo',
    networkFee: 'Costo Network',
    slowTx: 'Transazione Lenta',
    fastTx: 'Transazione Veloce',
    from: 'Da',
    toAddress: 'A Indirizzo',
    amount: 'Quantità',
    max: 'Massimo',
    send: 'Invia',
    txSuccessful: 'Transazione avvenuta con successo! Clicca qui per i dettagli.',
    confirmSend: 'Confermo l\'invio di questi BZC',
    invalidAddress: 'L\'indirizzo di destinazione `A Indirizzo` non è valido. Al momento sono supportati solo gli indirizzi Transparent.',
    invalidAmount: '`Quantità` non valida.',
    invalidFee: '`Costo` non valido. Prova 0 :)',
    bitzecAmount: 'La quantità deve essere maggiore di 0.',
    notEnoughZEN: 'Non hai abbastanza BZC per eseguire la transazione.',
    noCameraPermissions: 'Autorizzazione accesso fotocamera negata. Puoi abilitarla nelle impostazioni di sistema.'
  },
  TxDetailPage: {
    txid: 'Id Transazione',
    blockhash: 'Hash Blocco',
    blockheight: 'Altezza Blocco',
    confirmations: 'Conferme'
  },
  SettingsPage: {
    title: 'Impostazioni',
    language: 'Lingua',
    currency: 'Valuta',
    secretPhrase: 'Mostra Frase Segreta',
    showPrivateKeys: 'Mostra Chiavi Private',
    recoverExistingWallet: 'Importa Wallet Esistente',
    current: 'Attuale'
  },
  SecretPhrasePage: {
    title: 'Frase Segreta'
  },
  ShowPrivateKeyPage: {
    title: 'Chiavi Private'
  },
  RecoverExistingWalletPage: {
    title: 'Importa Wallet Esistente',
    secretPhrase: 'Frase segreta',
    textareaPlaceholder: 'Frase segreta. minimo 15 caratteri',
    confirmUnderstand: 'Confermo di voler importare il wallet e di voler cancellare quello attualmente presente.',
    recover: 'Importa'
  },
  AboutPage: {
    title: 'Informazioni su'
  },
  PinPage: {
    changePinTitle: 'Cambia PIN',
    newPinPageTitle: 'BZC Wallet Installazione',
    verifyPinPageTitle: 'BZC Wallet Verifica PIN',
    setupNewPin: 'Crea un novo PIN di 4 cifre',
    reenterPin: 'Riscrivi il tuo PIN',
    pinsNotSimilar: 'I PIN inseriti non coincidono',
    invalidPin: 'PIN non valido',
    enterYourPin: 'Inserisci il tuo PIN di 4 cifre'
  },
  ContactsPage: {
    contacts: 'Contatti',
    contactsName: 'Nome',
    contactsAddress: 'Indirizzo',
    noContactsFound: 'Nessun contatto trovato.'
  }
}
