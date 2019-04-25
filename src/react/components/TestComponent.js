import React from 'react'
import { CSSTransition } from 'react-transition-group'

export default class TestComponent extends React.Component {
  render() {
    return (
      <CSSTransition
        in={this.props.mounted}
        appear
        unmountOnExit
        classNames="fade"
        timeout={500}
      >
      <div>
        <h1>Testing unmount animation</h1>
      </div>
      </CSSTransition>
    )
  }
}