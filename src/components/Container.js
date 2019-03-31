import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group"
import * as Pages from '../pages'

function Container({ location }) {
  let willExit = false

  return (
    <div className="eodiro-app">
      <Switch location={location}>
        <Route
          exact path="/"
          render={(props) => (<Pages.Home {...props} />)}
        />
        <Route
          path="/buildings"
          render={(props) => (<Pages.Buildings {...props} />)}
        />
        <Route
          exact
          component={Pages.NotFound}
        />
      </Switch>
    </div>
  )
}

export default withRouter(Container)