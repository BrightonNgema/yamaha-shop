import { email, string, cellnumber, fullname } from "./regex";
import { catIds } from "./categoryIds";
import theme, { primaryTheme as pt } from './CustomTheme';

export default theme;
export const colors = {
    primary: "#D52B1E",
    transparent: "Transparent",
    light: "#fff",
    dark: "#000",
    blue: "#1EA4D5",
    light_blue: "#008D99",
    grey: "#56585A",
    light_grey: "#F4F4F4",
};

export const font = {
    primary: "Ubuntu, sans-serif",
    secondary: "rift"
};

export const categoryIds = catIds
export const regex = { email, string, cellnumber, fullname };
export const primaryTheme = pt;
