import React from 'react'
import * as Components from '../components'

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
			</div>
		)
	}
}