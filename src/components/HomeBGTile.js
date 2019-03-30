import React from 'react'

export default class HomeBGTile extends React.Component {
	constructor() {
		super()
		this.state = {
			colorState: new Array(500).fill(1),
			interval: undefined
		}
	}

	componentDidMount() {
		let i, c
		this.state.interval = setInterval(() => {
			let newColorState = this.state.colorState.slice()
			for (let a = 0; a < 30; a++) {
				i = Math.floor(Math.random() * (499 - 0 + 1)) + 0;
				c = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
				newColorState[i] = c
				
			}
			this.setState({
				colorState: newColorState
			})
		}, 30)
	}

	componentWillUnmount() {
		clearInterval(this.state.interval)
	}

	render() {
		let tiles = []
		for (let i = 0; i < this.state.colorState.length; i++) {
			tiles.push(<div className={
				"tile "
				+ (this.state.colorState[i] === 1 ? 'color-1':'')
				+ (this.state.colorState[i] === 2 ? 'color-2':'')
				+ (this.state.colorState[i] === 3 ? 'color-3':'')
				+ (this.state.colorState[i] === 4 ? 'color-4':'')
				+ (this.state.colorState[i] === 5 ? 'color-5':'')
				+ (this.state.colorState[i] === 6 ? 'color-6':'')
				+ (this.state.colorState[i] === 7 ? 'color-7':'')
				+ (this.state.colorState[i] === 8 ? 'color-8':'')
			}
			key={i}></div>)
		}

		return (
			<div id="home-bg-tile">
				{tiles}
			</div>
		)
	}
}