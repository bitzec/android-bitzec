import PropTypes from 'prop-types'
import React from 'react'

import {
  Page,
  Toolbar,
  ToolbarButton,
  Icon,
  Button,
  BackButton
} from 'react-onsenui'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setQrScanning } from '../actions/Context'

import { setSecretPhrase, setSecretItems } from '../actions/Secrets'
import { phraseToSecretItems } from '../utils/wallet'

import Sentencer from 'sentencer'

class SetupPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tempSecretPhrase: ''
    }

    this.handleLoadWallet = this.handleLoadWallet.bind(this)
    this.handleNewWallet = this.handleNewWallet.bind(this)
    this.handleQRScan = this.handleQRScan.bind(this)
    this.safeReleaseCamera = this.safeReleaseCamera.bind(this)
  }

  safeReleaseCamera () {
    // Destroy QR scanner if user goes back
    // while scanning
    if (this.props.context.qrScanning) {
      QRScanner.destroy()
      this.props.setQrScanning(false)
    }
  }

  componentDidMount () {
    window.ga.trackView('Setup Page')
  }

  componentWillUnmount () {
    this.safeReleaseCamera()
  }

  handleQRScan () {
    // Prepare QR Scanner
    QRScanner.prepare(function (err, status) {
      // Oh no!
      if (err) {
        alert(JSON.stringify(err))
      }

      // If we are authorized to scan, then only do we invoke
      // the scan method
      if (status.authorized) {
        // Start scanning
        var QRPhrase = ''
        QRScanner.scan(function (err, QRPhrase) {
          // an error occurred, or the scan was canceled (error code `6`)
          if (err) {
            alert(JSON.stringify(err))
          } else {
            //The scan completed, display the contents of the QR code
            //this.handleLoadWallet(QRPhrase)
            this.setState({ tempSecretPhrase: QRPhrase })

          }

          // Set finished scanning
          this.props.setQrScanning(false)
          QRScanner.destroy()
        }.bind(this))

        // Show scanning preview
        QRScanner.show()

        // Set transparency
        this.props.setQrScanning(true)
      } else if (status.denied) {
        const CUR_LANG = this.props.settings.language
        alert(TRANSLATIONS[CUR_LANG].SendPage.noCameraPermissions)
        QRScanner.openSettings()
      } else {
        // we didn't get permission, but we didn't get permanently denied. (On
        // Android, a denial isn't permanent unless the user checks the "Don't
        // ask again" box.) We can ask again at the next relevant opportunity.
      }
    }.bind(this))

  }

  handleNewWallet () {
    // generate random phrase
    var randomPhrase = []

    // Want 9 words
    while (randomPhrase.length < 9) {
      // Noun/Nouns
      if (Math.random() > 0.5) {
        // Noun
        if (Math.random() > 0.5) {
          randomPhrase = randomPhrase.concat(Sentencer.make('{{ noun }}'))
        } else {
          // Nouns
          randomPhrase = randomPhrase.concat(Sentencer.make('{{ nouns }}'))
        }
      } else {
        // Adjective
        randomPhrase = randomPhrase.concat(Sentencer.make('{{ adjective }}'))
      }
    }

    randomPhrase = randomPhrase.join(' ')

    this.handleLoadWallet(randomPhrase)
  }

  handleLoadWallet (phrase) {
    const secretItems = phraseToSecretItems(phrase)

    this.props.setSecretPhrase(phrase)
    this.props.setSecretItems(secretItems)

    // Sets has existing wallet so we pop back out
    // and goto the 'main page'
    this.props.setHasExistingWallet(true)
  }

  renderToolbar () {
    return (
      <Toolbar>
        {
          this.props.context.qrScanning
          ? (
              <div className='left'>
                <BackButton onClick={() => {this.safeReleaseCamera()}}>Back</BackButton>
              </div>
            ) : (
              <div className='left'>
              </div>
            )
        }
        <div className='center'>
          BZC Wallet Setup
        </div>
        <div className='right'>
          <ToolbarButton onClick={() => {
            try {
              this.handleQRScan()
            } catch (err) {
              alert(JSON.stringify(err))
            }
          }}>
            <Icon icon='ion-camera' />
          </ToolbarButton>
        </div>
      </Toolbar>
    )
  }

  render () {
    // For qr scanning
    const pageOpacity = this.props.context.qrScanning ? '0.4' : '1.0'
    const pageStyle = this.props.context.qrScanning ? { opacity: pageOpacity, visibility: 'visible', transition: 'all 0.1s ease-out', WebkitTransform: 'translateZ(0)' } : {}

    //renderToolbar={this.renderToolbar.bind(this)}>
    return (

        <Page
          style={pageStyle}
          renderToolbar={this.renderToolbar.bind(this)}>

        {
          this.props.context.qrScanning
          ? (
          <div style={{ height: '100%', opacity: '0.4' }}>
            <ons-row style={{ height: '30%' }}>
              <ons-col></ons-col>
            </ons-row>
            <ons-row style={{ height: '40%' }}>
              <ons-col width="25%"></ons-col>
              <ons-col
                style={{ border: '5px solid red' }}>
              </ons-col>
              <ons-col width="25%"></ons-col>
            </ons-row>
            <ons-row style={{ height: '30%' }}>
            </ons-row>
          </div>
      ) : (
        <div style={{padding: '12px 12px 0 12px'}}>
          <p>
            <textarea
              style={{color: '#339933', background: '#000000', width: '100%'}}
              onChange={(e) => this.setState({ tempSecretPhrase: e.target.value })}
              value = {this.state.tempSecretPhrase}
              className="textarea" rows="3" placeholder="secret phrase"
            >
            </textarea>
          </p>

          <Button class='RedButton'
            onClick={() => this.handleLoadWallet(this.state.tempSecretPhrase)}
            disabled={this.state.tempSecretPhrase.length < 16}
            style={{width: '100%'}}
          >Recover Wallet
          </Button>

          <div style={{paddingTop: '20px', paddingBottom: '20px', textAlign: 'center'}}>OR</div>

          <Button class='GreenButton'
            onClick={() => this.handleNewWallet()}
            style={{width: '100%'}}
          >New Wallet
          </Button>
        </div>
      )}
      </Page>
    )
  }
}

SetupPage.propTypes = {
  context: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  setSecretPhrase: PropTypes.func.isRequired,
  setSecretItems: PropTypes.func.isRequired,
  setHasExistingWallet: PropTypes.func.isRequired,
  setQrScanning: PropTypes.func.isRequired
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
      setSecretPhrase,
      setSecretItems,
      setQrScanning
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SetupPage)
