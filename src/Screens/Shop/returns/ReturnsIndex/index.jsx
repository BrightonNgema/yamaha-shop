import React, { Component } from "react";
import { NavBar, Footer, Form as FC, Button as Btn, Toastr, Alerts } from "components";
import { colors } from "theme";
import { isIE } from "react-device-detect";
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";
import { Grid, Button, Table, TableBody, TableCell, TableRow, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Tooltip, CircularProgress } from "@material-ui/core";
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import '../../../../Assets/styles/global.css';
import './index.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getReturnProducts, requestReturn, submitAuthCode, nullStatus } from '../../../../Redux/Actions/returns'
class ReturnsIndex extends Component {
    state = {
        reduxSet: false,
        isOpen: false,
        disable: null,
        returnType: null,
        address: '',
        province: null,
        authorisation_code: '',
        products: [

        ],
        returns_options: [
            "Repair it",
            "Return it",
            "Replace it"
        ],
        returns_option_selected: "",
        openAlert: false,
        variant: null,
        message: null,
    }
    componentDidMount() {
        this.props.dispatch(getReturnProducts(this.props.match.params.id))
    }
    componentDidUpdate() {
        let { returnData, status, dispatch, requestSent, authSent, history, message, returnId } = this.props;

        if (requestSent) {
            dispatch(nullStatus());
            history.push("/confirmation/return-authorization");
        } else if (authSent) {
            dispatch(nullStatus());
            history.push('/account/orders/' + this.props.match.params.id + '/return summary/' + returnId);
        }


        //console.log(message)
        //console.log('elo')
        switch (status) {
            case 'success':
                if (!this.state.reduxSet) {
                    let temp = returnData.map(val => {
                        return {
                            order_product_id: val.order_product_id,
                            name: val.itemName,
                            img: val.imageUrl,
                            quantity_max: val.quantity,
                            quantity: val.quantity,
                            check: false,
                            reason: "",
                            result: null

                        }
                    })
                    this.setState({
                        reduxSet: true,
                        products: temp
                    })
                }
                break;
            case 'failed':
                if (!this.state.reduxSet) {
                    //console.log('hey', message)
                    this.setState({
                        openAlert: true,
                        message: message,
                        reduxSet: true,
                        variant: "error"
                    })
                    break;
                }
        }



        //console.log("state", this.state, "\n", "props", this.props);
    }

    itemGroupSm = (data, total, order) => {

        return (
            <>
                {
                    <Grid container className="row-order-table">
                        <Grid tem xs={12} className="row-reheight" colSpan={8} style={{ paddingTop: "0.8rem" }}>
                            {
                                this.props.returnStatus ?
                                    "Products requested for a return"
                                    :
                                    "products you want to return"
                            }
                        </Grid>
                    </Grid>
                }
                {this.state.products.map((item, i) => (
                    <Grid container>
                        <Grid item xs={12}>
                            {this.ItemSM(item, i)}
                        </Grid>
                    </Grid>
                ))
                }
            </>
        )
    }


