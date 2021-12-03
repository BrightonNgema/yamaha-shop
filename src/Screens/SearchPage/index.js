import React, { Component } from "react";
import { NavBar, Form, Button, Footer } from "components";
import { colors, font } from "theme";
import { Grid } from "@material-ui/core";
import ResultsCard from "./ResultsCard";
import axios from "axios";
import Loader from "react-loader-spinner";
import { isIE } from 'react-device-detect';

class SearchPage extends Component {
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
        // console.log(`/category/${category.replace(" ","_")}/${subtype.name}/${prod.prod_code}`);
        this.props.history.push(`/category/${category.replace(" ", "_")}/${subtype.name}/${prod.prod_code}`);
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
                    <div className="heading-main" style={{ marginLeft: 5 }}>
                        <h1 className="contact-heading">
                            TYPE YOUR SEARCH BELOW
                        </h1>
                        <div
                            class="type-subheading"
                            style={{ marginBottom: 20 }}
                        >
                            Search within our whole product range.
                        </div>
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
                </div>
                <Footer mainFooter />
            </div>
        );
    }
}

export default SearchPage;
