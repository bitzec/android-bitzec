import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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

const getContactDetails = (curLang, navigator, addContact, deleteContact, contactName, contactAddress) => {
  // Language
  const nameLang = TRANSLATIONS[curLang].ContactsPage.contactsName
  const addressLang = TRANSLATIONS[curLang].ContactsPage.contactsAddress

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
      renderToolbar={() => (
        <Toolbar>
          <div className='left' style={{color: '#ffd700', background: '#000000'}}>
            <BackButton onClick={() => navigator.popPage()}>Back</BackButton>
          </div>
          <div className='center' style={{color: '#ffd700', background: '#000000'}}>
          </div>
          <div className='right' style={{color: '#ffd700', background: '#000000'}}>
            <ToolbarButton onClick={() => {
              deleteContact({name: contactName, address: contactAddress})
              navigator.popPage()
            }}>
              <Icon style={{color: '#ffd700', background: '#000000'}} icon='ion-trash-a'/>
            </ToolbarButton>
          </div>
        </Toolbar>
      )}
      renderFixed={() => (
        <Fab id="mainicons"
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
          <Icon id="mainicons" icon='ion-archive'/>
        </Fab>
      )}
    >
      <div id="mainlist" style={{width:'100%', height:'100%'}}>
        <List id="mainlist" style={{wordBreak: 'break-word', width:'100%', height:'100%'}}>
          <ListItem id="mainlist">
            <Input id="sendinput"
              style={inputStyle}
              value={tmpContactName}
              placeholder={nameLang}
              float
              onChange={(e) => { tmpContactName = e.target.value }}
            />
          </ListItem>
          <ListItem id="mainlist">
            <Input id="sendinput"
              style={inputStyle}
              value={tmpContactAddress}
              placeholder={addressLang}
              float
              onChange={(e) => { tmpContactAddress = e.target.value }}
            />
          </ListItem>
        </List>
      </div>
    </Page>
  )

  return ctxPage
}

class ContactsPage extends React.Component {
  componentDidMount() {
    window.ga.trackView('Contact Page')
  }

  gotoComponent (c) {
    this.props.navigator.pushPage({component: c})
  }

  renderToolbar () {
    const contactLang = TRANSLATIONS[this.props.settings.language].ContactsPage.contacts

    return (
      <Toolbar>
        <div className='left' style={{color: '#ffd700', background: '#000000'}}>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center' style={{color: '#ffd700', background: '#000000'}}>
          {contactLang}
        </div>
        <div className='right' style={{color: '#ffd700', background: '#000000'}}>
        </div>
      </Toolbar>
    )
  }

  renderFab () {
    return (
      <Fab id="mainicons"
        position='bottom right'
        onClick={() => this.gotoComponent(getContactDetails(this.props.settings.language, this.props.navigator, this.props.addContact, this.props.deleteContact, '', ''))}>
        <Icon id="mainicons" icon='ion-plus'/>
      </Fab>
    )
  }

  render () {
    const CUR_LANG = this.props.settings.language
    const noContactsLang = TRANSLATIONS[CUR_LANG].ContactsPage.noContactsFound

    return (
      <Page
        renderToolbar={this.renderToolbar.bind(this)}
        renderFixed={this.renderFab.bind(this)}>
        <div id="mainlist" style={{width:'100%', height:'100%'}}>
          <List id="mainlist">
            {
              this.props.contacts.length === 0
                ? (
                  <ListHeader id="mainlist">
                    {noContactsLang}
                  </ListHeader>
                )
                // Sort alphabetically and map
                : this.props.contacts.sort((a, b) => {
                  return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
                }).map((c, idx) => {
                  return (
                    <ListItem id="mainlist" key={idx}
                      onClick={this.gotoComponent.bind(this, getContactDetails(CUR_LANG, this.props.navigator, this.props.addContact, this.props.deleteContact, c.name, c.address))}
                      tappable>
                      {c.name}
                    </ListItem>
                  )
                })
            }
          </List>
        </div>
      </Page>
    )
  }
}

ContactsPage.propTypes = {
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  addContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    contacts: state.contacts,
    settings: state.settings
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      addContact,
      deleteContact
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ContactsPage)
