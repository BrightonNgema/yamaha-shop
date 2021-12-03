import React, { Component } from 'react';
import { NavBar, Footer, Toastr } from "components";
import { colors } from "theme";
import { isIE } from "react-device-detect";
import { Helmet } from "react-helmet";


class BlankScreen extends React.Component{
    render(){
        const footerMenu = [
            {
                title: "Home",
                link: "/",
            },
            {
                title: "Warranty",
                link: "/warranty",
            },
            {
                title: "Yamaha Finance",
                link: "/finance",
            },
            {
                title: "Find My Dealer",
                link: "/dealer",
            },
        ];
 
        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Yamaha South Africa | Register</title>
                    <link
                        rel="canonical"
                        href="https://www.yamaha.co.za/register"
                    />
                    <meta name="description" content="Create a new account" />
                    <meta name="keywords" content="" />
                </Helmet>

                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    menuDrawerInfo={footerMenu}
                    menuColor="black"
                    logoColor="black"
                />
                <div className="generic-container ">
                
                   
                    <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                    
                       

                    </div>
                </div>
                <Footer mainFooter />
            </div>
        );
    }
}
export default BlankScreen;