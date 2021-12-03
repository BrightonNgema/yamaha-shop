import React from 'react';
import { Dialog, Grid, List, ListItem, Divider, ListItemText, ListSubheader, Table, TableHead, TableRow, TableCell, TableBody, Paper, } from "@material-ui/core";
import { NavBar, Footer, Accordion, Form as FC, Button, ImageRow, Toastr } from "components";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";


const TopHeader = () => {
    return (
        <Grid container style={{ position: "relative", marginBottom: 40 }}>
            <Grid item xs={12} sm={12}>
                <h2 className="contact-heading">Additional Information</h2>
            </Grid>
            <Grid item xs={12} sm={12}>
                <div style={{ color: "#56585A", marginTop: -30 }}>
                    We need a bit more information for some of the products
                    in your cart before we can finalise the order, please
                    complete the options below.
                </div>
            </Grid>
        </Grid>
    );
};
export default function({ data, funct ,binding})  {
    return (
        <div className="max-width-modal">

            {TopHeader()}
            <Grid item md={12} xs={12} style={{ marginTop: 20 }}>
                <FormControl component="fieldset">

                    {data.map((val) => (
                        <>
                            <FormLabel component="legend">
                                <div className="form-labels">{val.text}</div>
                            </FormLabel>
                            {val.type == 'radio' ?
                                <>
                                    <RadioGroup
                                        style={{ marginTop: 10 }}
                                        row
                                        aria-label="position"
                                        name={val.name}
                                        defaultValue="top"
                                        value={binding[val.name]}
                                        onChange={(e) => funct(val.name,e.target.value)}
                                    >
                                        {val.options.map((option) => (
                                            <>
                                                <FormControlLabel
                                                    value={option.value}
                                                    control={<Radio color="default" />}
                                                    label={
                                                        <Typography className="labels-color">
                                                            {option.label}
                                                        </Typography>
                                                    }
                                                />
                                            </>
                                        ))}

                                    </RadioGroup>
                                </>
                                :
                                <></>
                            }
                        </>
                    ))}
                </FormControl>
            </Grid>
           
        </div>
    )
}
