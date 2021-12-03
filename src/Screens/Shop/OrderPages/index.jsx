import React, { Component } from 'react';
import { NavBar, Footer, Toastr, Button } from "components";
import { colors } from "theme";
import { Grid, List, ListItem, ListItemText, Divider, CircularProgress } from "@material-ui/core";
import { isIE } from 'react-device-detect';
import { Form as FC } from 'components';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './index.css'
import './../../../Assets/styles/global.css'
import { connect } from 'react-redux';
import { fetchOrders } from '../../../Redux/Actions/order';//use if the redux works
import { withRouter } from 'react-router';

class OrderPage extends Component {
    state = {
        reduxSet: false,
        message: "",
        variant: null,
        items: [],
        loading: true,
        display: false,
        openAlert: false
    }

    componentDidMount() {

        let { dispatch } = this.props;
        dispatch(fetchOrders());
        this.setState({ items: this.props.orders });

    }
    handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openAlert: false });
    };
    componentDidUpdate() {
        let { orders,
            status,
            errors, dispatch } = this.props;


        switch (status) {
            case "pending":
                if (this.state.reduxSet) {
                    this.setState({ ...this.state, loading: true })
                }
                break;
            case "success":

                if (!this.state.reduxSet) {
                    this.setState({ ...this.state, loading: false, items: orders, reduxSet: true })

                }

                break;
            case "failed":
                if (!this.state.reduxSet) {
                    this.setState({
                        ...this.state,
                        loading: false, items: [],
                        reduxSet: true, message: this.props.message,
                        variant: "error",
                        openAlert: true
                    })
                }
                break;
        }
    }
    generateList() {
        let rowGen = [];
        this.state.items.map((val, index) => {

            rowGen.push(
                <div key={index}>

                    <Divider className="divider-hr" />
                    <ListItem onClick={() => this.props.history.push("orders/" + val.orderNumber)} className="make-clickable">
                        <Grid container style={{ color: "black" }}>
                            <Grid item xs={12} md={3}>
                                <ListItemText
                                    primary={(<strong>Order #{val.orderNumber}</strong>)}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <ListItemText
                                    className="float-text-r"
                                    primary={(<>
                                        <strong className="order-text">{val.returnStatus ? val.returnStatus : "-"}</strong>
                                    </>)}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <ListItemText
                                    className="float-text-r"
                                    primary={(<>
                                        <strong className="order-text">{val.paymentStatus ? val.paymentStatus : "-"}</strong>
                                    </>)}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <ListItemText
                                    className="float-text-r"
                                    primary={(<>
                                        <strong className="order-text">{val.deliveryStatus ? val.deliveryStatus : "-"}</strong>
                                    </>)}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <span>
                                    <ListItemText
                                        style={{ textAlign: "right" }}
                                        primary={(<>
                                            <strong>{val.date} <ChevronRightIcon /></strong>
                                        </>)}
                                    />

                                </span>
                            </Grid>
                        </Grid>


                    </ListItem>
                </div>
            )
        })
        return rowGen;
    }
    renderForm = () => {
        return (<Grid container spacing={10} style={{ color: "black" }}>
            <Grid item xs={12} md={12}>
                <h1 className="type-heading">Orders</h1>
            </Grid>
            <Grid item xs={12} md={12}>
                {this.state.loading ? (
                    <Grid container>
                        <Grid item xs={12} md={12} style={{ textAlign: "center", marginTop: 100 }}>
                            <CircularProgress size={50} color={"primary"} />
                        </Grid>
                    </Grid>

                ) : (<>
                    {this.state.items.length > 0 ? (
                        <>
                            <div>
                                <ListItem className="make-clickable">
                                    <Grid container style={{ color: "black" }}>
                                        <Grid item xs={12} md={3}>
                                            <ListItemText
                                                primary={(<strong>Order</strong>)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <ListItemText
                                                className="float-text-r"
                                                primary={(<>
                                                    <strong>Return</strong>
                                                </>)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <ListItemText
                                                className="float-text-r"
                                                primary={(<>
                                                    <strong>Payment</strong>
                                                </>)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <ListItemText
                                                className="float-text-r"
                                                primary={(<>
                                                    <strong>Delivery</strong>
                                                </>)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <span>
                                                <ListItemText
                                                    style={{ textAlign: "right" }}
                                                    primary={(<>
                                                        <strong>Date</strong>
                                                    </>)}
                                                />

                                            </span>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </div>
                            <List>
                                {this.generateList()}
                            </List>
                            <Grid item xs={12} sm={12}>
                                <span style={{ marginLeft: 10 }}>
                                    <Button
                                        type='primary yamaha-btn-lg'
                                        title="Back"
                                        onClick={() => this.props.history.goBack()}
                                    />
                                </span>
                            </Grid>
                        </>
                    ) : (<>
                        <p>You have no orders</p>
                        <Grid item xs={12} sm={12}>
                            <span style={{ marginLeft: 10 }}>
                                <Button
                                    type='primary yamaha-btn-lg'
                                    title="Back"
                                    onClick={() => this.props.history.goBack()}
                                />
                            </span>
                        </Grid>
                    </>)}
                </>
                    )}
            </Grid>

        </Grid>)
    }

    render() {
        const footerMenu = [
            {
                title: "Home",
                link: "/"
            },
            {
                title: "Warranty",
                link: "/warranty"
            },
            {
                title: "Yamaha Finance",
                link: "/finance"
            },

            {
                title: "Find My Dealer",
                link: "/dealer"
            }
        ];
        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>
                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    warranty
                    menuColor="black"
                    menuDrawerInfo={footerMenu}
                    logoColor="black"
                />
                <div className="generic-container">
                    <Toastr
                        horizontalPosition="right"
                        open={this.state.openAlert}
                        onClose={() => { this.handleAlert() }}
                        message={this.state.message}
                        variant={this.state.variant}>
                    </Toastr>
                    <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                        {this.renderForm()}

                    </div>
                </div>
                <Footer fixed mainFooter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        orders: state.orderReducer.orders,
        status: state.orderReducer.status,
        errors: state.orderReducer.errors,
        message: state.orderReducer.message
    }
}

export default connect(mapStateToProps)(withRouter(OrderPage));