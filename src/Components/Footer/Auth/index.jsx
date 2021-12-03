import React from "react";
import Menu from "@material-ui/core/Menu";
import { styles } from "../styles";
import { KeyboardArrowUp } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./index.css";

const ITEM_HEIGHT = 48;
export default function AuthMenu({ textStyle, userName, action }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {

        setAnchorEl(event.currentTarget);
    }

    function handleClose() {

        setAnchorEl(null);
    }
    function logoutFun() {
        action()
    }

    return (
        <div style={{ margin: "3px 5px auto", cursor: "pointer" }}>
            <span
                style={{
                    ...styles.defaultText,
                    width: 150
                }}
                onClick={handleClick}
            >
                <span>{userName}</span>
                <span style={{ marginTop: -3 }}>
                    <KeyboardArrowUp
                        className="icon-phone"
                        style={{ fontSize: 14, marginTop: 2 }}
                    />
                </span>
            </span>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        minWidth: 150,
                        borderRadius: 0,
                        backgroundColor: "#1e1e1e"
                    }
                }}
            >
                <div className="pop-up-link" >
                    <Link to="/account" onClick={handleClose}>
                        <div className="pop-up-text">My Account</div>
                    </Link>
                </div>
                <div className="pop-up-link" >
                    <div onClick={handleClose, logoutFun}>
                        <div className="pop-up-text" style={{ color: 'white' }}>Logout</div>
                    </div>
                </div>

            </Menu>
        </div>
    );
}
