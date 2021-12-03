import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { isMobile } from 'react-device-detect';
const axios = require("axios");

class AddToCompare extends Component {
    state = {
        products: []
    };

    checkProducts = () => {
        const { subCategoryID, prod_code } = this.props.product;
        let productsArray = localStorage.getItem("products");
        let products = productsArray ? JSON.parse(productsArray) : [];
        if (products.length === 0) {
            return this.getProduct();
        } else if (products.length === 1) {
            if (products[0].subCategoryID !== subCategoryID) {
                return alert(
                    `Cannot compare ${products[0].code.toUpperCase()} with ${prod_code}`
                );
            } else if (Number(products[0].prodID) === this.props.product.id) {
                return alert("Product already added");
            }
            return this.getProduct();
        } else {
            return alert("Maximum comparison reached");
        }
    };

    getProduct = async () => {
        const { id } = this.props.product;
        const baseUrl = process.env.REACT_APP_API_URL;
        let newAPI = await axios.get(baseUrl + `product_all/${id}`);
        const res = await axios.get(baseUrl + `specs/${id}`);
        const {
            data: { product }
        } = newAPI;
        const Prod = {
            ...this.props.match.params,
            ...product,
            spec: res.data,
            ...this.props.product
        };
        this.saveToCompare(Prod);
    };

    saveToCompare = product => {
        let productsArray = localStorage.getItem("products");
        let products = productsArray ? JSON.parse(productsArray) : [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
    };

    render() {
        const selectedCats = this.props.match.params.cat === "motorcycles" || this.props.match.params.cat === "golf_cars" || this.props.match.params.cat === "power_products";
        if(isMobile) return null
        return (
            <div onClick={this.checkProducts} style={{ cursor: "pointer" }}>
                {selectedCats ? this.props.children : null}
            </div>
        );
    }
}

export default withRouter(AddToCompare);
