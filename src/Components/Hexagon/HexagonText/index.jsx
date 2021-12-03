import React from 'react'
import './HexagonText.css'

const HexagonText = ({ title, mobile }) => {
    let x = '-5'
    let y = '1'

    if (window.innerWidth >= 1400 && window.innerHeight >= 750) {
        if (title.length > 13) {
            x = '-14'
        } else if (title.length >= 10) {
            x = '-11'
        } else if (title.length > 6) {
            x = '-8'
        }
    } else if (window.innerWidth >= 1200 && window.innerHeight >= 900) {
        if (title.length > 13) {
            x = '-14'
        } else if (title.length >= 10) {
            x = '-11'
        } else if (title.length > 6) {
            x = '-8'
        }
    } else if (window.innerWidth < 500 && window.innerHeight < 850) {
        y = '3'
        x = '-10'
        if (title.length > 13) {
            x = '-28'
        } else if (title.length >= 10) {
            x = '-20'
        } else if (title.length > 6) {
            x = '-18'
        }
    } else if (window.innerWidth < 1400 && window.innerHeight < 750) {
        if (title.length > 13) {
            x = '-12'
        } else if (title.length >= 10) {
            x = '-9'
        } else if (title.length > 6) {
            x = '-8'
        }
    } else {
        if (title.length > 13) {
            x = '-19'
        } else if (title.length >= 10) {
            x = '-14'
        } else if (title.length > 6) {
            x = '-12'
        }
    }

    return (
        <text x={x} y={y} className='hexagon-text'>
            {title}
        </text>
    )
}

export default HexagonText