    ItemSM = (item, i) => {
        return (<>
            <Grid container>
                <Grid item xs={5} sm={5}>
                    {
                        this.props.returnStatus ?

                            (
                                <>
                                    <ErrorIcon />
                                </>
                            ) :
                            (
                                <FC.Checkbox
                                    name={'check-' + item.id}
                                    value={item.check}
                                    onChange={(k, v) => { this.changeStatus(i, 'check', v) }}>
                                </FC.Checkbox>
                            )
                    }

                    <img
                        src={item.img}
                        className="icon-img"
                        alt="img"
                        style={{ width: "100px", height: "60px", marginRight: 10 }}
                    />
                </Grid>
                <Grid item xs={7} sm={7} style={{ color: "black" }}>
                    <p>{item.name}</p>
                    <p>{
                        item.check == true ?
                            <div style={{ marginTop: 0 }}>
                                <FC.FormInput label="Reason for return" value={item.reason} name="reason" onChange={(k, v) => { this.onChangeText(k, v, i) }}>

                                </FC.FormInput>
                            </div> : (<></>)
                    }</p>
                    <p>
                        {
                            item.check == true ?
                                <div style={{ marginTop: -15 }}>
                                    <FC.FormDropdown
                                        name="customer_request"
                                        label="Request to?"
                                        options={this.state.returns_options}
                                        value={item.customer_request}
                                        onChange={(k, v) => this.onChangeText(k, v, i)}
                                        placeholder=""
                                    ></FC.FormDropdown>
                                </div>
                                : (<></>)
                        }
                    </p>
                    <p>
                        {
                            item.check == true ?
                                <Grid container>
                                    <Grid item xs={12} md={12}>
                                        Quantity
                                                        </Grid>
                                    <Grid item xs={12} md={12}>

                                        <span >{item.quantity}</span>

                                        <AddCircleOutlineRoundedIcon
                                            onClick={() => {
                                                this.addQuantity(i)
                                            }}
                                        />


                                        <RemoveCircleOutlineRoundedIcon
                                            onClick={() => {
                                                this.minusQuantity(i)
                                            }}
                                        />

                                    </Grid>
                                </Grid>
                                : (<></>)
                        }
                    </p>
                </Grid>
            </Grid>
            <br />
        </>
        )
    }


    requestButtonType = () => {
        /* Info is valid to continue */
        let res = this.state.products.filter(product => product.check !== false)
        let ok = false;

        res.forEach((product) => {
            if (product.reason !== "" && product.customer_request !== undefined) {
                ok = true;
            } else {
                ok = false;
            }
        })

        //console.log("Return Items", ok, "\n res", res);
        return ok;
    }

    changeStatus(id, key, value) {
        let open = this.state.isOpen;
        let temp = this.state.products;
        temp[id][key] = value
        this.setState({
            products: temp,
            date: "2017-05-24T10:30",
        })


        let nume = temp.filter(item => item.check === true)
        nume.length >= 1 ? this.setState({ ...this.state, isOpen: true }) : this.setState({ ...this.state, isOpen: false })

    }
    valueChange(k, v) {
        this.setState({ ...this.state, [k]: v })
    }
    addQuantity(index) {
        let temp = this.state.products
        if (temp[index].quantity < temp[index].quantity_max) {
            temp[index].quantity++
            this.setState({ ...this.state, temp })
        }

    }
    minusQuantity(index) {
        let temp = this.state.products
        if (temp[index].quantity > 1) {

            temp[index].quantity--
            this.setState({ ...this.state, temp })
        }
    }
    onChangeText = (k, v, i) => {
        let products = this.state.products;
        products[i][k] = v
        this.setState({ ...this.state, products })
    }
    onChangeHandler = (name, value) => this.setState({ ...this.state, [name]: value });

