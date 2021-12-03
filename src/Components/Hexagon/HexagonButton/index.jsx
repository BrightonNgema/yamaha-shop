import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './HexagonButton.css'

class HexagonButton extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onClickHandler = this.onClickHandler.bind(this)
    }

    onClickHandler(link) {
        if (link.includes('http')) {
            window.open(link, '_blank')
        } else {
            this.props.history.push(link)
        }
    }

    render() {
        let x = '-5'
        let width = '31'
        let height = '5'
        let rectAddX = 0
        let textAddX = 0
        let text2AddX = 0

        if (this.props.title.length > 13) {
            x = '-10'
        } else if (this.props.title.length > 9) {
            x = '-7'
        } else if (this.props.title.length > 6) {
            x = '-6'
        }
        if (window.innerWidth < 1400 && window.innerHeight < 750) {
            width = '24'
            height = '5'
            // PLEASE DO NOT DO THIS....SORRY...NOT SORRY...DEADLINES ARE A THING
            rectAddX = 4
            textAddX = rectAddX - 2
            text2AddX = rectAddX - 1
        }

        return (
            <>
                <text x={x} y='-8' style={{ fontWeight: 600, fontSize: '0.125rem', fill: '#fff' }}>
                    {this.props.title}
                </text>
                <rect
                    x={-16 + rectAddX}
                    y='-6'
                    width={width}
                    height={height}
                    rx='1'
                    className='hexagon-button'
                    onClick={() =>
                        this.onClickHandler(this.props.firstLink ? this.props.firstLink : '#')
                    }
                />
                <text x={-12 + textAddX} y='-3'>
                    {this.props.firstText}
                </text>
                <rect
                    x={-16 + rectAddX}
                    y='0'
                    width={width}
                    height={height}
                    rx='1'
                    className='hexagon-button'
                    onClick={() =>
                        this.onClickHandler(this.props.secondLink ? this.props.secondLink : '#')
                    }
                />
                <text x={-14 + text2AddX} y='3'>
                    {this.props.secondText}
                </text>
            </>
        )
    }
}

HexagonButton.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
}

export default withRouter(HexagonButton)
