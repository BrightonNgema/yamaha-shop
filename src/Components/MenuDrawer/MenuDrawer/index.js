import React, { Component } from "react";
import "../index.css";
import {
    SwipeableDrawer,
    List,
    ListItem,
    Button,
    Grid,
} from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import Right from "@material-ui/icons/KeyboardArrowRight";
import Left from "@material-ui/icons/KeyboardArrowLeft";

import { withRouter } from "react-router-dom";
import { FooterLinks } from "../../Footer/FooterLinks";
import { images, icons } from "assets";
import menuLinks from "./menuLinks";
import LoginModal from "../../LoginModel";
import { connect } from "react-redux";
import { logoutAction } from '../../../Redux/Actions/auth';
import AuthMenu from '../../Footer/Auth/index';

const extraLinks = [
    // {
    //     title: "About",
    //     link: "/about"
    // },
    // {
    //     title: "Recruitment",
    //     link: "/recruitment"
    // },
    // {
    //     title: "Ambassadors",
    //     to: "/ambassadors"
    // },
    // {
    //     title: "Legal",
    //     link: "/legal"
    // }
    // {
    //     title: "World of Yamaha",
    //     link: "/world_of_yamaha"
    // },
    // {
    //     title: "Live Chat",
    //     link: "/"
    // }
];
class MenuDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = { toggle: false, data: null, history: [] };
        this.upDrawerLevel = this.upDrawerLevel.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.onRedirect = this.onRedirect.bind(this);
        this.downDrawLevel = this.downDrawLevel.bind(this);
    }
    onRedirect(link) {
        if (link.includes("http")) {
            window.open(link, "_blank");
        } else {
            this.props.history.push(link);
        }
    }
    componentDidMount() {
        this.upDrawerLevel(this.props.menuInfo);
    }
    upDrawerLevel(levels) {
        let history = this.state.history;

        if (this.state.data == null) {
            this.setState((state, props) => ({
                data: levels,
            }));
        } else {
            history.push(this.state.data);
            this.setState((state, props) => ({
                history: history,
                data: levels,
            }));
        }
    }
    downDrawLevel() {
        this.setState((state, props) => ({
            data: this.state.history.pop(),
        }));
    }
    toggleDrawer(open) {
        this.setState({ ...this.state, toggle: open });
    }
    logout() {
        let { dispatch } = this.props
        dispatch(logoutAction())
        this.props.history.replace("")
    }
    renderMenu() {
        return (
            <div width={"100%"} role="presentation">
                <List style={{ color: "black" }}>
                    <ListItem style={{ display: "inline-block" }}>
                        <img
                            alt="logo"
                            src={images.yamaha_default_logo_white}
                            width="75%"
                        />
                        <Clear
                            style={{
                                float: "right",
                                fontSize: 32,
                                color: "white",
                            }}
                            onClick={(e) => {
                                this.toggleDrawer(false);
                            }}
                        />
                    </ListItem>
                    <ListItem style={{ display: "inline-block" }}>
                        {this.state.history.length > 0 ? (
                            <Left
                                onClick={() => {
                                    this.downDrawLevel();
                                }}
                                style={{
                                    float: "left",
                                    fontSize: 32,
                                    color: "white",
                                    backgroundColor: "#D52B1E",
                                }}
                            />
                        ) : (
                                <></>
                            )}
                        {/* TODO */}
                        {/* <Clear
                            style={{ float: 'right', fontSize: 32, color: 'white' }}
                            onClick={e => {
                                this.toggleDrawer(false)
                            }}
                        /> */}
                    </ListItem>
                    <div style={{ overflowY: "scroll", paddingBottom: 80 }}>
                        {menuLinks(this.props)
                            ? menuLinks(this.props).map((title, index) => (
                                <ListItem
                                    key={index}
                                    style={{ paddingTop: 0 }}
                                >
                                    <Button
                                        style={{
                                            float: "left",
                                            textAlign: "left",
                                        }}
                                        className="btn-outline"
                                        onClick={() =>
                                            this.onRedirect(title.link)
                                        }
                                    >
                                        <span
                                            className="drawer-btn"
                                            style={{
                                                fontSize: 12,
                                                fontWeight: "500",
                                            }}
                                        >
                                            {title.title}
                                        </span>
                                        <Right
                                            style={{
                                                float: "right",
                                                textAlign: "right",
                                                color: "white",
                                            }}
                                        />
                                    </Button>
                                </ListItem>
                            ))
                            : this.toggleDrawer(false)}

                        {extraLinks &&
                            extraLinks.map((item, index) => (
                                <ListItem
                                    key={index}
                                    className="additional-items"
                                    onClick={(e) => {
                                        item.tier
                                            ? this.upDrawerLevel(item.tier)
                                            : this.onRedirect(item.link);
                                    }}
                                    style={{ paddingTop: 0 }}
                                >
                                    <span
                                        className="drawer-btn"
                                        style={{ fontSize: 12 }}
                                    >
                                        {item.title}
                                    </span>
                                    <Right
                                        style={{
                                            float: "right",
                                            textAlign: "right",
                                            color: "white",
                                        }}
                                    />
                                </ListItem>
                            ))}
                    </div>
                </List>

                <div
                    style={{
                        backgroundColor: "rgba(0,0,0,70%)",
                        position: "fixed",
                        bottom: 0,
                        width: "100%",
                        padding: "10px 0px",
                        borderTop: "1px solid white",
                    }}
                >
                    <Grid container direction="row" justify="space-between">
                        {/* <Grid item sm={6} xs={7}>
                            <FooterLinks to="/contact" title="Contact Us" />
                        </Grid> */}
                        <Grid item sm={5} xs={5} style={{ marginLeft: 20 }}>
                            {this.props.isLoggedIn != true ?
                                <LoginModal />
                                :
                                <AuthMenu userName={this.props.user} action={() => { this.logout() }} />
                            }
                        </Grid>
                        <Grid item sm={5} xs={5}>
                            <FooterLinks to="/contact" title="Contact Us" />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
    render() {
        return (
            <>
                <Button
                    className="btn-hamburger"
                    onClick={(e) => {
                        this.toggleDrawer(true);
                    }}
                >
                    <img
                        alt="logo"
                        src={icons["menu_" + this.props.menuColor]}
                    />
                </Button>
                <SwipeableDrawer
                    anchor="right"
                    open={this.state.toggle}
                    onOpen={(e) => {
                        this.toggleDrawer(true);
                    }}
                    onClose={(e) => {
                        this.toggleDrawer(false);
                    }}
                    className="drawerColor"
                >
                    {this.renderMenu()}
                </SwipeableDrawer>
            </>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        isLoggedIn: state.authReducer.loggedIn,
        user: state.authReducer.user.name
    }
}

export default connect(mapStateToProps)(withRouter(MenuDrawer));
