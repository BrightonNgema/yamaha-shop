// import React from "react";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
// import { Grid } from "@material-ui/core";
// import "./tab.css";
// import MobileNavTabs from "./mobileTab/index";
// import { isMobile } from "react-device-detect";
// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <Typography
//             component="div"
//             role="tabpanel"
//             hidden={value !== index}
//             id={`scrollable-auto-tabpanel-${index}`}
//             aria-labelledby={`scrollable-auto-tab-${index}`}
//             {...other}
//         >
//             <Box p={3}>{children}</Box>
//         </Typography>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired
// };

// function a11yProps(index) {
//     return {
//         id: `scrollable-auto-tab-${index}`,
//         "aria-controls": `scrollable-auto-tabpanel-${index}`
//     };
// }

// function LinkTab(props) {
//     return (
//         <Tab
//             component="div"
//             scrollButtons="desktop"
//             onClick={event => {
//                 event.preventDefault();
//             }}
//             {...props}
//         />
//     );
// }

// const useStyles = makeStyles(theme => ({
//     root: {
//         flexGrow: 1,
//         width: "100%"
//     },
//     Indicator: {
//         backgroundColor: ""
//     }
// }));

// export default function NavTabs({ product }) {
//     const classes = useStyles();
//     const [value, setValue] = React.useState(0);

//     function handleChange(event, newValue) {
//         setValue(newValue);
//     }
//     if (isMobile) return <MobileNavTabs product={product} />;
//     return (
//         <Grid item xs={12} sm={12} md={10} style={{ margin: "60px auto" }}>
//             <div className={classes.root}>
//                 <AppBar position="static" className="product-landing-tab">
//                     <Tabs
//                         value={value}
//                         onChange={handleChange}
//                         avariant="scrollable"
//                         scrollButtons="auto"
//                         aria-label="scrollable auto tabs example"
//                         // indicatorColor=""
//                     >
//                         {product.features.map((data, index) => (
//                             <LinkTab
//                                 label={data.title}
//                                 href="/drafts"
//                                 {...a11yProps(index)}
//                                 key={index}
//                             />
//                         ))}
//                     </Tabs>
//                 </AppBar>
//                 {product.features.map((data, index) => (
//                     <TabPanel value={value} index={index} key={index}>
//                         <div
//                             style={{
//                                 fontWeight: "bold",
//                                 marginBottom: 10,
//                                 textTransform: "initial",
//                                 fontSize: "1.2rem",
//                                 marginLeft: 24
//                             }}
//                         >
//                             {data.title}
//                         </div>
//                         <div
//                             style={{
//                                 textTransform: "initial",
//                                 fontSize: "1rem",
//                                 marginLeft: 24
//                             }}
//                         >
//                             {data.description}
//                         </div>
//                         {/* {data.image &&
//                             <img
//                                 alt=""
//                                 src={process.env.REACT_APP_URL + data.image}
//                                 style={{
//                                     width: "100%",
//                                     maxHeight: 300,
//                                     marginTop: 30
//                                 }}
//                             />} */}
//                     </TabPanel>
//                 ))}
//             </div>
//         </Grid>
//     );
// }

import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import "./tab.css";
import MobileNavTabs from "./mobileTab/index";
import { isMobile } from "react-device-detect";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    Indicator: {
        backgroundColor: ""
    }
}));

export default function ScrollableTabsButtonAuto({ product }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    if (isMobile) return <MobileNavTabs product={product} />;
    return (
        <Grid item xs={12} sm={12} md={10} style={{ margin: "60px auto" }}>
            <div className={classes.root}>
                <AppBar
                    position="static"
                    color="default"
                    className="product-landing-tab"
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        {product.features.map((data, index) => (
                            <Tab key={index} label={data.title} {...a11yProps(index)} />
                        ))}
                    </Tabs>
                </AppBar>
                {product.features.map((data, index) => (
                    <TabPanel value={value} index={index} key={index}>
                        <div
                            style={{
                                fontWeight: "bold",
                                marginBottom: 10,
                                textTransform: "initial",
                                fontSize: "1.2rem",
                                marginLeft: 24
                            }}
                        >
                            {data.title}
                        </div>
                        <div
                            style={{
                                textTransform: "initial",
                                fontSize: "1rem",
                                marginLeft: 24
                            }}
                        >
                            {data.description}
                        </div>
                        {/* {data.image &&
                            <img
                                alt=""
                                src={process.env.REACT_APP_URL + data.image}
                                style={{
                                    width: "100%",
                                    maxHeight: 300,
                                    marginTop: 30
                                }}
                            />} */}
                    </TabPanel>
                ))}
            </div>
        </Grid>
    );
}
