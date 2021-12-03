import React, { Component } from "react";
import { colors } from "theme";

class ViewCompare extends Component {
    state = {
        numProd:0
    }

    componentDidMount() {
        this.interval = setInterval(
            () =>  this.NumOfProd(),
            50
        );
        return this.NumOfProd();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    NumOfProd = () => {
        let productsArray = localStorage.getItem("products");
        let products = productsArray ? JSON.parse(productsArray) : [];
        if (this.state.numProd !== products.length) {
            return this.setState({
                numProd: products.length
            })
        }
       
    };

    render() {
        if(this.state.numProd < 1) return null
        return (
            <div
                style={{
                    fontSize: 12,
                    color: this.props.isLandingPage
                        ? colors.light
                        : colors.dark,
                    cursor: "pointer",
                    pointerEvents: "all"
                }}
                onClick={this.props.onView}
            >
                {this.state.numProd > 0 && (
                    <span
                        style={{
                            padding: "2px 5px",
                            color: colors.light,
                            borderRadius: "100%",
                            backgroundColor: colors.primary,
                            fontSize: 12,
                            marginRight: 5
                        }}
                    >
                        {this.state.numProd}
                    </span>
                )}
                VIEW COMPARE →
            </div>
        );
    }
}

export default ViewCompare;
