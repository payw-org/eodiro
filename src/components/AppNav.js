import React from 'react'
import { Link } from 'react-router-dom'

import '../scss/app-navigation'

export default class AppNav extends React.Component {
	render() {
		return (
			<nav id="app-navigation">
				<div className="an-container">
					<Link to="/"><button className="go-back"></button></Link>
					<h1 className="title">{this.props.title}</h1>
					<div className="dummy"></div>
				</div>
			</nav>
		)
	}
}