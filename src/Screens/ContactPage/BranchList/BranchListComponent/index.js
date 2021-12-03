import React from "react";
import { Grid } from "@material-ui/core";
import { Button } from "components";

const dealerHandler = email => {
    const mail = "mailto:" + email + ",web@yamaha.co.za";
    window.location.assign(mail);
};

const BranchListComponent = ({
    name,
    address,
    category,
    telephone,
    email,
    last
}) => {
    return (
        <Grid item xs={12} sm={3}>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={12} className="mobile-align-start">
                    <div>
                        <h4 className="branch name">{name}</h4>
                        <p className="branch address">{address}</p>
                        <p className="branch telephone">Tel: {telephone}</p>
                        <p style={{ marginTop: 10 }} className="branch address">
                            {category}
                        </p>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={6}
                    sm={12}
                    style={{ color: "#fff" }}
                    className="mobile-align-end"
                >
                    <div>
                        <Button
                            type="primary"
                            title="E-mail DEALER"
                            onClick={() => dealerHandler(email)}
                        />
                    </div>
                </Grid>
                {!last && (
                    <hr style={{ color: "#fff" }} className="line-break" />
                )}
            </Grid>
        </Grid>
    );
};

export default BranchListComponent;
