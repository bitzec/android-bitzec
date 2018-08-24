import PropTypes from 'prop-types'
import React from 'react'

import {
  Page,
  Toolbar,
  ToolbarButton,
  BackButton,
  Button,
  Icon,
  Dialog,
  Checkbox
} from 'react-onsenui'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setQrScanning } from '../actions/Context'

import { phraseToSecretItems } from '../utils/wallet'
import { setSecretItems, setSecretPhrase } from '../actions/Secrets'
import { setAddress, setPrivateKey, setAddressValue } from '../actions/Context'

import TRANSLATIONS from '../translations'

class RecoverWalletPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      confirmRecover: false,
      dialogOpen: false,
      recovering: false,
      tempSecretPhrase: ''
    }

    this.newSecrets = this.newSecrets.bind(this)
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

  newSecrets () {
    try {
      this.setState({
        tempSecretPhrase: '',
        recovering: true,
        dialogOpen: true
      })

      const secretPhrase = this.state.tempSecretPhrase
      const secretItems = phraseToSecretItems(secretPhrase)

      this.props.setSecretItems(secretItems)
      this.props.setSecretPhrase(secretPhrase)

      this.props.setAddress(secretItems[0].address)
      this.props.setPrivateKey(secretItems[0].privateKey)
    } catch (err) {
      this.setState({
        recovering: false
      })
      alert(err)
    }
  }

  renderToolbar () {
    const CUR_LANG = this.props.settings.language

    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          { TRANSLATIONS[CUR_LANG].RecoverExistingWalletPage.title }
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
    // translation
    const CUR_LANG = this.props.settings.language
    const secretPhraseLang = TRANSLATIONS[CUR_LANG].RecoverExistingWalletPage.secretPhrase
    const textareaPlaceholderLang = TRANSLATIONS[CUR_LANG].RecoverExistingWalletPage.textareaPlaceholder
    const confirmUnderstandLang = TRANSLATIONS[CUR_LANG].RecoverExistingWalletPage.confirmUnderstand
    const recoverLang = TRANSLATIONS[CUR_LANG].RecoverExistingWalletPage.recover

    const pageOpacity = this.props.context.qrScanning ? '0.4' : '1.0'
    const pageStyle = this.props.context.qrScanning ? { opacity: pageOpacity, visibility: 'visible', transition: 'all 0.1s ease-out', WebkitTransform: 'translateZ(0)' } : {}


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
            {secretPhraseLang}:<br/><br/>
            <textarea
              style={{width: '100%'}}
              value={this.state.tempSecretPhrase}
              onChange={(e) => this.setState({ tempSecretPhrase: e.target.value })}
              className="textarea" rows="3" placeholder={textareaPlaceholderLang}>
            </textarea>
          </p>

          <p>
            <label className="left">
              <Checkbox
                onChange={(e) => {
                  this.setState({
                    confirmRecover: !this.state.confirmRecover
                  })
                }}
                inputId='understoodCheckbox'
              />
            </label>
            <label htmlFor='understoodCheckbox' className="center">
              &nbsp;{ confirmUnderstandLang }
            </label>
          </p>

          {
            this.state.recovering
              ? <Icon icon='spinner' spin/>
              : (
                <Button
                  onClick={() => this.newSecrets()}
                  disabled={!this.state.confirmRecover || this.state.tempSecretPhrase.length < 16}
                  style={{width: '100%', textAlign: 'center'}}
                >
                  { recoverLang }
                </Button>
              )
          }
        </div>
        )}
        <Dialog
          isOpen={this.state.dialogOpen}
          onCancel={() => {
            this.setState({ dialogOpen: false })
            this.props.navigator.popPage()
          }}
          cancelable>
          <p style={{textAlign: 'center'}}>Wallet recovered!</p>
          <p style={{textAlign: 'center'}}>
            <Button
              style={{width: '90%'}}
              disabled={!this.state.dialogOpen}
              onClick={() => {
                this.setState({ dialogOpen: false })
                this.props.navigator.popPage()
              }}
            >Cool</Button>
          </p>
        </Dialog>

      </Page>
    )
  }
}

RecoverWalletPage.propTypes = {
  context: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  setSecretItems: PropTypes.func.isRequired,
  setSecretPhrase: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setAddressValue: PropTypes.func.isRequired,
  setPrivateKey: PropTypes.func.isRequired,
  setQrScanning: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    secrets: state.secrets,
    settings: state.settings,
    context: state.context
  }
}

function matchDispatchToProps (dispatch) {
  // Set context for the send page
  return bindActionCreators(
    {
      setSecretItems,
      setSecretPhrase,
      setAddress,
      setAddressValue,
      setPrivateKey,
      setQrScanning
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(RecoverWalletPage)
