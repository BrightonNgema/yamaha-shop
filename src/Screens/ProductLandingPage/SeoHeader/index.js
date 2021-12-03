import React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";

const categories = [
    {
        name: "music",
        heading: "Yamaha South Africa | Music",
        description:
            "The home of the finest quality musical instruments in South Africa. Browse the full range of Yamaha Musical Instruments here.",
        keywords:
            "Musical Instruments, Yamaha Instruments, Yamaha Musical Instruments, Musical Instruments in South Africa",
        url: "https://www.yamaha.co.za/category/music"
    },
    {
        name: "power_products",
        heading: "Yamaha South Africa | Power Products",
        description:
            "A cut above the rest: multi-purpose engines, lawn mowers, generators & pumps.",
        keywords:" ",
        url: "https://www.yamaha.co.za/category/power_products"
    },
    {
        name: "motorcycles",
        heading: "Yamaha South Africa | Motorcycles",
        description:
            "The most sought-after motorcycles designed to deliver the pinnacle of performance on and off the track.",
        keywords: " ",
        url: "https://www.yamaha.co.za/category/motorcycles"
    },
    {
        name: "marine",
        heading: "Yamaha South Africa | Marine",
        description:
            "Yamaha has been on the forefront of the boating industry since developing the first boat made in Japan from fiberglass reinforced plastic in 1958.",
        keywords: " ",
        url: "https://www.yamaha.co.za/category/marine"
    },
    {
        name: "pro_audio",
        heading: "Yamaha South Africa | Pro Audio",
        description:
            "All the world’s your stage with more power, more features, improved functionality, and even better sound.",
        keywords: " ",
        url: "https://www.yamaha.co.za/category/pro_audio"
    },
    {
        name: "golf_cars",
        heading: "Yamaha South Africa | Golf Cars",
        description:
            "Designed for player comfort and convenience, with state-of-the-art body styling – the perfect partner for the perfect game.",
        keywords: " ",
        url: "https://www.yamaha.co.za/category//golf_cars"
    },
    {
        name: "home_audio",
        heading: "Yamaha South Africa | Home Audio",
        description:
            "A long tradition of excellence. Experience the ultimate in audio reproduction and the very essence of music.",
        keywords: " ",
        url: "https://www.yamaha.co.za/category/home_audio"
    }
];

function capitalizeFLetter(value) {

    return value.charAt(0).toUpperCase() + value.slice(1)
} 

function SeoHeader({ match , product}) {
    const seo = categories.find(data => data.name === match.params.cat);
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{seo.heading} | {capitalizeFLetter(match.params.subcat)} | {product.code}</title>
            <link rel="canonical" href={seo.url + "/" + match.params.subcat + "/" + product.code}/>
            <meta name="description" content={product.description} />
            <meta name="keywords" content={seo.keywords} />
        </Helmet>
    );
}

export default withRouter(SeoHeader);
