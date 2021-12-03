import React from 'react'

export const TopHeader = () => {
    return (
        <div className="heading-main">
            <h1 className="contact-heading" style={{ color: '#fff' }}>
                GET IN TOUCH
                        </h1>
            <span className="contact-subheading" style={{ color:'#fff' }}>
                Enter your details below,
                after submitting we will contact you as soon as possible.
            </span>
        </div>
    )
}


export const  BottomHeader = () => {
    return (
        <div className="heading-main">
            <h1 className="contact-heading" style={{color:'#fff'}}>
                locate your nearest Yamaha dealer
                        </h1>
            <span className="contact-subheading" style={{ color: '#fff' }}>
                Enter your address to find your nearest dealer.
            </span>
        </div>
    )
}