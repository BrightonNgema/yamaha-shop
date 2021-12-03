import React from "react";
import VenueServices from "./venueServices";

const Section2 = ({data}) => {
    return <VenueServices data={data.venues} />;
};

export default Section2;
