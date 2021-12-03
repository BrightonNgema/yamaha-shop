import React, { Component } from "react";
import { ActivityLoader, NavBar, Footer, MenuList } from "components";
import BranchList from "./BranchList";
import { BottomHeader } from "./Headers";
import { catIds } from "theme/categoryIds";
import { isMobile, isTablet, isIE } from "react-device-detect";

import Section1 from "./section1";
import { HeroProduct } from "./HeroProduct";
import Section2 from "./section2";
import Section3 from "./section3";
import Section4 from "./section4";
import Section5 from "./section5";
import Section6 from "./section6";
import Section7 from "./section7";
import { Grid } from "@material-ui/core";
import "./index.css";

import "./index.css";
import SeoHeader from "./SeoHeader";
const axios = require("axios");

class ProductLandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideMenuPosition: 50,
            loading: true,
            onMenu: false,
            message: "",
            catId: "",
            product: {},
            active: 0,
            subcats: [],
            activeProduct: "",
        };
    }
    componentDidMount() {
        return this.onLoad();
    }
    componentWillReceiveProps() {
        return this.onLoad();
    }

    onLoad = async () => {
        this.setState({ loading: true });
        const { history, match } = this.props;
        const index = catIds.map((e) => e.name).indexOf(match.params.cat);
        catIds.findIndex((x) => x.name === match.params.cat);
        if (index < 0) return history.replace("/");
        try {
            const id = catIds[index].id;
            const baseUrl = process.env.REACT_APP_API_URL;
            let subcats = await axios.get(baseUrl + `subtypes/${id}`);
            let {
                data: { data },
            } = subcats;
            await this.getProductId(data[0].subcategory);
            this.setState({
                subcats: data[0].subcategory,
                catId: id,
            });
        } catch (error) {
            return history.replace("/");
        }
    };

    getProductId = (subcats) => {
        const {
            match: { params },
        } = this.props;
        const sub = subcats.filter((sub, index) => {
            if (sub.name === params.subcat) {
                this.setState({ active: index });
            }
            return sub.name === params.subcat;
        });

        const types = sub[0].types;
        return types.forEach((e) =>
            e.products.filter((c) => {
                c.prod_code = c.prod_code.replace(/\s+/g, "");
                params.prod = params.prod.replace(/\s+/g, "");
                if (c.prod_code === params.prod) {
                    return this.setState(
                        { activeProduct: c },
                        async () => await this.getProduct()
                    );
                }
                return null;
            })
        );
    };

    getProduct = async () => {
        const {
            history,
            match: { params },
        } = this.props;
        const baseUrl = process.env.REACT_APP_API_URL;
        let newAPI = await axios.get(
            baseUrl + `product_all/${this.state.activeProduct.id}`
        );
        if (!newAPI) return history.replace(`/category/${params.cat}/`);
        this.setState({ product: newAPI.data.product, loading: false });
    };

    onActiveSub = (data) => {
        const {
            history,
            match: { params },
        } = this.props;
        if (params.subcat !== data.name) {
            history.push(`/category/${params.cat}/${data.name}`);
        }
    };

    hideMenu = (pageX) => {
        const showMenu = pageX < window.innerWidth - 50;
        const right = window.innerWidth >= 1440 ? -185 : "-13%";
        if (showMenu) {
            return this.setState({
                sideMenuPosition: right,
            });
        }
        return this.setState({
            sideMenuPosition: 50,
        });
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
        ];
        const {
            match: { params },
        } = this.props;
        const { active, catId, sideMenuPosition } = this.state;
        return (
            <ActivityLoader loading={this.state.loading}>
                <SeoHeader product={this.state.product} />
                <div
                    style={{ backgroundColor: "#1e1e1e", overflow: "hidden" }}
                    onMouseMove={(e) =>
                        this.state.onMenu ? null : this.hideMenu(e.pageX)
                    }
                >
                    <NavBar
                        topColor={isIE ? "#000" : "rgba(0,0,0,96%)"}
                        bottomColor={isIE ? "#000" : "rgba(0,0,0,88%)"}
                        search
                        menuDrawerInfo={footerMenu}
                        categoryMenu={this.state.subcats}
                        menuColor="white"
                        logoColor="white"
                        category={params.cat}
                    />
                    <Section1
                        product={this.state.product}
                        catId={this.state.catId} //TODO: Made this change, leave if working
                    />
                    {!isMobile && <HeroProduct />}
                    <Section2 product={this.state.product} />
                    <Section3 product={this.state.product} />
                    <Section4 product={this.state.product} />
                    <Section5 product={this.state.product} />
                    <Section6 product={this.state.activeProduct} />
                    <Section7 />
                    <div
                        id="branches"
                        className="contact-heading-container"
                        style={{ paddingTop: 0 }}
                    >
                        <BottomHeader />
                        <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                            <Grid container spacing={10}>
                                <Grid item xs={12} sm={12}>
                                    <BranchList
                                        category={this.props.match.params.cat}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    {!(isMobile || isTablet) && (
                        <div
                            className="menu-list-container fixed nopadding"
                            style={{ right: sideMenuPosition }}
                            onMouseEnter={() => this.setState({ onMenu: true })}
                            onMouseLeave={() =>
                                this.setState({ onMenu: false })
                            }
                        >
                            <MenuList
                                category={{
                                    name: this.props.match.params.cat,
                                    id: catId,
                                }}
                                onActiveSub={this.onActiveSub}
                                subtypes={this.state.subcats}
                                subcategory={{
                                    name: this.props.match.params.subcat,
                                    index: active,
                                }}
                            />
                        </div>
                    )}
                    <Footer mainFooter />
                </div>
            </ActivityLoader>
        );
    }
}
export default ProductLandingPage;
