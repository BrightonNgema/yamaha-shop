import React, { Component } from "react";
import "../index.css";
import { SwipeableDrawer, List, ListItem } from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import Right from "@material-ui/icons/KeyboardArrowRight";
import { Button as MyButton } from "components";
import { withRouter, Link } from "react-router-dom";
import { images } from "assets";

class AboutMenuDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            active: "",
            activeData: this.props.menuInfo
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.onRedirect = this.onRedirect.bind(this);
    }
    onRedirect(link) {
        if (link.includes("http")) {
            window.open(link, "_blank");
        } else {
            this.props.history.push(link);
        }
    }
    componentDidMount() {
        this.setState({
            activeData: this.props.menuInfo,
            active: this.props.activeAbout
        });
    }

    toggleDrawer(open) {
        this.setState({ ...this.state, toggle: open });
    }

    categoryLogos = () => {
        return (
            <img
                className="logo individual-logo"
                style={{ height: 30 }}
                src={images.music_default_logo_white}
                alt="logo"
            />
        );
    };

    active = aboutIndex => {
        this.setState({ active: aboutIndex }, () => {
            this.toggleDrawer(false);
        });
    };
    renderMenu() {
        return (
            <div width={"100%"} role="presentation">
                <List style={{ color: "black" }}>
                    <ListItem style={{ display: "inline-block" }}>
                        {this.categoryLogos()}
                        <Clear
                            style={{
                                float: "right",
                                fontSize: 32,
                                color: "white"
                            }}
                            onClick={e => {
                                this.toggleDrawer(false);
                            }}
                        />
                    </ListItem>
                    <div
                        style={{
                            overflowY: "scroll",
                            paddingBottom: 80
                        }}
                    >
                        {this.state.activeData
                            ? this.state.activeData.map((item, index) => {
                              
                                  const isActive =
                                      this.state.active === index
                                          ? "active"
                                          : "";
                                  return (
                                      <ListItem
                                          key={index}
                                          style={{ paddingTop: 0 }}
                                      >
                                          <Link
                                              className={`about-menu-link ${isActive}`}
                                              to={{
                                                  pathname: "/about",
                                                  query: { aboutIndex: index }
                                              }}
                                              onClick={() => this.active(index)}
                                          >
                                              <span className="drawer-btn">
                                                  {item.title}
                                              </span>
                                              <Right
                                                  style={{
                                                      float: "right",
                                                      textAlign: "right",
                                                      color: "white"
                                                  }}
                                              />
                                          </Link>
                                      </ListItem>
                                  );
                              })
                            : this.toggleDrawer(false)}
                    </div>
                </List>

                
            </div>
        );
    }
    render() {
        return (
            <>
                <MyButton
                    style={{ pointers: "all" }}
                    title="more about"
                    onClick={e => {
                        this.toggleDrawer(true);
                    }}
                    type="yamaha-btn yamaha-btn-primary yamaha-btn-xs"
                />
                <SwipeableDrawer
                    anchor="right"
                    open={this.state.toggle}
                    onOpen={e => {
                        this.toggleDrawer(true);
                    }}
                    onClose={e => {
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

export default withRouter(AboutMenuDrawer);
