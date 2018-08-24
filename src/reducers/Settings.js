// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill
import 'babel-polyfill'

import {
  LANG_ENGLISH,
  CURRENCY_USD,
  SET_LANGUAGE,
  SET_CURRENCY,
  SET_WALLET_PIN,
  SET_INSIGHT_API,
  SET_SAVE_DATA
} from '../actions/Settings'

const initialSettings = {
  insightAPI: 'https://zeroapi.cryptonode.cloud/',
  explorerURL: 'https://zero.cryptonode.cloud/insight/',
  language: LANG_ENGLISH,
  currency: CURRENCY_USD,
  pin: null,
  saveData: false
}

export default function SettingsReducer (state = initialSettings, action) {
  switch (action.type) {
    case SET_WALLET_PIN:
      return Object.assign({}, state, {
        pin: action.pin
      })

    case SET_CURRENCY:
      return Object.assign({}, state, {
        currency: action.currency
      })

    case SET_LANGUAGE:
      return Object.assign({}, state, {
        language: action.language
      })

    case SET_INSIGHT_API:
      return Object.assign({}, state, {
        insightAPI: action.insightAPI
      })

    case SET_SAVE_DATA:
      return Object.assign({}, state, {
        saveData: action.saveData
      })

    default:
      return state
  }
}
