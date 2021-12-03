import React from "react";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { ShoppingCart, Search } from "@material-ui/icons";
import Badge from '@material-ui/core/Badge';


const MenuButton = ({ match, history, link, icon, cartItems }) => {
    let visible = false;
    visible = cartItems !== undefined && cartItems !== null && cartItems.length <= 0 ? true : false;

    if (match.path === "/") return null;
    return (
        <div onClick={() => history.push(link)} className="icon-menu-button">
            {icon === "search" ? (
                <Search className="icon-menu-icons" />
            ) : (
                    <Badge badgeContent="" invisible={visible} color="secondary">
                        <ShoppingCart className="icon-menu-icons" />
                    </Badge>
                )}
        </div>
    );
};

MenuButton.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    link: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default withRouter(MenuButton);
