import React from 'react'
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { ShoppingCart, Search } from '@material-ui/icons'

const MenuButton = ({ history, link, icon }) => {
    return (
        <div onClick={() => history.push(link)} className='icon-menu-button'>
            {icon === 'search' ? (
                <Search className='icon-menu-icons' />
            ) : (
                <ShoppingCart className='icon-menu-icons' />
            )}
        </div>
    )
}

MenuButton.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    link: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default withRouter(MenuButton)
