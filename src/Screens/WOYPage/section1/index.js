import React from "react";
import SideInfo from "./SideInfo";
import woyImage from "../../../Assets/images/header-image.png";

const Section1 = ({data}) => {
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(25, 25, 25, 0.2), rgba(8, 8, 8, 0.2)),url(${woyImage})`,
                backgroundSize: "cover",
                minHeight: "100vh",
                width: "100%",
                backgroundPosition: "center",
                marginTop: 120,
                marginBottom:-36
            }}
        >
            <SideInfo data={data}/>
        </div>
    );
}

export default Section1