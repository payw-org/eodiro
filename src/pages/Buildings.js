import React from 'react'
import * as Components from '../components'
import { Route, Switch, Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group"

import '../scss/buildings'

export default class Buildings extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			mounted: true
		}
	}

	componentDidUpdate() {
		if (this.props.willExit && this.state.mounted) {
			this.setState({
				mounted: false
			})
		}
	}

	render() {
		return (
			<div id="buildings">
				<Components.AppNav title="Choose a building" willExit={!this.state.mounted} />
				<Switch>
					<Route path={`${this.props.match.url}/:buildingId`} render={() => (<h3><Link to="/buildings">back to buildings</Link></h3>)} />
					<Route path={this.props.match.url} render={() => (<h3><Link to="/buildings/310">go to 310</Link></h3>)} />
				</Switch>
			</div>
		)
	}
}