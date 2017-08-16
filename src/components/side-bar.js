import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import Waypoint from 'react-waypoint'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import { breakPoints } from '../utils/style-utils'
import { fonts, colors } from '../styles/common-variables'

const _ = {
  get,
}

const ifSafari = () => {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('safari')) {
    if (ua.includes('chrome')) {
      return false
    }
    return true
  }
  return false
}

// right: calc((100% - 1024px)/2 + 1px);
const Container = styled.div`
  font-size: ${fonts.size.base};
  position: fixed;
  color: ${colors.primaryColor};
  z-index: 2;
  right: ${props => (props.isSafari ? '30px' : '10px')};
  top: 93px;
  @media (max-width: 1050px) {
    right: ${props => (props.isSafari ? '21px' : '1px')};
  }
  @media (max-width: ${breakPoints.mobileMaxWidth}) {
    display: none;
  }
`

// writing-mode: vertical-rl;
// letter-spacing: 2px;
const Anchor = styled.div`
  margin-bottom: 18px;
  padding-top: 2px;
  padding-bottom: 2px;
  &:hover {
    cursor: pointer;
  }
  color: ${props => (props.highlight ? 'white' : `${colors.primaryColor}`)};
  background: ${props => (props.highlight ? `${colors.primaryColor}` : 'none')};
`

const Label = styled.div`
  display: block;
  margin: 2px 3px;
  padding: 0;
  font-weight: 500;
  line-height: 14px;
`

class Anchors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSection: _.get(this.props, 'data.0.id'),
    }
    this.changeHighlight = this._changeHighlight.bind(this)
  }

  _changeHighlight(currentSection) {
    this.setState({
      currentSection,
    })
  }

  render() {
    const AssembleWord = (words) => {
      return words.split('').map((word) => {
        return (
          <Label key={`anchor_label_${word}`}>
            {word}
          </Label>
        )
      })
    }
    const anchorBts = []
    this.props.data.forEach((anchorObj) => {
      const moduleID = _.get(anchorObj, 'id', '')
      const moduleLabel = _.get(anchorObj, 'label', '')

      // moduleID and moduleLable are not empty string
      if (moduleID && moduleLabel) {
        anchorBts.push(
          <Anchor
            highlight={moduleID === this.state.currentSection}
            onClick={(e) => { this.props.handleClickAnchor(moduleID, e) }}
            key={`SectionButton_${moduleID}`}
          >
            {AssembleWord(moduleLabel)}
          </Anchor>,
        )
      }
    })
    return (
      <div>
        { anchorBts }
      </div>
    )
  }
}

Anchors.defaultProps = {
  handleClickAnchor: () => {},
  data: [],
}

Anchors.propTypes = {
  handleClickAnchor: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })),
}

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSafari: false,
    }
    this.scrollTo = this._scrollTo.bind(this)
    this.handleOnEnter = this._handleOnEnter.bind(this)
    this.handleOnLeave = this._handleOnLeave.bind(this)
    // moduleID to Module
    this.moduleMap = {}
    this.currentSection = ''
    this.previousSection = ''
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      if (ifSafari()) {
        this.setState({
          isSafari: true,
        })
      }
    }
  }

  componentWillUnmount() {
    this.moduleMap = {}
  }

  _scrollTo(moduleID, e) {
    e.preventDefault()
    const node = this.moduleMap[moduleID]
    if (node) {
      const offsetTop = moduleID === _.get(this.props, 'anchors.0.id') ? node.offsetTop + 278 : node.offsetTop
      return smoothScroll(offsetTop)
    }
    return null
  }

  _handleOnEnter(nextSection) {
    this.anchorsNode.changeHighlight(nextSection)
    this.previousSection = this.currentSection
    this.currentSection = nextSection
  }

  _handleOnLeave(onLeaveSection) {
    if (onLeaveSection === this.currentSection) {
      this.currentSection = this.previousSection
      this.anchorsNode.changeHighlight(this.previousSection)
      this.previousSection = onLeaveSection
    }
  }

  render() {
    const { children, anchors } = this.props
    let modules = children
    if (children && !Array.isArray(children)) {
      modules = [children]
    }
    if (this.currentSection === '') {
      this.currentSection = _.get(anchors, '0.id')
    }
    const webSiteContent = modules.map((module, index) => {
      const moduleID = _.get(anchors, [index, 'id'], `side_bar_module_${index}`)
      return (
        <Waypoint
          key={moduleID}
          onLeave={() => { this.handleOnLeave(moduleID) }}
          onEnter={() => { this.handleOnEnter(moduleID) }}
          fireOnRapidScroll
          topOffset="4%"
          bottomOffset={(index + 1) === modules.length ? '50%' : '95%'}
        >
          <div
            id={moduleID}
            ref={(node) => { this.moduleMap[moduleID] = node }}
          >
            {module}
          </div>
        </Waypoint>
      )
    },
    )

    return (
      <div>
        <Container
          isSafari={this.state.isSafari}
        >
          <Anchors
            ref={(node) => { this.anchorsNode = node }}
            data={anchors}
            handleClickAnchor={this.scrollTo}
          />
        </Container>
        {webSiteContent}
      </div>
    )
  }
}

SideBar.defaultProps = {
  children: [],
  anchors: [],
}

SideBar.propTypes = {
  children: PropTypes.array,
  anchors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })),
}

export default SideBar
