import React from 'react'
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import Button from '@material-ui/core/Button'
import { icons } from 'assets'
import './MenuButton.css'

const IconMenuButton = ({ signin, history }) => {
    // const classes = useStyles();
    const url = signin ? '/signin' : '/'
    const title = signin ? 'sign in' : 'menu'
   if(signin) return null
    return (
        <Button
            onClick={() => history.push(url)}
            variant='contained'
        
            className={`right-menu-button ${title}`}>
            {title}
            {!signin && (
                <img
                    alt='menuicon'
                    src={icons.hexagon}
                    style={{
                        color: '#000',
                        marginLeft: 2,
                        width: 25
                    }}
                />
            )}
        </Button>
    )
}

IconMenuButton.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
}

export default withRouter(IconMenuButton)
