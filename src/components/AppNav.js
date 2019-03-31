import React from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import '../scss/app-navigation'

export default class AppNav extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mounted: false
		}
	}

	componentDidMount() {
		this.setState({
			mounted: true
		})
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
			<CSSTransition
				in={this.state.mounted}
				appear
				unmountOnExit
				timeout={700}
				classNames="trans"
			>
				<nav id="app-navigation">
					<div className="an-container">
						<Link to="/"><button className="go-back"></button></Link>
						<h1 className="title">{this.props.title}</h1>
						<div className="dummy"></div>
					</div>
				</nav>
			</CSSTransition>
		)
	}
}