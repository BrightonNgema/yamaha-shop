import React, { Component } from "react";
import { NavBar, Footer, Button as BTN, NoDataFound, Toastr } from "components";
import { colors } from "theme";
import { isIE } from "react-device-detect";
import { animateScroll } from "react-scroll";
import { FormCustomSelect, FormDropdown, FormAddressSelect } from "components/Form";
import { Grid, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "./addtocart.css";
import { getProduct } from '../../../Redux/Actions/product';
import { cartProducts, addProductsToCart } from '../../../Redux/Actions/cart';
import { coloursAllo } from '../../../Assets/json/colours'
import { catIds } from "theme/categoryIds";
import { makeStyles } from "@material-ui/core/styles";
import ImageGallery from 'react-image-gallery';
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import { CircularProgress } from '@material-ui/core';

class CartPage extends Component {
    state = {


        productSentToCart: {
            item: "",
            type: "",
            size: "",
            quantity: "",
            price: "",
            retailPrice: "",
            color: "",
            img: ""
        },

        item: "YAMAHA HOODIE",

        img: "https://via.placeholder.com/100",
        instock: true,
        product_type: "Stereo Amplifier",
        product_code: "RN123",
        product_price: "R15 000.00",
        only_collection: false,
        product: {


        },
        color_id: "",
        color_selected: "",
        openAlert: false,
        go_to_cart_button: false,
        get_product: "",
        read_more: false,
        color: ["black", "white", "red"],
        quantity: ["1", " 2", "3", "4", "5"],
        quantity_selected: "",

        collection_address: [],
        collection_selected: "",
        collection_id: "",

        reduxSet: false,
        cartReduxSet: true,
        loading: true,
        variant: null,
        discount: "0.05"

    };

    componentDidMount() {

        animateScroll.scrollToTop();
        let id = this.props.match.params.id

        let { dispatch } = this.props;
        dispatch(getProduct(id));

    }
    componentDidUpdate() {
        let { status, message, product, cartStatus } = this.props

        switch (status) {
            case "success":

                if (!this.state.reduxSet) {
                    if (product) {


                        this.setState({
                            ...this.state,

                            product: product,
                            color: product.product_colour,
                            gender: product.gender,
                            size: product.size,
                            collection_address: product.collection_points,

                            reduxSet: true,
                            loading: false
                        })

                    }
                }
                break;
            case "failed":
                if (!this.state.reduxSet) {
                    this.setState({ ...this.state, message: message, reduxSet: true, loading: false })
                }
                break;
            case "pending":
                break;

            default:
                break;
        }
        if (!this.state.cartReduxSet) {

            switch (cartStatus) {
                case "success":
                    this.setState({
                        go_to_cart_button: !this.state.go_to_cart_button,
                        color_selected: "",
                        color_id: "",
                        quantity_selected: "",
                        message: "Successfully Added to Cart!",
                        variant: "success",
                        openAlert: true,
                        cartReduxSet: true
                    })
                    break;
                case "failed":
                    break;
            }
        }
    }
    InStock = () => {

        return (
            <Grid item md={12}>
                <div className="colortop">
                    {this.state.product.syspro_stock_threshold ? (
                        <span style={{ backgroundColor: "#1ED588" }}>
                            <span className="instock">In Stock</span>
                        </span>
                    ) : (
                            <span style={{ backgroundColor: "red" }}>
                                <span className="instock">Sold Out</span>
                            </span>
                        )}

                    {this.state.product.syspro_delivery_status === "YES" ? (
                        <></>
                    ) : (
                            <span style={{ marginLeft: 20 }}>
                                Available for collection only
                            </span>
                        )}
                </div>
            </Grid>
        );
    };

    ProductDetails = () => {

        return (
            <Grid item md={12} style={{ marginTop: 20 }}>
                <div className="color">{this.state.product.category}</div>
                <div>
                    <h1
                        style={{
                            color: "black",
                            marginTop: -3,
                            fontSize: 48,
                        }}
                    >
                        {this.state.product.prod_code}
                        {this.state.product.syspro_discount !== "0.00" ?
                            <span style={{ marginLeft: 5, padding: 5, fontSize: 12, fontFamily: "ubuntu", color: "white", backgroundColor: "#009DD2", display: "inline-block", lineHeight: "normal", verticalAlign: "middle" }}>PROMOTION</span>
                            :
                            <></>
                        }
                    </h1>

                </div>
                <div>
                    {this.state.product.syspro_discount === "0.00" ?
                        <div className=" theproductprice">
                            {/* R {this.state.color_selected === null ? this.state.product.syspro_selling_price : this.state.color_selected ? this.state.color_selected.syspro_selling_price : this.state.product.syspro_selling_price} */}
                            {this.state.product.formatted_discounted_price_including_vat}

                        </div> :
                        <>
                            <div className=" theproductprice">
                                {this.state.product.formatted_discounted_price_including_vat}
                                {/* R {this.state.product.syspro_selling_price ? this.state.product.syspro_selling_price : '0.00'} */}
                                <span style={{ textDecoration: "line-through", fontSize: 15, color: "#d52b1e", marginLeft: 10 }}>was {this.state.product.formatted_price_including_vat}</span>
                            </div>
                        </>
                    }
                </div>
                <div className="readmore-content">
                    {this.state.product.syspro_specification_description}
                </div>
            </Grid>
        );
    };

    handleChange = (e) => {

        this.setState({ get_product: e.target.value });
        this.setState(prevState => {
            let productSentToCart = Object.assign({}, prevState.productSentToCart);
            productSentToCart.type = prevState.get_product;
            return { productSentToCart };
        })
    };

    onSelect = (name, value) => {

        this.setState({
            ...this.state,
            [name]: value
        })

    };



    ProductSelection = () => {
        return (
            <Grid item md={12} style={{ marginTop: 22 }}>
                <Grid container spacing={3}>
                    <Grid item md={2} xs={6} style={{ marginLeft: -6 }}>
                        <FormDropdown
                            placeholder="Quantity"
                            name="quantity_selected"
                            value={this.state.quantity_selected}
                            options={this.state.quantity}
                            label="Quantity"
                            onChange={(k, v) => {
                                this.onSelect(k, v);
                            }}
                        />
                    </Grid>

                    <Grid item md={3} xs={6}>
                        <FormCustomSelect
                            // adornment={<StopRoundedIcon style={{ color: coloursAllo(this.state.color_selected) }}></StopRoundedIcon>}
                            placeholder="Color"
                            name="color_id"
                            value={this.state.color_id}
                            options={this.state.color}
                            label="Color"
                            onChange={(k, v) => {
                                this.colorSelector(k, v);
                            }}
                        >

                        </FormCustomSelect>

                    </Grid>

                    <Grid item md={3} xs={6} style={{ marginTop: 25 }}>
                        <FormControl component="fieldset">
                            <FormLabel
                                component="legend"
                                style={{ fontSize: 12, color: "grey" }}
                            >
                                WOULD YOU LIKE DELIVERY OR COLLECTION?
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-label="position"
                                name="position"
                                defaultValue="top"
                                value={this.state.for_delivery}
                                onChange={this.handleChange}
                            >

                                <FormControlLabel
                                    value="delivery"
                                    control={<Radio color="default" />}
                                    label="Delivery"
                                    disabled={this.state.product.syspro_delivery_status === "YES" ? false : true}
                                />
                                <FormControlLabel
                                    value="collection"
                                    control={<Radio color="default" />}
                                    label="Collection"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {
                        this.state.get_product === "collection" ?
                            <Grid item md={3} xs={6}>
                                <FormAddressSelect

                                    placeholder="Address"
                                    name="collection_id"
                                    value={this.state.collection_id}
                                    options={this.state.collection_address}
                                    label="Select a collection venue"
                                    onChange={(k, v) => {
                                        this.addressSelector(k, v);
                                    }}
                                >

                                </FormAddressSelect>
                            </Grid>
                            :
                            <></>
                    }

                </Grid>
            </Grid >
        );
    };

    gotocart = () => {

        if (this.state.get_product === "" || this.state.quantity_selected === "" || this.state.color_selected === "") {

        } else {


            let price = this.state.color.filter(val => val.id == this.state.color_id)[0].syspro_selling_price;

            // collection_address: this.state.get_product === "delivery" ? "" : this.state.collection_selected,

            let cart_packaging = {
                product_id: this.state.color_id,
                product_quantity: this.state.quantity_selected,
                color: this.state.color_selected,
                retailPrice: price,
                shipment_method_id: this.state.get_product == 'delivery' ? 1 : 2,
                size: null,
                item: this.state.product.prod_code,
                img: this.state.product.product_images[0]
            }

            if (this.state.get_product === "collection") {
                cart_packaging.dealer_id = this.state.collection_id;
            }


            let { dispatch } = this.props;
            dispatch(addProductsToCart(cart_packaging));

            // /* Display GO TO CART / CONTINUE SHOPPING buttons */
            // let value = this.state.product.go_to_cart_button;
            this.setState({ cartReduxSet: false });
        }
    };

    AddToCartButtons = () => {

        const validProduct = this.state.get_product !== "";
        const validQuantity = this.state.quantity_selected !== "";
        const validColor = this.state.color_selected !== "" && this.state.color_selected !== undefined;
        const validCollection = this.state.get_product === "collection" && this.state.collection_selected !== "" ? true : this.state.get_product === "delivery" ? true : false;
        const inputValid = validColor && validQuantity && validProduct && validCollection;
        const buttonType = inputValid
            ? "primary yamaha-btn-md"
            : "disabled yamaha-btn-md";

        return (
            <Grid container>

                <Grid item md={10}>
                    <Grid container spacing={5}>
                        {this.state.go_to_cart_button ? (
                            <div className="buttons">
                                <BTN
                                    title="GO TO CART"
                                    type="primary yamaha-btn-md"
                                    link="/cart"
                                />
                                <span className="continueshopping">
                                    <BTN
                                        title="CONTINUE SHOPPING"
                                        type="secondary yamaha-btn-md"
                                        onClick={this.props.history.goBack}
                                    />
                                </span>
                            </div>
                        ) : (
                                <>
                                    {

                                        this.props.cartLoader ?
                                            <>
                                                <div className="buttons">
                                                    <CircularProgress size={20} color={"primary"} />
                                                </div>
                                            </>
                                            : <div className="buttons">
                                                <BTN
                                                    title="ADD TO CART"
                                                    type={buttonType}
                                                    onClick={this.gotocart}
                                                />
                                            </div>}
                                </>
                            )}
                        <div className="buttons">
                            <BTN
                                title="View Product Details"
                                type="primary yamaha-btn-md"
                                link={this.props.history.location.pathname.replace("/add-to-cart", "")}
                            />
                        </div>
                    </Grid>

                </Grid>

            </Grid>
        );
    };

    expandedText = () => {

        this.setState({ read_more: !this.state.read_more });
    }

    ProductSpecifications = () => {

        const { read_more } = this.state;
        return (
            <div className="productspec">
                <Grid item md={12}>
                    <Grid container>
                        <Grid item md={12} xs={12}>
                            <h2 className="specification">SPECIFICATIONS</h2>
                            <div className="specmargin">
                                {this.state.product.syspro_specification_description}
                            </div>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div >

                                {read_more &&
                                    <div className='readmore-content'>
                                        {this.state.product.syspro_long_description}
                                    </div>}
                                <div className='readmore' onClick={this.expandedText}>Read {read_more?'less':'More'}{read_more ? <ExpandLess /> : <ExpandMore />}</div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    };

    useStyles = makeStyles((theme) => ({
        card: {
            display: "flex",
            height: 150
        },
        details: {
            display: "flex",
            flexDirection: "column",
            marginTop: 30
        },
        content: {
            flex: "1 0 auto",
        },
        cover: {
            width: 151,
        },
        controls: {
            display: "flex",
            alignItems: "center",
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
    }));

    productCards = (image, name, price, cat, subcat) => {

        const classes = this.useStyles();
        return (
            <Card
                className={classes.card}
                style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #bcbdbc",
                    borderRadius: 10,
                    borderColor: "black",
                    marginRight: 30,
                    paddingLeft: 10,
                    marginTop: 10,
                    marginBottom: 10,
                    cursor: "pointer"
                }}
                onClick={() => this.cardClick(cat, subcat, name)}
            >
                <CardMedia
                    className={classes.cover}
                    image={image}
                    title="Live from space album cover"
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5" style={{ fontFamily: "rift", fontWeight: "bold" }}>
                            {name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            RRP {price}
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        );
    };

    cardClick = (cat, subcat, name) => {

        this.props.history.push(`/category/${catIds.filter(i => i.id == cat)[0].name}/${subcat}/${name}/add-to-cart`);
        window.location.reload(false);
    }

    RecommendedProducts = () => {

        let array = [0, 1, 2]
        return (
            <Grid item md={12}>
                <Grid container>
                    {array.map(val => (
                        <Grid item lg={4} md={6} xs={12}>

                            { this.productCards(this.state.product.related_products[val].syspro_image_1, this.state.product.related_products[val].prod_code, this.state.product.related_products[val].formatted_discounted_price_including_vat, this.state.product.related_products[val].category_id, this.state.product.related_products[val].subcategory_name,)}
                        </Grid>
                    ))}


                </Grid>
            </Grid>
        );
    };


    addressSelector(k, v) {

        let color = this.state.collection_address.filter(val => val.id == v)[0] //TODO: Variant
        let product = this.state.product;

        // product.price = this.state.color.filter(val => val.id == v)[0].price
        this.setState({
            ...this.state,
            [k]: v,
            collection_selected: color

        })
    }
    colorSelector(k, v) {

        let color = this.state.color.filter(val => val.id == v)[0] //TODO: Variant
        let product = this.state.product;

        // product.price = this.state.color.filter(val => val.id == v)[0].price
        this.setState({
            ...this.state,
            [k]: v,
            color_selected: color

        })
    }

    Grid = () => {
        const images = this.state.product.product_images.map(val => {
            return { original: val, thumbnail: val }
        })
        return (

            <div style={{ paddingTop: 30, flexGrow: 1 }}>
                <Grid container spacing={10}>
                    <Grid item xs={12} sm={12}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={4}>
                                //TODO
                                <div className="browser">

                                    <ImageGallery items={images} showPlayButton={false} />

                                </div>

                            </Grid>

                            <Grid item xs={12} sm={8}>


                                {this.InStock()}
                                {this.ProductDetails()}
                                {this.ProductSelection()}
                                {this.AddToCartButtons()}
                                {this.ProductSpecifications()}


                                <h2 className="specification">YOU MAY ALSO LIKE</h2>
                                {this.RecommendedProducts()}

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    };

    ItemNotFound = () => {

        return (
            <Grid
                container
                style={{ height: "50vh", backgroundColor: "#fff" }}
            >
                <Grid item md={8} style={{ margin: "auto" }}>
                    <p
                        style={{
                            marginTop: -20,
                            fontSize: "2.2rem",
                            color: "#000",
                            fontFamily: "rift",
                            fontWeight: "bold",
                            textAlign: "center"
                        }}
                    >
                        Item Not Found
                    </p>
                    <p
                        style={{
                            marginTop: 0,
                            marginBottom: 20,
                            fontSize: "1.2rem",
                            color: "#56585A",
                            fontWeight: "bold",
                            textAlign: "center",
                            textTransform: 'initial'
                        }}
                    >
                        Let’s help find your way back
                    </p>
                    <Grid container spacing={1}>
                        <Grid item style={{ marginLeft: "auto" }}>
                            <BTN
                                title="Go Home"
                                link="/"
                                type="yamaha-btn-sm yamaha-btn-secondary"
                            />
                        </Grid>
                        <Grid item style={{ marginRight: "auto" }}>
                            <BTN
                                title="Go Back"
                                onClick={() => this.props.history.goBack()}
                                type="yamaha-btn-sm yamaha-btn-secondary"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
    handleAlert() {

        this.setState({ openAlert: false })
    }
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
                    menuDrawerInfo={footerMenu}
                    menuColor="black"
                    logoColor="black"
                />
                <Toastr
                    horizontalPosition="right"
                    open={this.state.openAlert}
                    onClose={() => { this.handleAlert() }}
                    message={this.state.message}
                    variant={this.state.variant}>
                </Toastr>
                <div className="generic-container">
                    {this.state.loading ?

                        <Grid container>

                            <Grid item xs={12} md={12} style={{ textAlign: "center", marginTop: 300 }}>
                                <CircularProgress size={50} color={"primary"} />
                            </Grid>
                        </Grid> : Object.keys(this.state.product).length === 0 ?
                            <NoDataFound mainHeader="No Item Found" otherHeader="Let’s help find your way back" buttonName1="Go Home" linkTo="/" buttonName2="Go Back" onClick={() => this.props.history.goBack()}></NoDataFound> :
                            <this.Grid />}

                </div>
                <Footer mainFooter />
            </div>
        );
    }
}
const mapStateToProps = (state) => {

    return {
        product: state.productReducer.currentProduct,
        status: state.productReducer.status,
        message: state.productReducer.message,
        cartStatus: state.cartReducer.status,
        cartLoader: state.cartReducer.loading
    }
}

export default connect(mapStateToProps)(withRouter(CartPage));