    bodyRender() {
        return (
            <>
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <h1 className="type-heading">Returns</h1>
                    </Grid>
                    <Grid item xs={12} md={12} className="medium-layout">

                        <Table>
                            <TableBody>
                                <TableRow className="row-highlight">
                                    <TableCell colSpan={5}>
                                        {
                                            this.props.returnStatus ?
                                                "Products requested for a return"
                                                :
                                                "Check the products you want to return"
                                        }

                                    </TableCell>
                                </TableRow>

                                {
                                    this.state.products.map((val, index) => (

                                        <TableRow key={index}>
                                            <TableCell style={{ width: "1px" }}>
                                                {
                                                    this.props.returnStatus ?

                                                        (
                                                            <>
                                                                <ErrorIcon />
                                                            </>
                                                        ) :
                                                        (
                                                            <FC.Checkbox
                                                                name={'check-' + val.id}
                                                                value={val.check}
                                                                onChange={(k, v) => { this.changeStatus(index, 'check', v) }}>
                                                            </FC.Checkbox>
                                                        )
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <Grid container>
                                                    <Grid item xs={3} md={3}>
                                                        <img src={val.img} style={{ width: "70px", height: "70px" }} />
                                                    </Grid>
                                                    <Grid item xs={9} md={9}>
                                                        <div style={{ marginTop: 30 }}>
                                                            {val.name}
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    val.check == true ?
                                                        <div style={{ marginTop: -15 }}>
                                                            <FC.FormInput label="Reason for return" value={val.reason} name="reason" onChange={(k, v) => { this.onChangeText(k, v, index) }}>

                                                            </FC.FormInput>
                                                        </div> : (<></>)
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    val.check == true ?
                                                        <div style={{ marginTop: -15 }}>
                                                            <FC.FormDropdown
                                                                name="customer_request"
                                                                label="What do you want to do?"
                                                                options={this.state.returns_options}
                                                                value={val.customer_request}
                                                                onChange={(k, v) => this.onChangeText(k, v, index)}
                                                                placeholder=""
                                                            ></FC.FormDropdown>
                                                        </div>
                                                        : (<></>)
                                                }
                                            </TableCell>
                                            <TableCell style={{ textAlign: "center" }}>
                                                {
                                                    val.check == true ?
                                                        <Grid container>
                                                            <Grid item xs={12} md={12}>
                                                                Quantity
                                                        </Grid>
                                                            <Grid item xs={12} md={12}>

                                                                <span >{val.quantity}</span>

                                                                <AddCircleOutlineRoundedIcon
                                                                    onClick={() => {
                                                                        this.addQuantity(index)
                                                                    }}
                                                                />


                                                                <RemoveCircleOutlineRoundedIcon
                                                                    onClick={() => {
                                                                        this.minusQuantity(index)
                                                                    }}
                                                                />

                                                            </Grid>
                                                        </Grid>
                                                        : (<></>)
                                                }
                                            </TableCell>
                                        </TableRow>

                                    ))
                                }

                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item xs={12} className="device-layout">
                        {this.itemGroupSm()}
                    </Grid>
                    <Grid item xs={12} md={12}>


                        {/* returnStatus : "Authorisation requested",  "Return scheduled", "Return confirmed"*/}
                        {

                            this.props.returnStatus ?
                                this.radioOptions()
                                : this.state.isOpen === true ?
                                    this.radioOptions() : <></>
                        }
                    </Grid>
                    <Grid item xs={12} md={12} style={{ marginTop: 60 }}>
                        {this.state.isOpen === true ?
                            <Alerts
                                header="Returns Authorisation Code"
                                paragraph1="Once you've requested a return, we will contact you within 48hrs to go through our returns process with you."
                                paragraph2="If your return is validated, an authorisation code will be given to you to fully submit your return."
                                paragraph3="Read through our returns policy for more information"
                            />
                            : <></>}
                    </Grid>
                </Grid>
            </>
        );
    }
    radioOptions() {
        return (
            <>

                <FormControl component="fieldset" style={{ marginTop: 50 }}>

                    {
                        this.props.returnStatus === "Authorisation requested" ?
                            <>
                                <FormLabel component="legend" style={{ fontWeight: 'bold', color: 'black' }}>Do you have a returns authorisation code*?
                                    <Tooltip title="An authorisation code allows you to submit a return" placement="right" arrow>
                                        <ErrorRoundedIcon style={{ color: 'red' }} />
                                    </Tooltip>
                                </FormLabel>
                                <Grid container>
                                    <Grid container xs={12} md={12}>
                                        <Grid item xs={12} md={3} style={{ marginLeftP: -10 }}>
                                            <div style={{ marginLeft: -5 }}>
                                                <FC.FormInput
                                                    name='authorisation_code'
                                                    label='Authorisation Code'
                                                    type='text'
                                                    onChange={
                                                        this.onChangeHandler}
                                                    value={this.state.authorisation_code}
                                                ></FC.FormInput>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={9} style={{ paddingTop: 35 }}>
                                            <span style={{ border: 'thin solid red', backgroundColor: '#f59a71', color: 'black', padding: 10, fontSize: 11 }}>
                                                You'll receive an authorisation code after our team has gone through our returns policy
                                        </span>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12} style={{ marginTop: 20 }}>
                                        <Btn

                                            type={this.state.authorisation_code !== "" ? "primary" : "disabled"}
                                            title="Submit Return"
                                            // link="/account/order/return summary"
                                            onClick={this.submitAuth}
                                        >
                                        </Btn>
                                    </Grid>
                                </Grid>
                            </>

                            :
                            this.props.returnStatus === 'Return scheduled' ?
                                <>
                                    <FormLabel component="legend" style={{ fontWeight: 'bold', color: 'black' }}>Complete your return*
                                    <Tooltip title="You have already entered your authorization code" placement="right" arrow>
                                            <ErrorRoundedIcon style={{ color: 'red' }} />
                                        </Tooltip>
                                    </FormLabel>
                                    <Grid container>
                                        <Grid item xs={12} md={12} style={{ marginTop: 20 }}>
                                            <Btn

                                                type="primary "
                                                title="Return Summary"
                                                link={"/account/orders/" + this.props.match.params.id + "/return summary/" + this.props.returnId}
                                            // onClick={this.submitAuth}
                                            >
                                            </Btn>
                                        </Grid>
                                    </Grid>
                                </>
                                :
                                this.props.returnStatus === "Return confirmed" ?
                                    <Grid container>
                                    </Grid>
                                    :
                                    <>
                                        <FormLabel component="legend" style={{ fontWeight: 'bold', color: 'black' }}>Do you have a returns authorisations code*?
                                            <Tooltip title="An authorisation code allows you to submit a return" placement="right" arrow>
                                                <ErrorRoundedIcon style={{ color: 'red' }} />
                                            </Tooltip>
                                        </FormLabel>
                                        <Grid container>
                                            <span style={{ marginTop: 20 }}>
                                                <Btn
                                                    type={this.requestButtonType() ? "primary" : "disabled"}
                                                    title="Request Return"
                                                    // link="/confirmation/return-authorization"
                                                    onClick={this.requestReturn}
                                                >
                                                </Btn>
                                            </span>
                                            <div style={{ paddingTop: 30, marginLeft: 10 }}>
                                                <span style={{ border: 'thin solid red', backgroundColor: '#f59a71', color: 'black', padding: 10, fontSize: 10 }}>
                                                    Once you've requested a return, you'll be eligible to receive an authorisation code
                                            </span>
                                            </div>
                                        </Grid>
                                    </>
                    }

                </FormControl>


            </>
        )
    }

    requestReturn = () => {
        const { dispatch, history } = this.props;
        let data = this.state.products;


        data.forEach((product) => {
            delete product.check
            delete product.img
            delete product.name
            delete product.quantity_max
            delete product.result
        });

        let body = data.filter(product => product.reason !== "")

        dispatch(requestReturn(this.props.match.params.id, body))

    }

    disableChange(boolVal) {
        this.setState({ ...this.state, disable: boolVal })
    }

    submitAuth = () => {
        const { dispatch, history } = this.props;

        let body = this.state.authorisation_code;
        //console.log("auth code", body);

        dispatch(submitAuthCode(this.props.match.params.id, body))
        this.setState({ ...this.state, reduxSet: false })
        // history.push("/confirmation/return-authorization");
    }

    handleClickRequest() { }

    onChangeHandler(key, value) {
        this.setState({ ...this.state, [key]: value })
    }
    handleChange(event) {

        let resp = event.target.value;
        this.setState({ ...this.state, returnType: resp })

    }

    handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openAlert: false });
    };
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
                <Toastr
                    horizontalPosition="right"
                    open={this.state.openAlert}
                    // onClose={this.handleAlert}
                    message={this.state.message}
                    variant={this.state.variant}>
                </Toastr>
                <div className="generic-container">

                    <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                        {
                            this.props.status === "pending" ?
                                <Grid container>
                                    <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                                        <CircularProgress size={50} color={"primary"} />
                                    </Grid>
                                </Grid>
                                :
                                this.bodyRender()
                        }

                    </div>
                </div>
                <Footer fixed mainFooter />
            </div>
        );

    }
}
const mapStateToProps = (state) => {

    return {
        returnData: state.returnReducer.returns,
        status: state.returnReducer.status,
        requestSent: state.returnReducer.requestSent,
        authSent: state.returnReducer.authSent,
        returnStatus: state.returnReducer.returnStatus,
        message: state.returnReducer.message,
        returnId: state.returnReducer.returnId,
    }
}
export default connect(mapStateToProps)(withRouter(ReturnsIndex))
