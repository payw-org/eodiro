import React from 'react'
import '../scss/not-found'

export default class NotFound extends React.Component {
	render() {
		return (
			<div id="not-found">
				<div className="wrapper">
					<div className="app-icon">
						<img className="app-icon" src="/assets/images/eodiro/eodiro_app_icon.svg" alt="" />
					</div>
					<h1 className="manifesto">Ooops...<br />Could not found the route.</h1>
				</div>
			</div>
		)
	}
}