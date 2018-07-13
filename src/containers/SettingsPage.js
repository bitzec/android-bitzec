import PropTypes from 'prop-types'
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
        <div className='left' style={{color: '#ffd700', background: '#000000'}}>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center' style={{color: '#ffd700', background: '#000000'}}>
          { titleLang }
        </div>
        <div className='right' style={{color: '#ffd700', background: '#000000'}}>
        </div>
      </Toolbar>
    )
  }

  render () {
    // Translation stuff
    const CUR_LANG = this.props.settings.language

    const changePinLang = TRANSLATIONS[CUR_LANG].PinPage.changePinTitle
    const currencyLang = TRANSLATIONS[CUR_LANG].SettingsPage.currency
    const languageLang = TRANSLATIONS[CUR_LANG].SettingsPage.language
    const secretPhraseLang = TRANSLATIONS[CUR_LANG].SettingsPage.secretPhrase
    const showPrivateKeysLang = TRANSLATIONS[CUR_LANG].SettingsPage.showPrivateKeys
    const recoverExistingWalletLang = TRANSLATIONS[CUR_LANG].SettingsPage.recoverExistingWallet

    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <div id="settings">
          <List style={{color: '#ffd700', background: '#515151'}}>
            <ListItem
              onClick={this.gotoComponent.bind(this, SelectInsightPage)}
              tappable style={{color: '#ffd700', background: '#515151'}}>
              Insight API
            </ListItem>
            <ListHeader style={{color: '#ffd700', background: '#515151'}}></ListHeader>
            <ListItem
              onClick={this.gotoComponent.bind(this, SelectLanguagePage)}
              tappable style={{color: '#ffd700', background: '#515151'}}>
              { languageLang }
            </ListItem>
            <ListItem
              onClick={this.gotoComponent.bind(this, SelectCurrencyPage)}
              tappable style={{color: '#ffd700', background: '#515151'}}>
              { currencyLang }
            </ListItem>
            <ListHeader style={{color: '#ffd700', background: '#515151'}}></ListHeader>
            <ListItem
              onClick={this.gotoComponent.bind(this, ChangePinPage)}
              tappable style={{color: '#ffd700', background: '#515151'}}>
              { changePinLang }
            </ListItem>
            <ListHeader style={{color: '#ffd700', background: '#515151'}}></ListHeader>
            <ListItem
              onClick={this.gotoComponent.bind(this, SecretPhrasePage)}
              tappable style={{color: '#ffd700', background: '#515151'}}>
              { secretPhraseLang }
            </ListItem>
            <ListItem
              onClick={this.gotoComponent.bind(this, ShowPrivateKeyPage)}
              tappable style={{color: '#ffd700', background: '#515151'}}>
              { showPrivateKeysLang }
            </ListItem>
            <ListItem
              onClick={this.gotoComponent.bind(this, RecoverWalletPage)}
              tappable style={{color: 'red', background: '#515151'}}>
              { recoverExistingWalletLang }
            </ListItem>
          </List>
        </div>
      </Page>
    )
  }
}

SettingsPage.propTypes = {
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  setLanguage: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    settings: state.settings
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
      setLanguage,
      setCurrency
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SettingsPage)
