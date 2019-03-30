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
			mounted: !this.state.mounted
		})
	}

	animateUnmount() {
		this.setState({
			mounted: !this.state.mounted
		})
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
						<Link to="/"><button onClick={() => {this.animateUnmount()}} className="go-back"></button></Link>
						<h1 className="title">{this.props.title}</h1>
						<div className="dummy"></div>
					</div>
				</nav>
			</CSSTransition>
		)
	}
}