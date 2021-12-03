import React from 'react';
import Grid from '@material-ui/core/Grid';
import { images } from "assets";
import "./index.css";


const ImageRow = ({ isTrue }) => {
    function FormRow() {
        return (
            <>
                <Grid item xs={2} className="image-grid-border" style={{ marginRight: "0.625rem", paddingTop: 1, }}>
                    <img
                        src={isTrue ? images.Icon_VISA : images.Icon_VISA_grey}
                        alt=""
                        style={{ height: "auto", width: "100%" }}
                    />
                </Grid>
                <Grid item xs={2} className="image-grid-border" style={{ marginRight: "0.625rem", }}>
                    <img
                        src={isTrue ? images.Icon_Verified_by_VISA : images.Icon_Verified_by_VISA_grey}
                        alt=""
                        style={{ height: "100%", width: "auto" }}
                    />
                </Grid>
                <Grid item xs={2} className="image-grid-border" style={{ marginRight: "0.625rem", }}>
                    <img
                        src={isTrue ? images.Icon_mastercard : images.Icon_mastercard_grey}
                        alt=""
                        style={{ height: "1.5rem", width: "auto" }}
                    />
                </Grid>
                <Grid item xs={2} className="image-grid-border" style={{ marginRight: "0.625rem", paddingLeft: 5, paddingTop: 4, }}>
                    <img
                        src={isTrue ? images.Icon_MasterCard_SecureCode : images.Icon_MasterCard_SecureCode_grey}
                        alt=""
                        style={{ height: "100%", width: "auto", }}
                    />
                </Grid>
                <Grid item xs={2} className="image-grid-border" style={{ marginRight: "0.625rem", paddingTop: 7, }}>
                    <img
                        src={isTrue ? images.Icon_DPO_South_Africa : images.Icon_DPO_South_Africa_grey}
                        alt=""
                        style={{ height: "auto", width: "100%" }}
                    />
                </Grid>
            </>
        );
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid container xs={12} spacing={1}>
                    <FormRow style={{marginBottom:"60rem"}} />
                </Grid>
            </Grid>
        </div>
    );
}

export default ImageRow;