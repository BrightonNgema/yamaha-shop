import React from "react";
import { Helmet } from "react-helmet";

export default function SeoTag({ title, url, description, keywords }) {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <link rel="canonical" href={url} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            {/* <meta http-equiv="refresh" content={`1; url=${url}`} /> */}
        </Helmet>
    );
}
