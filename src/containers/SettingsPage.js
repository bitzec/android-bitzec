import PropTypes from 'prop-types'
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setQrScanning } from '../actions/Context'

import { setLanguage, setCurrency } from '../actions/Settings'

import {
  Page,
  Toolbar,
  BackButton,
  List,
  ListHeader,
  ListItem
} from 'react-onsenui'

import ChangePinPage from './ChangePinPage'
import SecretPhrasePage from './SecretPhrasePage'
import RecoverWalletPage from './RecoverWalletPage'
import ShowPrivateKeyPage from './ShowPrivateKeyPage'
import SelectCurrencyPage from './SelectCurrencyPage'
import SelectLanguagePage from './SelectLanguagePage'
import SelectInsightPage from './SelectInsightPage'

import TRANSLATIONS from '../translations'

class SettingsPage extends React.Component {
  componentDidMount() {
    window.ga.trackView('Settings Page')
  }

  gotoComponent (c) {
    this.props.navigator.pushPage({component: c})
  }

  renderToolbar () {
    // Translation stuff
    const CUR_LANG = this.props.settings.language
    const titleLang = TRANSLATIONS[CUR_LANG].SettingsPage.title

    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          { titleLang }
        </div>
      </Toolbar>
    )
  }

  render () {
    // For qr scanning
    const pageOpacity = this.props.context.qrScanning ? '0.0' : '1.0'
    const pageStyle = this.props.context.qrScanning ? { opacity: pageOpacity, visibility: 'visible', transition: 'all 0.1s ease-out' } : {}

    // Translation stuff
    const CUR_LANG = this.props.settings.language

    const changePinLang = TRANSLATIONS[CUR_LANG].PinPage.changePinTitle
    const currencyLang = TRANSLATIONS[CUR_LANG].SettingsPage.currency
    const languageLang = TRANSLATIONS[CUR_LANG].SettingsPage.language
    const secretPhraseLang = TRANSLATIONS[CUR_LANG].SettingsPage.secretPhrase
    const showPrivateKeysLang = TRANSLATIONS[CUR_LANG].SettingsPage.showPrivateKeys
    const recoverExistingWalletLang = TRANSLATIONS[CUR_LANG].SettingsPage.recoverExistingWallet

    return (
      <Page
        style={pageStyle}
        renderToolbar={this.renderToolbar.bind(this)}>
        <List>
          <ListItem id="mainlist"
            onClick={this.gotoComponent.bind(this, SelectInsightPage)}
            tappable>
            Insight API
          </ListItem>
          <ListHeader id="mainlist"></ListHeader>
          <ListItem id="mainlist"
            onClick={this.gotoComponent.bind(this, SelectLanguagePage)}
            tappable>
            { languageLang }
          </ListItem>
          <ListItem id="mainlist"
            onClick={this.gotoComponent.bind(this, SelectCurrencyPage)}
            tappable>
            { currencyLang }
          </ListItem>
          <ListHeader id="mainlist"></ListHeader>
          <ListItem id="mainlist"
            onClick={this.gotoComponent.bind(this, ChangePinPage)}
            tappable>
            { changePinLang }
          </ListItem>
          <ListHeader id="mainlist"></ListHeader>
          <ListItem id="mainlist"
            onClick={this.gotoComponent.bind(this, SecretPhrasePage)}
            tappable>
            { secretPhraseLang }
          </ListItem>
          <ListItem id="mainlist"
            onClick={this.gotoComponent.bind(this, ShowPrivateKeyPage)}
            tappable>
            { showPrivateKeysLang }
          </ListItem>
          <ListItem id="mainlist"
            onClick={this.gotoComponent.bind(this, RecoverWalletPage)}
            tappable style={{color: 'red'}}>
            { recoverExistingWalletLang }
          </ListItem>
        </List>
      </Page>
    )
  }
}

SettingsPage.propTypes = {
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  setLanguage: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    settings: state.settings,
    context: state.context
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
      setLanguage,
      setCurrency,
      setQrScanning
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SettingsPage)
