import React from 'react';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import Paper from '@material-ui/core/Paper';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

const Alerts = ({ header, paragraph1, paragraph2, paragraph3 ,additional}) => {
    return (
        <span>
            <div style={{ marginTop: 20 }}>
                <Paper style={{ paddingLeft: 10 }}>
                    <Grid container spacing={2} >
                        <div style={{ backgroundColor: "#F4F4F4", padding: 20 }}>
                            <WarningRoundedIcon style={{ color: 'red', fontSize: 40, float: "left", paddingRight: 10 }} />
                            <div style={{ float: "right" }}>
                                <Typography className="auth-info-text-bold">{header}</Typography>
                                <Typography className="auth-info-text">{paragraph1}</Typography>
                                <Typography className="auth-info-text">{paragraph2}</Typography>
                                <Typography className="auth-info-text">{paragraph3}</Typography>
                                {additional?additional:<></>}
                            </div>
                        </div>
                    </Grid>
                </Paper>
            </div>
        </span>
    )
}

export default Alerts;