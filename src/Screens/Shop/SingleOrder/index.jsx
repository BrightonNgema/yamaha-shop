import React, { Component } from "react";
import { NavBar, Footer, Button, Toastr } from "components";
import { colors } from "theme";
import { Grid, List, ListItem, CircularProgress } from "@material-ui/core";
import { isIE } from "react-device-detect";
import "./index.css";
import "./../../../Assets/styles/global.css";
import OrderTable from "./Table/index";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchSingleOrder } from '../../../Redux/Actions/order'
import { config } from "../../../Redux/service";
import axios from 'axios'
class SingleOrderPage extends Component {
    state = {
        id: null,
        headers: [
            {
                key: "itemName",
                label: "ITEMS",
                img: true,
            },
            { key: "size", label: "SIZE" },
            { key: "color", label: "COLOR" },
            { key: "quantity", label: "QUANTITY" },
            { key: "price", label: "PRICE (INCL. VAT)" },
        ],
        data: [],
        loading: false,
        total: "",
        openAlert: false,
        variant: null,
        message: "",
        reduxSet: false,
        display: true,
        order: {}
    };
    componentDidMount() {
        //populate state based on order
        this.setState({
            id: this.props.match.params.id,
        });
        this.props.dispatch(fetchSingleOrder(this.props.match.params.id))
    }
    componentDidUpdate() {

        //console.log("Single Order Props", this.props, "\nState", this.state);

        let { status, error, order, message, total, formattedData } = this.props;
        if (!this.state.reduxSet) {
            switch (status) {
                case "success":

                    this.setState({
                        ...this.state,
                        reduxSet: true,
                        data: order ? order.orderData : null,
                        formattedData: formattedData,
                        total: total,
                        order: order
                    })
                    break;
                case "failed":
                    this.setState({
                        ...this.state, variant: "error",
                        message: message,
                        reduxSet: true,
                        display: false,
                        openAlert: true
                    })
                    break;
            }
        }
    }

    handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openAlert: false });
    };
    taxInvoiceDownload(id, prod) {
        console.log("hel")
        let token = sessionStorage.getItem("token")
        axios.get(process.env.REACT_APP_BACKEND_URL + "orders/" + id + "/invoices/" + prod, config(token))
        .then(response => {
          
            window.open(response.data.Invoice)
            })
    }
    renderForm = () => {
        return (
            <Grid container spacing={10} style={{ color: "black" }}>
                <Grid item xs={12} md={6}>
                    <h1 className="type-heading order-header">
                        Orders #{this.state.id}
                    </h1>
                </Grid>
                <Grid item xs={12} md={6} className="margin-vertical">

                    <Grid item xs={12} md={12}>
                        <Button
                            title="RETURN PRODUCTS"
                            link={"/account/orders/" + this.state.order.id + "/returns"}
                            type="primary yamaha-btn-md float-right-btn full-width-100 mt-2"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>

                    {this.state.data.length > 0 ? <OrderTable
                        headers={this.state.headers}
                        data={this.state.data}
                        type="collection"
                        showHeader={true}
                        total={this.state.order.grand_total}
                        id={this.state.id}
                        order={this.state.order}
                        download={(id, prod) => {
                            console.log('2')
                            this.taxInvoiceDownload(id, prod)
                        }}
                    ></OrderTable> :
                        <CircularProgress size={50} color={"primary"} />
                    }


                </Grid>

            </Grid>
        );
    };

    render() {
        const footerMenu = [
            {
                title: "Home",
                link: "/",
            },
            {
                title: "Warranty",
                link: "/warranty",
            },
            {
                title: "Yamaha Finance",
                link: "/finance",
            },

            {
                title: "Find My Dealer",
                link: "/dealer",
            },
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
                <Toastr
                    horizontalPosition="right"
                    open={this.state.openAlert}
                    onClose={() => { this.handleAlert() }}
                    message={this.state.message}
                    variant={this.state.variant}>
                </Toastr>
                {
                    this.state.display ?
                        <div className="generic-container">
                            <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                                {this.renderForm()}
                            </div>
                        </div>
                        : <div style={{ margin: "150px 70px", color: "black" }}>
                            <p style={{ color: "black" }}>Nothing Found</p>
                        </div>
                }
                <Footer fixed mainFooter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        order: state.orderReducer.order,
        errors: state.orderReducer.errors,
        status: state.orderReducer.status,
        message: state.orderReducer.message
    }
}

export default connect(mapStateToProps)(withRouter(SingleOrderPage))
