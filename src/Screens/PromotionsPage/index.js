import React, { Component } from "react";
import { ActivityLoader, Footer, PromotionsCarousel, NavBar } from "components";
import "./index.css";
import { animateScroll } from "react-scroll";
import { isMobile, isTablet } from "react-device-detect";
import PromotionsMenuList from "./PromotionsMenuList";
import SeoHeader from "./SeoHeader";
const axios = require("axios");

export default class PromotionsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            active: 0
        };
    }

    componentDidMount = async () => {
        animateScroll.scrollToTop();
        const query = this.props.location.query;
        const baseUrl = process.env.REACT_APP_API_URL;
        let res = await axios.get(baseUrl + "promotions");
        if (query) {
            const activeIndex = query.aboutIndex;

            if (activeIndex > res.data.data)
                return this.setState({ active: 0 });
            return this.setState({
                active: activeIndex,
                loading: false,
                data: res.data.data
            });
        }
        return this.setState({ loading: false, data: res.data.data });
    };

    nextAbout = () => {
        if (this.state.active >= this.state.data.length - 1) {
            this.setState({ active: 0 });
        } else {
            this.setState({ active: this.state.active + 1 });
        }
    };

    previousAbout = () => {
        if (this.state.active === 0) {
            this.setState({ active: this.state.data.length - 1 });
        } else {
            this.setState({ active: this.state.active - 1 });
        }
    };

    onActiveAbout = data => {
        this.setState({ active: data.index });
    };

    componentWillReceiveProps = nextProps => {
        const query = nextProps.location.query;
        if (query) {
            let activeIndex = query.aboutIndex;
            if (activeIndex > this.state.data)
                return this.setState({ active: 0 });

            return this.setState({
                active: activeIndex,
                loading: false
            });
        }
        return this.setState({ loading: false });
    };

    render() {
        return (
            <ActivityLoader loading={this.state.loading}>
                <SeoHeader />
                <PromotionsCarousel
                    navbar={
                        <NavBar
                            // topColor="rgba(0,0,0,96%)"
                            // bottomColor="rgba(0,0,0,88%)"
                             menuColor="white"
                            search
                            logoColor="white"
                            categoryMenu={this.state.data}
                            activeAbout={this.state.active}
                            
                        />
                    }
                    activeAbout={this.onActiveAbout}
                    onStepper={this.onActiveAbout}
                    activeData={this.state.data[this.state.active]}
                    data={this.state.data}
                    nextAbout={this.nextAbout}
                    previousAbout={this.previousAbout}
                    footer={<Footer mainFooter />}
                />

                {!(isMobile || isTablet) && (
                    <div className="menu-list-container">
                        <PromotionsMenuList
                            category={{
                                name: this.props.match.params.cat,
                                id: 1
                            }}
                            onActive={this.onActiveAbout}
                            data={this.state.data}
                            index={this.state.active}
                        />
                    </div>
                )}
            </ActivityLoader>
        );
    }
}
