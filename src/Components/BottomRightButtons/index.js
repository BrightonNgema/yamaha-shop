import React, { Fragment } from "react";
import MenuButton from "./MenuButton";
// import IconMenuButton from './IconMenuButton'
import "./index.css";
import { Drawer } from "components";
import BottomRightOptions from "./BottomRightOptions";

const drawerRender = navButtonProps => {
    if (navButtonProps.match.path.includes("about"))
        return (
            <Drawer.AboutMenuDrawer
                className="menu-btn-hamburg"
                menuInfo={navButtonProps.categoryMenu}
                menuColor={navButtonProps.menuColor}
                additional={navButtonProps.additional}
                activeAbout={navButtonProps.activeAbout}
                
            />
        );
    return (
        <Drawer.CategoryMenuDrawer
            className="menu-btn-hamburg"
            menuInfo={navButtonProps.categoryMenu}
            menuColor={navButtonProps.menuColor}
            additional={navButtonProps.additional}
            category={navButtonProps.category}
        />
    );
};

const defaultButtons = navButtonProps => {
    return (
        <Fragment>
            {window.innerWidth < 900 && drawerRender(navButtonProps)}
            {/* {drawerRender(navButtonProps)} */}
             {window.innerWidth > 900 && <BottomRightOptions
                 onPageEmail={navButtonProps.onPageEmail}
                 onPageDownload={navButtonProps.onPageDownload} 
              />}
        </Fragment>
    );
};

const buttons = navButtonProps => {
    if (navButtonProps.menuOnly) {
        return <MenuButton signin={navButtonProps.signin} />;
    }
    return defaultButtons(navButtonProps);
};

const TopRightButtons = ({ navButtonProps }) => {
    return buttons(navButtonProps);
};

export default TopRightButtons;
