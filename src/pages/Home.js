import React from 'react'
import HomeBGTile from '../components/HomeBGTile'
import { Link } from 'react-router-dom'
import '../scss/home'

export default class Home extends React.Component {
	render() {
		return (
			<div id="home">
				<HomeBGTile />
				<div className="go-box">
					<div>
						<img className="logo" src="/assets/images/eodiro/logo.svg" alt=""/>
						<Link to="/buildings"><button className="go-btn">GO</button></Link>
					</div>
				</div>
			</div>
		)
	}
}
