// @flow
import type { TRANSLATION_OBJ } from '../types'

export const RUSSIAN_TRANSLATION: TRANSLATION_OBJ = {
  General: {
    loading: 'загрузка...',
    address: 'Адрес',
    privateKey: 'Приватный ключ',
    cancel: 'Отменить',
    fees: 'Комиссия',
    version: 'Версия',
    in: 'Зашло', // still sounds wrong but I've checked a lot of different BTC wallets and it's really bad everywhere.
    out: 'Ушло' // still sounds wrong but I've checked a lot of different BTC wallets and it's really bad everywhere.
  },
  MainPage: {
    title: 'BZC кошелек',
    value: 'На счету',
    send: 'Отправить',
    received: 'Получено',
    sent: 'Отправлено',
    noTxFound: 'Не найдена история транзакций.',
    noConnection: 'В соединении отказано.'
  },
  AddressInfoPage: {
    copyToClipboard: 'Скопировать адрес'
  },
  SendPage: {
    title: 'Отправить BZC',
    payTo: 'Заплатить на',
    amountToPay: 'Сумма к оплате',
    balance: 'Баланс',
    networkFee: 'Комиссия сети',
    slowTx: 'Медленно',
    fastTx: 'Быстро',
    from: 'С адреса',
    toAddress: 'На адрес',
    amount: 'Количество',
    max: 'Макс',
    send: 'Отправить',
    txSuccessful: 'Транзакция успешна! Кликните сюда чтобы просмотреть транзакцию.',
    confirmSend: 'Да, Я хочу отправить BZC',
    invalidAddress: 'Неверный адрес. Пока поддерживаются только прозрачные адреса.',
    invalidAmount: 'Неверная сумма.',
    invalidFee: 'Неверная комиссия.',
    bitzecAmount: 'Количество ZEN должно быть больше 0.',
    notEnoughZEN: 'На кошельке недостаточно подтвержденного BZC для транзакции.',
    noCameraPermissions: 'Камера не разрешена. Вы можете разрешить доступ к камере в настройках.'
  },
  TxDetailPage: {
    txid: 'Номер транзакции',
    blockhash: 'Хэш блока',
    blockheight: 'Высота блока',
    confirmations: 'Подтверждения'
  },
  SettingsPage: {
    title: 'Настройки',
    language: 'Язык',
    currency: 'Валюта',
    secretPhrase: 'Показать секретную фразу',
    showPrivateKeys: 'Показать приватные ключи',
    recoverExistingWallet: 'Восстановить существующий кошелек',
    current: 'Сейчас'
  },
  SecretPhrasePage: {
    title: 'Секретная фраза'
  },
  ShowPrivateKeyPage: {
    title: 'Приватные ключи'
  },
  RecoverExistingWalletPage: {
    title: 'Восстановить существующий кошелек',
    secretPhrase: 'Секретная фраза',
    textareaPlaceholder: 'секретная фраза. мин. 16 символов',
    confirmUnderstand: 'Я понимаю что при восстановлении кошелька текущий кошелек будет уничтожен',
    recover: 'Восстановить'
  },
  AboutPage: {
    title: 'О программе'
  },
  PinPage: {
    changePinTitle: 'Изменить PIN',
    newPinPageTitle: 'Настройка BZC кошелька',
    verifyPinPageTitle: 'BZC кошелек подтверждение PIN',
    setupNewPin: 'Введите новый 4-значный PIN',
    reenterPin: 'Повторите ваш PIN',
    pinsNotSimilar: 'Введеные PIN-ы не совпадают',
    invalidPin: 'Неверный PIN',
    enterYourPin: 'Введите свой 4-значный PIN-код'
  },
  ContactsPage: {
    contacts: 'Контакты',
    contactsName: 'Имя',
    contactsAddress: 'Адрес',
    noContactsFound: 'Контакты не найдены.'
  }
}
