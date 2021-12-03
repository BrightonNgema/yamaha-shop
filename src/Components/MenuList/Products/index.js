import React from "react";
import { withRouter } from "react-router-dom";
import { Typography, ExpansionPanelDetails } from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";

function Products({ products, to, history }) {
    return (
        <div style={{ maxHeight: 180, overflow: "auto", cursor:'pointer' }}>
            {products.map(product => (
                <div
                    key={product.id}
                    className="menu-link"
                    onClick={() => history.push(`${to}/${product.prod_code}`)}
                >
                    <ExpansionPanelDetails
                        className="expander-light"
                        style={{ height: 20 }}
                    >
                        <Typography
                            style={{
                                fontSize: 12,
                                margin: "auto 5px auto auto",
                                color: "#616365"
                            }}
                        >
                            {product.prod_code}
                        </Typography>
                        <KeyboardArrowRight
                            style={{
                                color: "#bcbdbc",
                                height: 15,
                                margin: "auto 0px"
                            }}
                        />
                    </ExpansionPanelDetails>
                </div>
            ))}
        </div>
    );
}

export default withRouter(Products);
