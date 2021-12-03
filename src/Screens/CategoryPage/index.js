import React, { Component } from "react";

import {
    NavBar,
    MenuList,
    CategoryCarousel,
    Footer,
    ActivityLoader
} from "components";
import "./index.css";
import { isMobile, isTablet } from "react-device-detect";
import { catIds } from "theme/categoryIds";
import SeoHeader from "./SeoHeader";

const axios = require("axios");

export default class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoplay: true,
            catId: "",
            subcats: [
                {
                    subcategory: ""
                }
            ],
            loading: true,
            active: 0
        };
    }

    componentDidMount() {
        this.interval = setInterval(
            () => (this.state.autoplay ? this.nextSubCategory() : null),
            10000
        );
        return this.onLoad();
    }
    componentWillReceiveProps() {
        if (isMobile || isTablet) return this.onLoad();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onLoad = async () => {
        this.setState({ loading: true });
        const { history, match } = this.props;
        const index = catIds.map(e => e.name).indexOf(match.params.cat);
        catIds.findIndex(x => x.name === match.params.cat);
        if (index < 0) return history.replace("/");
        try {
            const id = catIds[index].id;
            const baseUrl = process.env.REACT_APP_API_URL;
           
            let subcats = await axios.get(baseUrl + `subtypes/${id}`);
            let {
                data: { data }
            } = subcats;
            const subs = data[0].subcategory.sort((a, b) =>
                a.id > b.id ? 1 : -1
            );
            this.setState({
                loading: false,
                subcats: subs,
                catId: id
            });
        } catch (error) {
            return history.replace("/");
        }
    };

    nextSubCategory = () => {
        if (this.state.active >= this.state.subcats.length - 1) {
            this.setState({ active: 0 });
        } else {
            this.setState({ active: this.state.active + 1 });
        }
    };

    previousSubCategory = () => {
        if (this.state.active === 0) {
            this.setState({ active: this.state.subcats.length - 1 });
        } else {
            this.setState({ active: this.state.active - 1 });
        }
    };

    onActiveSub = data => {
        this.setState({ active: data.index });
    };

    onAutoplay = () => {
     
        this.setState({ autoplay: !this.state.autoplay });
    };

    render() {
        const {
            match: { params }
        } = this.props;
        const { subcats, active } = this.state;

        return (
            <ActivityLoader loading={this.state.loading}>
                <SeoHeader />
                <CategoryCarousel
                    navbar={
                        <NavBar
                            search
                            category={params.cat}
                            logoColor="white"
                            categoryMenu={this.state.subcats}

                        />
                    }
                    onMouseEnter={this.onAutoplay}
                    onMouseLeave={this.onAutoplay}
                    activeSub={this.onActiveSub}
                    onStepper={this.onActiveSub}
                    activeData={this.state.subcats[this.state.active]}
                    data={this.state.subcats}
                    nextSubCategory={this.nextSubCategory}
                    previousSubCategory={this.previousSubCategory}
                    footer={<Footer mainFooter />}
                />
                {/* <img
                    src={require("../../Assets/images/menu_grad.png")}
                    className="triangle-topright"
                /> */}
                {!(isMobile || isTablet) && (
                    <div className="menu-list-container full">
                        <MenuList
                            onMouseEnter={this.onAutoplay}
                            onMouseLeave={this.onAutoplay}
                            category={{
                                name: this.props.match.params.cat,
                                id: this.state.catId
                            }}
                            onActiveSub={this.onActiveSub}
                            subtypes={this.state.subcats}
                            subcategory={{
                                name: subcats[active].subcategory,
                                index: active
                            }}
                        />
                    </div>
                )}
            </ActivityLoader>
        );
    }
}
