import React from 'react'
import { Grid } from '@material-ui/core';
import { Form, Button } from 'components';
import Loader from 'react-loader-spinner';
import { colors } from 'theme';
const ContactForm = ({ buttonType, onChangeHandler, state, formHandler, onCancel }) => {
    return (
        <div style={{ paddingTop: 30, flexGrow: 1 }}>
            <Grid container spacing={10}>
                <Grid item xs={12} sm={12}>
                    {/* <div>
                            <span
                                style={{
                                    textTransform: 'capitalize',
                                    color: '#000',
                                    fontWeight: 'bold'
                                }}>
                                Yamaha Dealer Information
                            </span>
                        
                    </div> */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Form.FormInput
                                className="contact-input"
                                label='Name & Surname'
                                name='fullname'
                                onChange={onChangeHandler}
                                value={state.fullname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Form.FormInput
                                className="contact-input"
                                type='tel'
                                name='phone'
                                label='Phone Number'
                                onChange={onChangeHandler}
                                value={state.phone}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Form.FormInput
                                className="contact-input"
                                type='email'
                                name='email'
                                label='Email'
                                onChange={onChangeHandler}
                                value={state.email}
                            />
                        </Grid>
                    </Grid>
                    <Form.Address
                        value={state.address}
                        addressPick={onChangeHandler}
                    />
                    <Form.FormInput
                        label="Your Comments..."
                        name='comments'
                        onChange={onChangeHandler}
                        value={state.comments}
                        multiline
                    />
                    <Grid style={{ marginTop: 15 }}>
                        {state.loading ?
                            <Loader type="RevolvingDot" color={colors.primary} height={25} width={25} />
                            :
                            <Button
                                type={buttonType}
                                title="Contact Me"
                                onClick={formHandler}
                            />
                        }
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}


export default ContactForm;