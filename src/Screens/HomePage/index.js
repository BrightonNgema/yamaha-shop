import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "./home.css";
import { Hexagon, Footer, NavBar, Carousel } from "components";
// import finance from "../../Assets/images/finance_banners.jpg";
import music from "../../Assets/images/music_banners.jpg";
import motorcycle from "../../Assets/images/motorcycle_banners.jpg";
import waverunner from "../../Assets/images/waverunner_banners.jpg";
const infor = [
    {
        text: "SA Corona Virus",
        copytext: "For more information on Covid-19 within South Africa, click on the link below.",
        btnText: "Find out more on SA Corona Virus here",
        btnUrl: "https://sacoronavirus.co.za",
        image: "https://api.yamaha.co.za/lara/uploads/Yamaha_1920x1080_V2.jpg"
    },
   
    {
        text: "Your adventure. Realized",
        copytext:
            "Explore the motorcycle section of the new Yamaha website to experience all the motorcycles and ATVs Yamaha have available.",
        btnText: "Contact Us",
        btnLink: "/contact",
        image: motorcycle
    },
    
    {
        text: "Own every note ",
        copytext:
            "Explore the music section of the new Yamaha website to experience all the instruments Yamaha have available.",
        btnText: "Contact Us",
        btnLink: "/contact",
        image: music
    },
    {
        text: "Plain sailing and unequalled reliability",
        copytext:
            "Explore the marine section of the new Yamaha website to experience all the boats, outboards and waverunners Yamaha have available",
        btnText: "Contact Us",
        btnLink: "/contact",
        image: waverunner
    }
];

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
// const additionalMenu = [
//     {
//         title: 'ABOUT US',
//         link: '/aboutus'
//     },
//     {
//         title: 'RECRUITMENT',
//         link: "/recruitment"
//     },
//     {
//         title:'LEGAL',
//         link:'/legal'
//     },
//     {
//         title:"LIVE CHAT",
//         link:'./live-chat'
//     }
// ]
class Home extends Component {
    render() {
        return (
            <div style={{backgroundColor:'#000'}}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Yamaha South Africa | Home</title>
                    <link rel="canonical" href="https://www.yamaha.co.za" />
                    <meta
                        name="description"
                        content="Welcome to the home of Yamaha South Africa"
                    />
                    <meta
                        name="keywords"
                        content="Yamaha, Yamaha South Africa, Musical Instruments, Yamaha Instruments, Yamaha Musical Instruments, Musical Instruments in South Africa"
                    />
                </Helmet>
                <Carousel
                    navbar={
                        <NavBar
                            signin
                            showBreadcrumbs={false}
                            menuDrawerInfo={footerMenu}
                            additional={null}
                        />
                    }
                    data={infor}
                    interval={10000}
                    menu={<Hexagon home />}
                    footer={<Footer mainFooter />}
                />
            </div>
        );
    }
}

export default Home;
