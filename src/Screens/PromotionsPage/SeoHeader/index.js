import React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";

const categories = 
    {
        name: "promotion",
        heading: "Yamaha South Africa | Promotion",
        description:
            "The home of the finest quality musical instruments in South Africa. Browse the full range of Yamaha Musical Instruments here.",
        keywords:
            "Musical Instruments, Yamaha Instruments, Yamaha Musical Instruments, Musical Instruments in South Africa",
        url: "https://www.yamaha.co.za/category/music"
    }
function SeoHeader({ match }) {
    const seo = categories
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{seo.heading}</title>
            <link rel="canonical" href={seo.url}/>
            <meta name="description" content={seo.description} />
            <meta name="keywords" content={seo.keywords} />
        </Helmet>
    );
}

export default withRouter(SeoHeader);
