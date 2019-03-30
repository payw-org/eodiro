import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group"
import * as Pages from '../pages'

function Container({ location }) {
	return (
		<TransitionGroup>
			<CSSTransition
				key={location.key}
				timeout={{ enter: 0, exit: 500 }}
				classNames="trans"
			>
				<div className="eodiro-app">
					<Switch location={location}>
						<Route exact path="/" component={Pages.Home} />
						<Route exact path="/buildings" component={Pages.Buildings} />
						<Route exact component={Pages.NotFound} />
					</Switch>
				</div>
			</CSSTransition>
		</TransitionGroup>
	)
}

export default withRouter(Container)