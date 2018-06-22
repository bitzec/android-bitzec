import PropTypes from 'prop-types'
import React from 'react'

import {
  Page,
  Toolbar,
  BackButton
} from 'react-onsenui'

import { connect } from 'react-redux'

import TRANSLATIONS from '../translations'

class SecretPhrasePage extends React.Component {
  gotoComponent (c) {
    this.props.navigator.pushPage({component: c})
    this.setState({
      sliderOpen: false
    })
  }

  renderToolbar () {
    const CUR_LANG = this.props.settings.language

    return (
      <Toolbar>
        <div className='left' style={{color: '#ffd700', background: '#000000'}}>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center' style={{color: '#ffd700', background: '#000000'}}>
          { TRANSLATIONS[CUR_LANG].SecretPhrasePage.title }
        </div>
        <div className='right' style={{color: '#ffd700', background: '#000000'}}>
        </div>
      </Toolbar>
    )
  }

  render () {
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{background: '#515151', width:'100%', height:'100%'}}>
          <ons-row>
            <div style={{padding: '12px 12px 0 12px', textAlign: 'center', width: '100%'}}>
              <textarea
                style={{width: '100%'}}
                className="textarea" rows="3"
                maxLength={64}
                value={ this.props.secrets.secretPhrase }
              >
              </textarea>
            </div>
          </ons-row>
        </div>
      </Page>
    )
  }
}

SecretPhrasePage.propTypes = {
  secrets: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    secrets: state.secrets,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(SecretPhrasePage)
