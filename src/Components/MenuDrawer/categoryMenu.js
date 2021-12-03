import React, { Component } from "react";
import "./index.css";
import {
    SwipeableDrawer,
    List,
    ListItem,
    Button
} from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import Right from "@material-ui/icons/KeyboardArrowRight";
import Left from "@material-ui/icons/KeyboardArrowLeft";
import { Button as MyButton } from "components";
import { withRouter } from "react-router-dom";
import { images } from "assets";
import { KeyboardArrowLeft } from "@material-ui/icons";

class MenuDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            data: null,
            history: [],
            level: 1,
            catName: this.props.match.params.cat,
            subCatName: this.props.match.params.subcat,
            typeName: "",
            activeData: this.props.menuInfo
        };
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
        if (this.state.level === 1) {
            this.setState({
                activeData: this.props.menuInfo
            });
        } else if (this.state.level === 2) {
            const subcat = this.props.menuInfo.filter(
                d => d.name === this.props.match.params.subcat
            );
            this.setState({
                activeData: subcat[0].types
            });
        } else {
            const subcat = this.props.menuInfo.filter(
                d => d.name === this.props.match.params.subcat
            );
            this.setState({
                activeData: subcat[0].types
            });
        }
    }

    dataLevel = name => {
        if (this.state.level === 1) {
            return this.setState({
                activeData: this.props.menuInfo
            });
        } else if (this.state.level === 2) {
            name = name ? name : this.state.subCatName;
            const subcat = this.props.menuInfo.filter(d => d.name === name);

            return this.setState({
                activeData: subcat[0].types,
                subCatName: name
            });
        } else if (this.state.level === 3) {
            const subcat = this.state.activeData.filter(d => d.name === name);
            return this.setState({
                activeData: subcat[0].products,
                typeName: name
            });
        }
    };
    upDrawerLevel(levels) {
        let history = this.state.history;

        if (this.state.data == null) {
            this.setState((state, props) => ({
                data: levels
            }));
        } else {
            history.push(this.state.data);
            this.setState((state, props) => ({
                history: history,
                data: levels
            }));
        }
    }
    downDrawLevel() {
        this.setState((state, props) => ({
            data: this.state.history.pop()
        }));
    }
    toggleDrawer(open) {
        this.setState({ ...this.state, toggle: open });
    }

    onLevelUp = name => {
        this.setState(
            prevState => ({
                level: prevState.level !== 3 ? prevState.level + 1 : 3
            }),
            () => {
                return this.dataLevel(name);
            }
        );
    };

    onLevelDown = () => {
        this.setState(
            prevState => ({
                level: prevState.level === 1 ? 1 : prevState.level - 1
            }),
            () => {
                const name =
                    this.state.level === 2 ? this.state.subCatName : "";
                if (this.state.level === 3) {
                    return null;
                }
                return this.dataLevel(name);
            }
        );
    };

    hideTypes = item => {
        if (this.state.level === 2 && item.products) {
            if (item.products.length < 1) {
                return false;
            }
            return true;
        }
        return true;
    };

    onBrowseAll = () => {
        const { level, catName, subCatName, typeName } = this.state;
        const { history } = this.props;
        if (level === 2) {
            this.toggleDrawer(false);
            return history.push(`/category/${catName}/${subCatName}`);
        } else if (level === 3) {
            this.toggleDrawer(false);

            return history.push({
                pathname: `/category/${catName}/${subCatName}`,
                state: typeName
            });
        } else {
            return null;
        }
    };

    categoryLogos = () => {
        const { category } = this.props;
        const cat = category && category.toLowerCase();
        const music = cat.includes("music") || cat.includes("audio");
        const catCond = music ? "music" : "motor";
        return (
            <img
                // className="logo individual-logo"
                style={{ height: 30 }}
                src={images[catCond + "_default_logo_white"]}
                alt="logo"
            />
        );
    };

    renderMenu() {
        if (this.state.data == null) {
            return;
        }
        const {
            match: { params }
        } = this.props;
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
                    {this.state.level !== 1 && (
                        <div
                            onClick={() => this.onLevelDown()}
                            style={{
                                height: 30,
                                width: 30,
                                backgroundColor: "red",
                                marginLeft: 20,
                                marginTop: 10,
                                borderRadius: 10
                            }}
                        >
                            <div style={{ margin: "auto" }}>
                                <KeyboardArrowLeft
                                    style={{ color: "#fff", fontSize: 30 }}
                                />
                            </div>
                        </div>
                    )}
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
                                    backgroundColor: "#D52B1E"
                                }}
                            />
                        ) : (
                            <></>
                        )}
                    </ListItem>
                    <div>
                        {this.state.level !== 1 && (
                            <ListItem>
                                <Button
                                    style={{
                                        float: "left",
                                        textAlign: "left",
                                        backgroundColor: "#1EA4D5",
                                        borderColor: "#1EA4D5",
                                        marginTop:-10
                                    }}
                                    className="btn-outline-active"
                                    onClick={() => this.onBrowseAll()}
                                >
                                    <span className="drawer-btn">
                                        Browse All
                                    </span>
                                    <Right
                                        style={{
                                            float: "right",
                                            textAlign: "right",
                                            color: "white"
                                        }}
                                    />
                                </Button>
                            </ListItem>
                        )}
                    </div>
                    <div
                        style={{
                            overflowY: "scroll",
                            paddingBottom:80
                        }}
                    >
                        {this.state.activeData
                            ? this.state.activeData.map((item, index) => {
                                  const active =
                                      this.state.subCatName === item.name
                                          ? "btn-outline-active"
                                          : "btn-outline";
                                  const name =
                                      this.state.level === 3
                                          ? item.prod_code
                                          : item.name;

                                  if (!this.hideTypes(item)) return null;
                                  return (
                                      <ListItem key={index} style={{paddingTop:0}}>
                                          <Button
                                              style={{
                                                  float: "left",
                                                  textAlign: "left"
                                              }}
                                              className={active}
                                              onClick={() => {
                                                  this.state.level === 3
                                                      ? this.props.history.push(
                                                            `/category/${
                                                                params.cat
                                                            }/${
                                                                this.state
                                                                    .subCatName
                                                            }/${name}`
                                                        ) &&
                                                        this.toggleDrawer(false)
                                                      : this.onLevelUp(name);
                                              }}
                                          >
                                              <span className="drawer-btn">
                                                  {name}
                                              </span>
                                              <Right
                                                  style={{
                                                      float: "right",
                                                      textAlign: "right",
                                                      color: "white"
                                                  }}
                                              />
                                          </Button>
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
                    style={{pointers:'all'}}
                    title="view range"
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

export default withRouter(MenuDrawer);
