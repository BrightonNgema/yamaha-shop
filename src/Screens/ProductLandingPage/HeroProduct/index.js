import React from "react";
import { withRouter } from "react-router-dom";

import { MusicImages, MotorcylesImages, GolfImages, HomeImages, ProAudioImages} from './heroImages'
import { MyHero } from "./MyHero";


// const heroPages = [
//     {
//         cat: "motorcycles",
//         name: "tracer900gt",
//         component: <Tracer900gt />
//     },
//     {
//         cat: "golf_cars",
//         name: "quietechEFI",
//         component: <QuietechEFI />
//     },
//     {
//         cat: "golf_cars",
//         name: "efi",
//         component: <EFI />
//     }
// ];
const Category = (cat) => {
    switch (cat) {
        case "golf_cars":
            return GolfImages;
        case "home_audio":
            return HomeImages;
        case "pro_audio":
            return ProAudioImages;
        case "power_products":
            return MusicImages;
        case "music":
            return MusicImages;
        case "marine":
            return MusicImages;
        case "motorcycles":
            return MotorcylesImages;
        default:
            return GolfImages;
    }
}

const Hero = ({ match }) => {
    const isMoto = match.params.cat === "motorcycles" ? "left" : "center"
    const image = Category(match.params.cat)[match.params.prod.replace('-', "").toLowerCase()]
    if(!image) return null
    return <MyHero heroImage={image} isMoto={isMoto}/>
    // const heroProd = heroPages.find(data => data.name === match.params.prod)
    // return heroProd !== undefined ? heroProd.component : null;
};
const HeroProduct = withRouter(Hero);
export { HeroProduct };
