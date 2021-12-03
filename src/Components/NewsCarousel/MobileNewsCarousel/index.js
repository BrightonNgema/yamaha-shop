import React, { Component } from 'react'
import { Swipeable } from 'react-swipeable';
import { colors } from 'theme';
import SideInfo from '../SideInfo';
import './index.css'
import { PropTypes } from 'prop-types';
export default class MobileCategoryCarousel extends Component {
  
    render() {
        const { navbar, activeData, data, next, prev, onStepper} = this.props

        return (
            <div className="categoryCarouselcontainer"
                style={{ backgroundImage: `linear-gradient(rgba(25, 25, 25, 0.3), rgba(8, 8, 8, 0.3)),url(${activeData.coverImage})` }}>
                    {navbar}
                <div style={{height:'80%', paddingTop:100}}>
                    <Swipeable
                        style={{ height: '100%',padding: '40px 0px 0px' }}
                        onSwipedLeft={next}
                        onSwipedRight={prev}
                    >
                        <div className='category-info-container' style={{ height: 'auto important' }}>
                            <div className='carousel-stepper'>
                                <SideInfo
                                    activeData={activeData}
                                    next={next}previous={prev}
                                />  
                                {data.map((i, index) => {
                                    const isActive =
                                        activeData.title === i.title
                                        ? { backgroundColor: colors.primary }
                                            : {}
                                    if (index < 6) {
                                        return (
                                            <div
                                                className='carousel-indicator'
                                                key={index} style={isActive}
                                                onClick={() => onStepper({...i, index})}
                                            />
                                        )   
                                    }
                                    return null
                                    })}
                            </div>
                        </div>
                    </Swipeable>
                </div>
            </div>
        )
    }
}

MobileCategoryCarousel.propTypes = {
    navbar: PropTypes.any.isRequired,
    onStepper: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    activeData: PropTypes.object.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,

}