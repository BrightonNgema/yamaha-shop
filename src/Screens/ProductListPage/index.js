import React, { Component } from "react";
import {
    NavBar,
    ProductList,
    Footer,
    MenuList,
    ActivityLoader,
} from "components";
import { colors } from "theme";
import "./index.css";
import { isMobile, isTablet, isIE } from "react-device-detect";
import { catIds } from "theme/categoryIds";
import { scroller, animateScroll } from "react-scroll";
import SeoHeader from "./SeoHeader";
const axios = require("axios");
class ProductListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catId: "",
            subcats: [
                {
                    subcategory: this.props.match.params.subcat,
                },
            ],
            loading: true,
            active: 0,
        };
    }
    componentDidMount() {
        return this.onLoad();
    }
    componentWillReceiveProps() {
        if (isMobile || isTablet) {
            return this.setState({ loading: true }, () => {
                return this.onLoad();
            });
        }
    }
    onLoad = () => {
        const { history, match, location } = this.props;
        const index = catIds.map((e) => e.name).indexOf(match.params.cat);
        if (index < 0) return history.replace("/");
        try {
            const id = catIds[index].id;
            this.setState({ catId: id }, async () => {
                const baseUrl = process.env.REACT_APP_API_URL;
                let subcats = await axios.get(baseUrl + `subtypes/${id}`);
                let {
                    data: { data },
                } = subcats;
                const subindex = data[0].subcategory
                    .map((e) => e.name)
                    .indexOf(this.props.match.params.subcat);
                if (subindex < 0)
                    return history.replace(`/category/${match.params.cat}`);
                return this.setState(
                    {
                        loading: false,
                        subcats: data[0].subcategory,
                        catId: id,
                        active: subindex,
                    },
                    () => {
                        if (location.state)
                            return scroller.scrollTo(location.state, {
                                duration: 500,
                                hashSpy: true,
                                delay: 100,
                                smooth: true,
                                offset: -100,
                            });
                    }
                );
            });
        } catch (error) {
            return history.replace(`/category/${match.params.cat}`);
        }
    };

    onActiveSub = (data) => {
        animateScroll.scrollToTop();
        this.setState({ active: data.index });
    };

    render() {
        const {
            match: { params },
        } = this.props;
        const { active, catId } = this.state;
       

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
        console.log(this.state)
        return (
            <ActivityLoader loading={this.state.loading}>
                <div style={{ background: colors.light, overflow: "hidden" }}>
                    <SeoHeader />
                    <NavBar
                        topColor={isIE ? "#fff" : "rgba(255,255,255,96%)"}
                        bottomColor={isIE ? "#fff" : "rgba(255,255,255,90%)"}
                        search
                        menuColor="black"
                        logoColor="black"
                        onLoad={this.onLoad}
                        category={params.cat}
                        menuDrawerInfo={footerMenu}
                        categoryMenu={this.state.subcats}
                    />
                    <div className="product-container">
                        <ProductList data={this.state.subcats[active].types} />
                    </div>
                    {!(isMobile || isTablet) && (
                        <div className="menu-list-container fixed">
                            <MenuList
                                isProducts
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

export default ProductListPage;
