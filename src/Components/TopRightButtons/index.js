import React, { Fragment } from "react";
import MenuButton from "./MenuButton";
import IconMenuButton from "./IconMenuButton";
import "./index.css";
import { Drawer } from "components";


const drawerRender = (navButtonProps) => {
    return (
        <Drawer.MenuDrawer
            className="menu-btn-hamburg"
            menuInfo={navButtonProps.menuDrawerInfo}
            menuColor={navButtonProps.menuColor}
            additional={navButtonProps.additional}
            category={navButtonProps.category}
        />
    );
};

const defaultButtons = (navButtonProps) => {
    return (
        <Fragment>
            {/* TODO: Add functions to buttons */}
            {/* <IconMenuButton
                link="/cart"
                icon="cart"
            /> */}
            <IconMenuButton link="/search" icon="search" />

            <IconMenuButton link="/cart" icon="shop" cartItems={navButtonProps.prodFromCart} />

            {/* TODO: Add link to shop button */}
            {window.innerWidth > 900 ? (
                <MenuButton signin={navButtonProps.signin} />
            ) : (
                    drawerRender(navButtonProps)
                )}
        </Fragment>
    );
};

const buttons = (navButtonProps) => {
    if (navButtonProps.menuOnly) {
        return <MenuButton signin={navButtonProps.signin} />;
    }
    return defaultButtons(navButtonProps);
};

const TopRightButtons = ({ navButtonProps }) => {
    return buttons(navButtonProps);
};

export default TopRightButtons;
