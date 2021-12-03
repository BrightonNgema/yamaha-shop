import React, { Component } from 'react';
import { NavBar, Footer, Accordion, TermsAccordian, Button } from "components";
import { Grid, Card, CardContent, Avatar } from "@material-ui/core";
import { isIE } from 'react-device-detect';
import { colors } from "theme";
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import { Link } from "react-router-dom";
import './index.css'
export default class MyAccountPage extends Component {
    headerRender() {
        return (
            <Grid container style={{ display: "flex", marginBottom: 50 }}>


                <Grid item md={12} xs={12}>
                    <h1 className="type-heading">MY ACCOUNT INFORMATION</h1>

                </Grid>
                <Grid item md={12} xs={12}>
                    <div className="account-btn">
                        <Button
                            type="primary yamaha-btn-md "
                            link="/"
                            title="HOME PAGE"
                        ></Button>
                    </div>
                </Grid>
            </Grid>
        );
    }
    optionsRender() {
        const options = [
            { text: "YOUR ORDERS", link: 'account/orders', icon: <ShoppingCartRoundedIcon fontSize={'large'} /> },
            { text: "PERSONAL DETAILS", link: 'account/personal-details', icon: <PersonRoundedIcon fontSize={'large'} /> },
            { text: "DELIVERY ADDRESSES", link: 'account/delivery', icon: <RoomRoundedIcon fontSize={'large'} /> }
        ]
        let optionLooped = []
        options.forEach((val, index) => {
            optionLooped.push(this.option(val.text, val.icon, val.link, 4, 12, index))
        })

        return (
            <Grid container spacing={1} style={{ marginTop: "10px" }}>
                {optionLooped}
            </Grid>
        );
    }
    option(text, icon, link, sizeMd, sizeSm, index) {
        return (
            <Grid item md={sizeMd} xs={sizeSm} key={index} style={{ marginTop: "10px" }}>
                <Link to={link} className="link-style">

                    <Card variant="outlined" className="option-height">
                        <CardContent className="card-content-style" >
                            <Avatar className="avatar" >{icon}</Avatar>
                            <strong><p>{text}</p></strong>
                        </CardContent>
                    </Card >
                </Link >
            </Grid>
        )
    }
    otherInformationRender() {
        const accordions = [
            { heading: "DELIVERY INFORMATION", text: (<></>) },
            { heading: "RETURNS POLICY", text: (<></>) },
            { heading: "TERMS & CONDITIONS", text: (<></>) }
        ]
        let renderAccordion = []
        accordions.forEach((val, index) => {

            renderAccordion.push(<Accordion key={index} heading={val.heading} text={val.text}></Accordion>)
        })
        return (

            <Grid container style={{ marginTop: "10px" }} className='accordians-text'>

                <Grid item xs={12} sm={12}>

                    <h2 className="h2-style">YAMAHA SHOP INFORMATION</h2>
                </Grid>


                <Grid item xs={12} sm={12}>
                    <TermsAccordian />
                </Grid>

            </Grid>

        )
    }
    render() {
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
        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>
                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    warranty
                    menuColor="black"
                    menuDrawerInfo={footerMenu}
                    logoColor="black"
                />
                <div className="generic-container">

                    <div style={{ padding: "35px 0px", flexGrow: 1 }}>
                        {this.headerRender()}
                        {this.optionsRender()}
                        {this.otherInformationRender()}
                    </div>
                </div>
                <Footer fixed mainFooter />
            </div>
        )
    }
}
