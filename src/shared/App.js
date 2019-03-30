import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import * as Pages from '../pages'

export default class App extends Component {
	render() {
		return (
			<div id="eodiro-app">
				<Switch>
					<Route exact path="/" component={Pages.Home} />
					<Route exact path="/buildings" component={Pages.Buildings} />
					<Route exact component={Pages.NotFound} />
				</Switch>
			</div>
		)
	}
}
