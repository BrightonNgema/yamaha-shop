import React, { Component } from "react";
import { NavBar, Footer, ActivityLoader } from "components";
import { colors } from "theme";
import { Grid } from "@material-ui/core";
import ProductInfo from "./ProductInfo";
import ProductAccordion from "./ProductAccordian";
import { isMobile, isIE } from 'react-device-detect';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const footerMenu = [
    {
        title: "Home",
        link: "/"
    },

    {
        title: "Warranty",
        link: "/warranty"
    },
    {
        title: "Yamaha Finance",
        link: "/finance"
    },
    {
        title: "Find My Dealer",
        link: "/dealer"
    }
];

class ComparePage extends Component {
    state = {
        products: [
            {
                spec: {
                    specifications: [
                        {
                            subtitles: []
                        }
                    ]
                }
            }
        ],
        loading: true
    };

    componentDidMount = async () => {
        let productsArray = await localStorage.getItem("products");
        let prods = productsArray ? JSON.parse(productsArray) : [];
        if (isMobile || prods.length < 1) {
            this.props.history.push('/')
        }
        this.setState({
            products: prods,
            loading: false
        });
    };

    onRemove = id => {
        this.setState({ loading: true });
        const newProd = this.state.products.filter(data => data.prodID !== id);
        localStorage.removeItem("products");
        localStorage.setItem("products", JSON.stringify(newProd));

        this.setState({
            products: newProd,
            loading: false
        }, () => {
            if (newProd.length < 1) {
                return this.props.history.push('/')
            }
        });
    };

    render() {
        return (
            <ActivityLoader loading={this.state.loading}>
                <div style={{ background: colors.light, overflow: "hidden" }}>
                    <NavBar
                        topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                        bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                        search
                        menuDrawerInfo={footerMenu}
                        menuColor="black"
                        logoColor="black"
                        onPageEmail={() => alert('clicked')}
                        onPageDownload={() => {
                            const input = document.getElementById('compare-container');
                            html2canvas(input)
                                .then((canvas) => {
                                    const imgData = canvas.toDataURL('image/png');
                                    const pdf = new jsPDF();
                                    pdf.addImage(imgData, 'JPEG', 0, 0);
                                    // pdf.output('dataurlnewwindow');
                                    pdf.save("download.pdf");
                                })
                        }}

                    />
                    <div className="contact-heading-container" id="compare-container">
                        <Grid
                            container
                            spacing={2}
                            style={{ paddingTop: 100, marginLeft: "auto" }}
                        >
                            <Grid item md={3} />
                            {this.state.products.length > 0 && (
                                <ProductInfo
                                    products={this.state.products}
                                    onRemove={this.onRemove}
                                />
                            )}
                        </Grid>
                        {this.state.products.length > 0 &&
                            this.state.products[0].spec.specifications.map(
                                (data, index) => {
                                    const fakeProd = [
                                        {
                                            spec: {
                                                specifications: [
                                                    {
                                                        subtitles: []
                                                    }
                                                ]
                                            }
                                        }
                                    ];

                                    const prodTwo =
                                        this.state.products.length < 2
                                            ? fakeProd[0]
                                            : this.state.products[1]

                                    return (
                                        <ProductAccordion
                                            key={index}
                                            active={index}
                                            prodOne={data.subtitles}
                                            prodTwo={prodTwo}
                                            heading={data.title}
                                        />
                                    );
                                }
                            )}
                    </div>
                    <Footer mainFooter />
                </div>
            </ActivityLoader>
        );
    }
}
export default ComparePage;
