import React from 'react'
import HomeBGTile from '../components/HomeBGTile'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import '../scss/home'

export default class Home extends React.Component {
	constructor() {
		super()
		this.state = {
			goBoxMounted: false
		}
	}

	componentDidMount() {
		this.setState({
			goBoxMounted: !this.state.goBoxMounted
		})
	}

	render() {
		return (
			<div id="home">				
				<HomeBGTile />
				<CSSTransition
					in={this.state.goBoxMounted}
					appear
					unmountOnExit
					timeout={1500}
					classNames="trans"
				>
					<div className="go-box">
						<div>
							<img className="logo" src="/assets/images/eodiro/logo.svg" alt=""/>
							<Link to="/buildings"><button className="go-btn">GO</button></Link>
						</div>
					</div>
				</CSSTransition>
			</div>
		)
	}
}
