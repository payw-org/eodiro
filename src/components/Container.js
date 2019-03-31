import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group"
import * as Pages from '../pages'

function Container({ location }) {
	let willExit = false

	return (
		// <TransitionGroup className="eodiro-app">
		// 	<CSSTransition
		// 		key={location.key}
		// 		timeout={{ enter: 0, exit: 500 }}
		// 		onExit={() => {
		// 			willExit = true
		// 		}}
		// 		onExited={() => {
		// 			willExit = false
		// 		}}
		// 		classNames="fade"
		// 	>
				<div className="eodiro-app">
					<Switch location={location}>
						<Route
							exact path="/"
							render={(props) => <Pages.Home {...props} willExit={willExit} />}
						/>
						<Route
							path="/buildings"
							render={(props) => <Pages.Buildings {...props} willExit={willExit} />}
						/>
						<Route
							exact
							component={Pages.NotFound}
						/>
					</Switch>
				</div>
		// 	</CSSTransition>
		// </TransitionGroup>
	)
}

export default withRouter(Container)