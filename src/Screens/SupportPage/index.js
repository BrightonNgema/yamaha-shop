import React, { Component } from "react";
import { NavBar, Form, Button, Footer } from "components";
import { colors, font } from "theme";
import { Grid } from "@material-ui/core";
import ResultsCard from "./ResultsCard";
import { icons } from "assets";
import TipCard from "./TipCard/index";
import { isMobile, isIE } from "react-device-detect";
import axios from "axios";
import Loader from "react-loader-spinner";

class SupportPage extends Component {
    state = {
        search: "",
        results: [],
        loading: false,
        empty: false
    };

    onChangeHandler = (text, value) => {
        this.setState({ [text]: value }, () => {
            this.onSearch(this.state.search);
        });
    };

    onSearch = async () => {
        this.setState({
            loading: true,
            empty: false
        });
        const { search } = this.state;
        const baseUrl = process.env.REACT_APP_API_URL;
        let res = await axios.post(
            `${baseUrl}search_all_products?search=${search}`
        );
        let { data } = res.data;
        this.setState({
            results: typeof data === "string" ? [] : data,
            loading: false,
            empty: typeof data === "string"
        });
    };

    onProduct = async prod => {
        const baseUrl = process.env.REACT_APP_API_URL;
        let res = await axios.get(
            `${baseUrl}search_all_categories/${prod.category}`
        );
        let { data } = res.data;
        data = data[0];
        const category = data.name;
        const subtype = data.subcategory.find(
            x => x.id === Number(prod.subcategory)
        );
        this.props.history.push(
            `/category/${category.replace(" ", "_")}/${subtype.name}/${prod.prod_code}`
        );
    };

    render() {
        // console.log(this.state.results);
        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>
                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    // menuDrawerInfo={footerMenu}
                    menuColor="black"
                    logoColor="black"
                />
                <div className="contact-heading-container">
                    <div className="heading-main">
                        <h1 className="contact-heading">
                            What product do you need help with?
                        </h1>
                    </div>
                    <Grid container>
                        <Grid item md={11} xs={9} sm={10}>
                            <Form.FormInput
                                className="contact-input"
                                label="Search"
                                name="search"
                                onChange={this.onChangeHandler}
                                value={this.state.search}
                            />
                        </Grid>
                        <Grid item md="auto" xs={2}>
                            <div style={{ margin: "20px 0px 0px" }}>
                                <Button
                                    type="primary yamaha-btn-lg"
                                    title="Clear"
                                    onClick={() =>
                                        this.setState({ search: "" })
                                    }
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <div style={{ marginTop: 10, marginLeft: 5 }}>
                        <Grid container>
                            {this.state.results.length > 0 && (
                                <Grid item md={12}>
                                    <div
                                        style={{
                                            color: "#BCBDBC",
                                            marginBottom: 0,
                                            fontSize: 12,
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {this.state.results.length} RESULT(S)
                                        SHOWING
                                    </div>
                                </Grid>
                            )}
                            {this.state.results.map((data, index) => (
                                <ResultsCard
                                    key={index}
                                    data={data}
                                    last={
                                        index === this.state.results.length - 1
                                    }
                                    onProduct={this.onProduct}
                                />
                            ))}
                            {this.state.loading && (
                                <div style={{ margin: "30px auto" }}>
                                    <Loader
                                        type="RevolvingDot"
                                        color={colors.primary}
                                        height={35}
                                        width={35}
                                    />
                                </div>
                            )}
                            {this.state.empty && (
                                <div style={{ margin: "30px auto" }}>
                                    <div
                                        style={{
                                            fontSize: "1.5rem",
                                            color: colors.primary,
                                            fontFamily: font.secondary,
                                            fontWeight: "bold"
                                        }}
                                    >
                                        No products Found
                                    </div>
                                </div>
                            )}
                        </Grid>
                    </div>
                    <div
                        style={{
                            marginTop: 30,
                            marginLeft: isMobile ? null : 5
                        }}
                    >
                        <Grid container>
                            <Grid item md={12}>
                                <div
                                    style={{
                                        color: "#BCBDBC",
                                        marginBottom: 20,
                                        fontSize: "1.8rem",
                                        fontFamily: font.secondary,
                                        fontWeight: "bold"
                                    }}
                                >
                                    QUICK TIPS
                                </div>
                                <TipCard
                                    icon={icons.information}
                                    title="Need to register a Yamaha product warranty?"
                                    info="Register your warranty →"
                                    to="/warranty"
                                />
                                <Grid container spacing={3}>
                                    <Grid item md={7}>
                                        <TipCard
                                            icon={icons.specification}
                                            title="Need after sales help?"
                                            info="CONTACT AFTER SALES SUPPORT →"
                                            to="/contact"
                                        />
                                        <TipCard
                                            icon={icons.automobile_with_wrench}
                                            title="Need support on your bike or boat?"
                                            info="FIND OUT MORE →"
                                            to={{
                                                pathname: "/about",
                                                query: { aboutIndex: 5 }
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={5}
                                        style={{ marginLeft: "auto" }}
                                    >
                                        <Grid
                                            container
                                            spacing={2}
                                            style={{
                                                padding: "20px 10px",
                                                marginBottom: 30,
                                                border: "1px solid #BCBDBC",
                                                marginLeft: isMobile ? null : 5,
                                                height: "auto",
                                                backgroundColor: "#fff"
                                            }}
                                        >
                                            <Grid item md="auto">
                                                <img
                                                    alt="information_icon"
                                                    src={icons.driver_license}
                                                    style={{
                                                        height: 40
                                                    }}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                md="auto"
                                                style={{ margin: "auto" }}
                                            >
                                                <div
                                                    style={{
                                                        fontFamily:
                                                            font.secondary,
                                                        fontSize: "1.5rem",
                                                        color: "#1e1e1e",
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    Need help with learning how
                                                    to ride?
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                md={6}
                                                style={{
                                                    marginTop: 5
                                                }}
                                            ></Grid>
                                            <Grid
                                                item
                                                md={6}
                                                style={{
                                                    marginTop: 5
                                                }}
                                            >
                                                <Button
                                                    type="secondary"
                                                    title="Soweto riding school"
                                                    onClick={() => this.props.history.push('/ambassadors/Alfred_Matamela')}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Footer mainFooter />
            </div>
        );
    }
}

export default SupportPage;
