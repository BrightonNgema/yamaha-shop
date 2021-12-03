import React from 'react'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { isMobile, isTablet } from 'react-device-detect';
import './index.css';
import { PropTypes } from 'prop-types';

export default function CatergorySlideArrows({ next, previous }) {
    if (isMobile || isTablet) {
        return null
    }
    return (
            <div style={{ flexGrow: 1 }}>
                <ul style={{ listStyle: 'none', display: 'flex', padding: 0 }}>
                    <li>
                        <div className='carousel-arrow' onClick={previous}>
                            <div className='carousel-arrow-icon-container'>
                                <KeyboardArrowLeft className='carousel-arrow-icon' />
                            </div>
                        </div>
                    </li>
                    <li style={{ margin: '0px 10px' }}>
                        <div className='carousel-arrow' onClick={next}>
                            <div className='carousel-arrow-icon-container'>
                                <KeyboardArrowRight className='carousel-arrow-icon' />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
    )
}
CatergorySlideArrows.propTypes = {
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
}