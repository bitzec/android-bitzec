import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setQrScanning } from '../actions/Context'

import { addContact, deleteContact } from '../actions/Contacts'

import {
  Page,
  Fab,
  List,
  ListHeader,
  ListItem,
  Toolbar,
  BackButton,
  Icon,
  Input,
  ToolbarButton
} from 'react-onsenui'

import TRANSLATIONS from '../translations'

const getContactDetails = (curLang, navigator, setQrScanning, addContact, deleteContact, contactName, contactAddress) => {
  // Language
  const nameLang = TRANSLATIONS[curLang].ContactsPage.contactsName
  const addressLang = TRANSLATIONS[curLang].ContactsPage.contactsAddress


  //qr scanning
  var scanning = false
  //const ctxOpacity = scanning ? '0.4' : '1.0'
  //const ctxStyle = scanning ? { opacity: ctxOpacity, visibility: 'visible', transition: 'all 0.1s ease-out', WebkitTransform: 'translateZ(0)' } : {}

  // Local style
  const inputStyle = {
    width: '95%',
    margin: '10px 0 25px 0'
  }

  // Local state
  // Force it to copy
  var tmpContactName = (' ' + contactName).slice(1)
  var tmpContactAddress = (' ' + contactAddress).slice(1)

  // Partial function?
  const ctxPage = () => (
    <Page
      style={
        scanning ? {opacity: '0.4', visibility: 'visible', transition: 'all 0.1s ease-out', WebkitTransform: 'translateZ(0)'} : {opacity: '1.0'} }
      renderToolbar={() => (
        <Toolbar>
          <div className='left'>
            <BackButton onClick={() => {
              if (scanning) {
                QRScanner.destroy()
                scanning=false
                setQrScanning(false)
              }
              navigator.popPage()}}>Back</BackButton>
          </div>
        {
            scanning
          ? (
            <div className='center'>{addressLang}</div>
          ) : (
            <div className='center'>
              <ToolbarButton onClick={() => {
                deleteContact({name: contactName, address: contactAddress})
                navigator.popPage()
              }}>
                <Icon icon='ion-trash-a'/>
              </ToolbarButton>
            </div>
        )}
          <div className='right'>
            <ToolbarButton onClick={() => {
              try {
                  QRScanner.prepare(function (err, status) {
                    if (err) {
                      alert(JSON.stringify(err))
                    }
                    if (status.authorized) {
                      QRScanner.scan(function (err, QrScan) {
                        tmpContactAddress=QrScan
                        scanning=false
                        setQrScanning(false)
                        QRScanner.destroy()
                      }.bind(this))
                        QRScanner.show()
                        scanning=true
                        setQrScanning(true)
                    } else if (status.denied) {
                        const CUR_LANG = this.props.settings.language
                        alert(TRANSLATIONS[CUR_LANG].SendPage.noCameraPermissions)
                        QRScanner.openSettings()
                    } else {
                    }
                  }.bind(this))
              } catch (err) {
                alert(JSON.stringify(err))
              }
            }}>
              <Icon icon='ion-camera' />
            </ToolbarButton>
          </div>
        </Toolbar>
      )}
      renderFixed={() => (
        <Fab
          position='bottom right'
          onClick={() => {
            deleteContact({
              name: contactName,
              address: contactAddress
            })

            // Only add contact if name isn't blank
            if (tmpContactName.length > 0) {
              addContact({
                name: tmpContactName,
                address: tmpContactAddress
              })
            }

            navigator.popPage()
          }}>
          <Icon icon='ion-archive'/>
        </Fab>
      )}
    >
    {
      scanning
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
      <List style={{wordBreak: 'break-word'}}>
        <ListItem>
          <Input
            style={inputStyle}
            value={tmpContactName}
            placeholder={nameLang}
            float
            onChange={(e) => { tmpContactName = e.target.value }}
          />
        </ListItem>
        <ListItem>
          <Input
            style={inputStyle}
            value={tmpContactAddress}
            placeholder={addressLang}
            float
            onChange={(e) => { tmpContactAddress = e.target.value }}
          />
        </ListItem>
      </List>
    )}
    </Page>
  )

  return ctxPage
}

class ContactsPage extends React.Component {
  constructor (props) {
    super(props)

    //this.handleQRScan = this.handleQRScan.bind(this)
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

  componentDidMount() {
    window.ga.trackView('Contact Page')
  }

  componentWillUnmount () {
    this.safeReleaseCamera()
  }

  /*handleQRScan () {
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
            tmpContactAddress=QRPhrase

          }

          // Set finished scanning
          this.props.setQrScanning(false)
        }.bind(this))

        // Show scanning preview
        QRScanner.show()

        // Set transparency
        this.props.setQrScanning(true)
      } else if (status.denied) {
        //const CUR_LANG = this.props.settings.language
        //alert(TRANSLATIONS[CUR_LANG].SendPage.noCameraPermissions)
        QRScanner.openSettings()
      } else {
        // we didn't get permission, but we didn't get permanently denied. (On
        // Android, a denial isn't permanent unless the user checks the "Don't
        // ask again" box.) We can ask again at the next relevant opportunity.
      }
    }.bind(this))
  }*/

  gotoComponent (c) {
    this.props.navigator.pushPage({component: c})
  }

  renderToolbar () {
    const contactLang = TRANSLATIONS[this.props.settings.language].ContactsPage.contacts

    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          {contactLang}
        </div>
      </Toolbar>
    )
  }

  renderFab () {
    return (
      <Fab
        position='bottom right'
        onClick={() => this.gotoComponent(getContactDetails(this.props.settings.language, this.props.navigator, this.props.setQrScanning, this.props.addContact, this.props.deleteContact, '', ''))}>
        <Icon icon='ion-plus'/>
      </Fab>
    )
  }

  render () {
    const CUR_LANG = this.props.settings.language
    const noContactsLang = TRANSLATIONS[CUR_LANG].ContactsPage.noContactsFound

    // For qr scanning
    const pageOpacity = this.props.context.qrScanning ? '0.0' : '1.0'
    const pageStyle = this.props.context.qrScanning ? { opacity: pageOpacity, visibility: 'visible', transition: 'all 0.1s ease-out', WebkitTransform: 'translateZ(0)' } : {}

    return (
      <Page
        style={pageStyle}
        renderToolbar={this.renderToolbar.bind(this)}
        renderFixed={this.renderFab.bind(this)}>

        <List>
          {
            this.props.contacts.length === 0
              ? (
                <ListHeader>
                  {noContactsLang}
                </ListHeader>
              )
              // Sort alphabetically and map
              : this.props.contacts.sort((a, b) => {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
              }).map((c, idx) => {
                return (
                  <ListItem key={idx}
                    onClick={this.gotoComponent.bind(this, getContactDetails(CUR_LANG, this.props.navigator, this.props.setQrScanning, this.props.addContact, this.props.deleteContact, c.name, c.address))}
                    tappable>
                    {c.name}
                  </ListItem>
                )
              })
          }
        </List>
      </Page>
    )
  }
}

ContactsPage.propTypes = {
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  addContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  setQrScanning: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    contacts: state.contacts,
    settings: state.settings,
    context: state.context
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      addContact,
      deleteContact,
      setQrScanning
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ContactsPage)
