import React from 'react'
import { Grid } from '@material-ui/core';
import { icons } from 'assets';

const Testimonial = ({ testimonial }) => {
    
    return (
        <Grid
            container
            md={11}
            style={{ margin: "auto", paddingTop:20, paddingBottom:20 }}
        >
            <Grid
                item
                sm={11}
                md={2}
                lg={2}
                style={{
                    height: "100%",
                    margin: "auto",
                    marginTop: -5
                }}
            >
                <img
                    alt="author-avatar"
                    src={process.env.REACT_APP_URL + testimonial.image}
                    style={{
                        height: 125,
                        width: 125,
                        borderRadius:63
                    }}
                />
            </Grid>
            <Grid item sm={12} md={9} lg={10}
                style={{ margin: "auto" }} >
                <div className="testimonial-qoutation-mark" >
                    <img
                        alt="qoutation-mark"
                        src={icons.qoutation}
                        style={{
                            height: 40,
                            width: 40
                        }}
                    />
                </div>
                <div className="testimonial-paragraph" >
                    {testimonial.message}
                                        </div>
                <div className="testimonial-author" >
                    {testimonial.fullname}
                                        </div>
            </Grid>
        </Grid>
    )
}

export default Testimonial
