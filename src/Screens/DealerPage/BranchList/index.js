import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import BranchListComponent from "./BranchListComponent";
import { geolocated } from "react-geolocated";
import { Form, Button } from "components";
import Loader from "react-loader-spinner";
import { colors } from "theme";
import { catIds } from "theme/categoryIds";

const axios = require("axios");
const geo = require("mapbox-geocoding");
const all = 
    {
        id: 0,
        name: ""
    }
;
class BranchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "",
            dealeraddress: "",
            dealers: [],
            filteredDealers: [],
            loading: true,
            limit: 8
        };
    }

    componentDidMount = async () => {
        const baseUrl = process.env.REACT_APP_API_URL;
        let dealers = await axios.get(baseUrl + "dealers");
        let { data } = dealers.data;
        this.setState({ dealers: data, filteredDealers: data });
        const { coords } = this.props;
        if (coords) {
            return this.geocoding(coords);
        }
        return this.filterDealers("");
    };

    geocoding = coords => {
        let that = this;
        geo.setAccessToken(process.env.REACT_APP_MAPBOX_KEY);
        geo.reverseGeocode(
            "mapbox.places",
            coords.longitude,
            coords.latitude,
            (err, geoData) => {
                const place = geoData.features.find(data => {
                    let isPlace =
                        data.place_type[0] === "locality" ||
                        data.place_type[0] === "place";
                    return isPlace;
                });
                return that.setState(
                    {
                        dealeraddress: place ? place.text : ""
                    },
                    () => this.filterDealers(place.text)
                );
            }
        );
    };

    onChangeHandler = (name, value) => {
        this.setState({ [name]: value, loading: true }, () => {
            this.filterDealers();
        });
    };

    onCategory = (name, value) => {
        name = name === "all" ? "" : name
        let filter = this.state.dealers.filter(data => {
            const isMatch =
                data.category.toLowerCase().includes(value.toLowerCase()) &&
                data.address
                    .toLowerCase()
                    .includes(this.state.dealeraddress.toLowerCase());
            return isMatch ? data : null;
        });
        this.setState({
            [name]: value,
            loading: false,
            filteredDealers: filter
        });
    };

    filterDealers = value => {
        let filter = this.state.dealers.filter(data => {
            const isMatch =
                data.category
                    .toLowerCase()
                    .includes(this.state.category.toLowerCase()) &&
                data.address
                    .toLowerCase()
                    .includes(this.state.dealeraddress.toLowerCase());
            return isMatch ? data : null;
        });
        this.setState({ filteredDealers: filter, loading: false });
    };

    showMore = () => this.setState({ limit: 999 });

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item md={3}>
                        <Form.FormDropdown
                            name="category"
                            label="category"
                            options={[
                                all.name,
                                ...catIds.map(cat => cat.name.replace("_", " "))
                            ]}
                            value={this.state.category}
                            onChange={this.onCategory}
                        />
                    </Grid>
                    <Grid item md={9}>
                        <Form.FormInput
                            name="dealeraddress"
                            label="Address"
                            onChange={this.onChangeHandler}
                            value={this.state.dealeraddress}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={4} className="branchcontainer">
                    {this.state.loading ? (
                        <div style={{ margin: "auto" }}>
                            <Loader
                                type="RevolvingDot"
                                color={colors.primary}
                                height={25}
                                width={25}
                            />
                        </div>
                    ) : (
                        this.state.filteredDealers.map((data, index) => {
                            const {
                                id,
                                name,
                                address,
                                category,
                                telephone,
                                email
                            } = data;
                            if (index >= this.state.limit) return null;
                            return (
                                <BranchListComponent
                                    key={id}
                                    last={
                                        index === this.state.limit - 1 ||
                                        index ===
                                            this.state.filteredDealers.length -
                                                1
                                    }
                                    name={name}
                                    address={address}
                                    category={category}
                                    telephone={telephone}
                                    email={email}
                                />
                            );
                        })
                    )}
                </Grid>
                {this.state.limit <= this.state.filteredDealers.length && (
                    <div style={{ textAlign: "center", marginTop: 10 }}>
                        <Button
                            title="Show more +"
                            onClick={this.showMore}
                            type="yamaha-btn-xs yamaha-btn-secondary"
                        />
                    </div>
                )}
            </div>
        );
    }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false
    },
    userDecisionTimeout: 10000
})(BranchList);
