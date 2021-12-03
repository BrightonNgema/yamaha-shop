import React, { Component } from "react";
import { NavBar, Footer, Button } from "components";
import { colors } from "theme";
import { isIE } from "react-device-detect";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
// import '../../../../Assets/styles/global.css'

class GenericSuccessPage extends Component {
    state = {
        head: "Email Sent",
        body: "",
        externalLogin:false,
    

    }
 resetExternal(){
   
        this.setState({...this.state,externalLogin:true})
    }
    componentDidMount() {
console.log("hey",{'gea': this.props.location.state.head,'sds': this.props.location.state.body})
        // this.props.location.state.id
        this.setState({
            ...this.state,
            head: this.props.location.state.head,
            body: this.props.location.state.body
        })
    }

    navigate(){
        return (<Redirect to="login"/>)
    }
    SimpleCard = () => {
        const useStyles = makeStyles({
            card: {
                minWidth: 275,
            },
            bullet: {
                display: 'inline-block',
                margin: '0 2px',
                transform: 'scale(0.8)',
            },
            title: {
                fontSize: 14,
            },
        });
        const classes = useStyles();

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h4" component="h2" style={{ fontFamily: 'rift', fontWeight: "bold", textAlign: "center" }}>
                        {this.state.head}
                    </Typography>
                    <Typography variant="body1" component="p" style={{ fontFamily: 'ubuntu', marginTop: -20, marginBottom: 20, textAlign: "center" }}>
                        {this.state.body}
                    </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                    <Button
                        type="primary"
                        title="Login"
                        onClick={()=>{
                            this.resetExternal();
                        }}
                    />
                {this.state.externalLogin?this.navigate():<></>}
                </CardActions>
            </Card>
        );
    }

    render() {
        const footerMenu = [
            {
                title: "Home",
                link: "/"
            },
            {
                title: "Warranty",
                link: "/warranty"
            },
            {
                title: "Yamaha Finance",
                link: "/finance"
            },

            {
                title: "Find My Dealer",
                link: "/dealer"
            }
        ];
        return (
            <div style={{ background: colors.light, overflow: "hidden" }}>
                <NavBar
                    topColor={isIE ? "#FFF" : "rgba(255,255,255,96%)"}
                    bottomColor={isIE ? "#FFF" : "rgba(255,255,255,90%)"}
                    search
                    warranty
                    menuColor="black"
                    menuDrawerInfo={footerMenu}
                    logoColor="black"
                />
                <div className="generic-container">
                    <div style={{ padding: "40px 0px", flexGrow: 1 }}>
                        <this.SimpleCard />
                    </div>
                </div>
                <Footer fixed mainFooter />
            </div>
        );
    }
}

export default GenericSuccessPage;