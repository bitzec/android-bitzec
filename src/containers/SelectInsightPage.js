import PropTypes from 'prop-types'
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setInsightAPI } from '../actions/Settings'

import {
  Page,
  Toolbar,
  BackButton,
  List,
  ListItem,
  ListHeader,
  Input
} from 'react-onsenui'

import TRANSLATIONS from '../translations'

class SelectInsightPage extends React.Component {
  componentDidMount() {
    window.ga.trackView('Insight Page')
  }

  renderToolbar () {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>Back</BackButton>
        </div>
        <div className='center'>
          Insight API
        </div>
      </Toolbar>
    )
  }

  render () {
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <br/>
        <List>
          <ListHeader style={{color: '#e69500', background: '#515151', fontSize: '120%'}}>
            Manual Configuration
          </ListHeader>
          <ListItem id="mainlist" >
            <Input
              onChange={(e) => this.props.setInsightAPI(e.target.value)}
              value={this.props.settings.insightAPI}
              style={{ width: '100%' }}
              float={true}
            />
          </ListItem>
          <ListHeader style={{color: '#e69500', background: '#515151', fontSize: '120%'}}>
            Preconfigured Nodes
          </ListHeader>
          <ListItem id="mainlist" tappable onClick={() => this.props.setInsightAPI('http://35.242.189.203:3001/insight-api-bitzec/')}>
            Offical API #1
          </ListItem>
          <ListItem id="mainlist" tappable onClick={() => this.props.setInsightAPI('http://35.187.215.228:3001/api/')}>
            Offical API #2
          </ListItem>
          <ListItem id="mainlist" tappable onClick={() => this.props.setInsightAPI('http://23.251.151.9:3001/api/')}>
            Offical API #3
          </ListItem>
        </List>
      </Page>
    )
  }
}

SelectInsightPage.propTypes = {
  secrets: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  setInsightAPI: PropTypes.func.isRequired
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
      setInsightAPI
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SelectInsightPage)
