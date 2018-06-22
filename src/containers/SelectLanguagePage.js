import PropTypes from 'prop-types'
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { LANGUAGES, setLanguage } from '../actions/Settings'

import {
  Page,
  Toolbar,
  BackButton,
  List,
  ListItem
} from 'react-onsenui'

import TRANSLATIONS from '../translations'

class SelectLanguagePage extends React.Component {
  componentDidMount() {
    window.ga.trackView('Language Page')
  }

  renderToolbar () {
    const CUR_LANG = this.props.settings.language
    const languageLang = TRANSLATIONS[CUR_LANG].SettingsPage.language

    return (
      <Toolbar>
        <div className='left' style={{color: '#ffd700', background: '#000000'}}>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center' style={{color: '#ffd700', background: '#000000'}}>
          { languageLang } ({ this.props.settings.language })
        </div>
        <div className='right' style={{color: '#ffd700', background: '#000000'}}>
        </div>
      </Toolbar>
    )
  }

  render () {
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <div  style={{color: '#ffd700', background: '#515151', width:'100%', height:'100%'}}>
          <List style={{color: '#ffd700', background: '#515151'}}>
            {
              LANGUAGES.sort().map(function (l) {
                return (
                  <div>
                    <ListItem id="setlang"
                      onClick={function () {
                        this.props.setLanguage(l)
                        this.props.navigator.popPage()
                      }.bind(this)}
                      tappable
                    >
                      { l }
                    </ListItem>
                  </div>
                )
              }.bind(this))
            }
          </List>
        </div>
      </Page>
    )
  }
}

SelectLanguagePage.propTypes = {
  setLanguage: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
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
      setLanguage
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SelectLanguagePage)
