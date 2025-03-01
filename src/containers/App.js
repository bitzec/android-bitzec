// Page that does the funky loading animation while reading files
// Or page that displays the MainPage. this page exists because
// of the async nature of JS
import PropTypes from 'prop-types'
import React from 'react'

import {
  Page,
  Icon,
  Navigator
} from 'react-onsenui'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setContacts } from '../actions/Contacts'
import { setSecretPhrase, setSecretItems } from '../actions/Secrets'
import { setLanguage, setCurrency, setWalletPin, setInsightAPI, setSaveData } from '../actions/Settings'

import { ZENCASH_MOBILE_SAVE_PATH, ZENCASH_MOBILE_CONTACTS_PATH, readFromFile } from '../utils/persistentStorage'
import { phraseToSecretItems } from '../utils/wallet'

import MainPage from './MainPage'
import SetupPage from './SetupPage'
import NewPinPage from './NewPinPage'
import VerifyPinPage from './VerifyPinPage'

import ZENCASH_IMG from '../../assets/img/zencash.png'

const renderPage = (route, navigator) => (
  <route.component key={route.key} navigator={navigator} />
)

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tempPin: '',
      hasExistingWallet: false,
      hasExistingPin: false,
      hasInputPin: false,
      readSavedFile: false,
      parseError: false,
      stringData: ''
    }
  }

  componentDidMount () {
    readFromFile(ZENCASH_MOBILE_CONTACTS_PATH, (data) => {
      // Get contact list

      //hacky fix to duplicate json data saved to contacts file on iOS.
      //investigate permanent fix
      if (data.length>0) {
        while (data.indexOf('contacts') !== data.lastIndexOf('contacts')) {
            data = data.substring(0, data.lastIndexOf('contacts')-4)
        }
      }

      try {
        data = JSON.parse(data)
      } catch (err) {
        data = {contacts: []}
      }
      this.props.setContacts(data.contacts)
    }, () => {})

      readFromFile(ZENCASH_MOBILE_SAVE_PATH, (data) => {
        // If errors while we're reading the JSOn
        // then just assume its empty

        //hacky fix to duplicate json data saved to setting file on iOS.
        //investigate permanent fix
        if (data.length>0) {
          while (data.indexOf('secretPhrase') !== data.lastIndexOf('secretPhrase')) {
              data = data.substring(0, data.lastIndexOf('secretPhrase')-4)
          }
        }

        this.setState({stringData: 'JSON file ' + data})

        try {
          data = JSON.parse(data)
        } catch (err) {
          //if (data.length>0) {
          //    this.setState({parseError: true})
          //} else {
            data = {}
          //}
        }

        // Get secret phrase
        if (data.secretPhrase !== undefined) {
          const secretPhrase = data.secretPhrase
          const secretItems = phraseToSecretItems(secretPhrase)

          this.props.setSecretItems(secretItems)
          this.props.setSecretPhrase(secretPhrase)

          this.setState({
            hasExistingWallet: true
          })
        }

        // Get settings
        if (data.settings !== undefined) {
          if (data.settings.language !== undefined) {
            const settingsLanguage = data.settings.language
            this.props.setLanguage(settingsLanguage)
          }

          if (data.settings.insightAPI !== undefined) {
            const settingsLanguage = data.settings.insightAPI
            this.props.setInsightAPI(settingsLanguage)
          }

          if (data.settings.currency !== undefined && data.settings.currency !== null) {
            const settingsCurrency = data.settings.currency
            this.props.setCurrency(settingsCurrency)
          }

          if (data.settings.pin !== undefined && data.settings.pin !== null) {
            const settingsPin = data.settings.pin
            this.props.setWalletPin(settingsPin)

            this.setState({
              hasExistingPin: true
            })
          }
        }

        //console.log('file read' + i.toString())
        if (this.state.parseError === false) {
          this.setState({
            readSavedFile: true
          })
        }
      }, (err) => {
        //console.log('file not read' + i.toString())

        if (this.state.parseError === false) {
          this.setState({
            readSavedFile: true
          })
        }

        // Cordova plugin might not work for
        // All api versions. in the event...
        // alert('Unable to read file. Error: ' + JSON.stringify(err))
        console.log(err) // Just to stop eslint from complaining
      })
    //}
    //this.props.setSaveData(true)
  }



  render () {

    var doPause = new Date();
    var doResume = new Date();

    // Wait for device API libraries to load
    //
    // Add the deviceready event
    document.addEventListener("deviceready", function(){

        // attach events
        document.addEventListener("resume", onResume, false);
        document.addEventListener("pause", onPause, false);

    }, false);

    function onPause() {
        doPause = new Date();
        doResume = new Date();
    }

    function onResume() {
        setTimeout( function() {
          doResume = new Date();
          console.log('timeout triggered')
          if (((doResume - doPause) / 1000)>60) {
            location.reload();
        }
      },0);
    }

    return (
      this.state.readSavedFile
        ? (
          this.state.hasExistingPin
            ? (
              this.state.hasInputPin
                ? (
                  this.state.hasExistingWallet
                    ? (

                      <Navigator
                        renderPage={renderPage}
                        initialRoute={{ component: MainPage, key: 'MAIN_PAGE' }}
                      />
                    )
                    : (
                      <SetupPage setHasExistingWallet={(v) => this.setState({ hasExistingWallet: v })} />
                    )
                )
                : (
                  // Haven't input pin
                  // Ask em to input pin
                  <VerifyPinPage onComplete={() => this.setState({ hasInputPin: true })} />
                )
            )
            : (
              // Ask them to setup new pin
              <NewPinPage onComplete={() => this.setState({ hasExistingPin: true, hasInputPin: true })} />
            )
        )
        : (
          // If we haven't read the file yet
          // display a spinning animation
          <Page>
            <div style={{ padding: '80px 12px 0 12px', textAlign: 'center' }}>
              <img src={ZENCASH_IMG} style={{ width: '30%' }} /><br />
              <Icon icon='spinner' spin />
            </div>
          </Page>
        )
    )
  }
}

App.propTypes = {
  setWalletPin: PropTypes.func.isRequired,
  setSecretItems: PropTypes.func.isRequired,
  setSecretPhrase: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired,
  setContacts: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  setInsightAPI: PropTypes.func.isRequired,
  setSaveData: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
      setContacts,
      setSecretItems,
      setSecretPhrase,
      setLanguage,
      setCurrency,
      setWalletPin,
      setInsightAPI,
      setSaveData
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(App)
