import React from 'react'
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const Cookies = () => {
    const [cookieTag, setCookies] = React.useState(-3000)

    React.useEffect(() => {
        const cookies = sessionStorage.getItem('cookies');
        window.setTimeout(() => {
            if (cookies) {
                return setCookies(-3000)
            }
            return setCookies(0)
        }, 3000);
    }, [])
    const closeCookies = () => {
        sessionStorage.setItem('cookies', true);
        setCookies(-3000)
    }
    return (
        <div style={{ width: '100%', height: '100vh', position: 'fixed', top: cookieTag, zIndex: 9999, transition: '1s', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: 800, maxWidth: '100%', backgroundColor: 'red', zIndex: 4, margin: 'auto' }}>
                <Grid container style={{ width: 600, maxWidth: '90%', margin: 'auto' }}>
                    <div className="row" style={{ position: 'relative', paddingTop: isMobile ? 10 : 20, paddingBottom: isMobile ? 10 : 20 }}>
                        <Grid item md={11} sm={10}>
                            <div style={{ color: '#ffff' }}>
                                We are using cookies to give you the best experience on our site. To find out more see our
                            <Link to="/legal" style={{ color: '#fff', textDecoration: 'none', marginLeft: 2 }}><u>Cookies Policy</u></Link>. By continuing to use our website without
                            changing the settings, you are agreeing to our use of cookies.
                        </div>
                        </Grid>
                        <Grid item md={1} sm={2}
                            onClick={closeCookies}
                            style={{ height: 30, width: 30, display: 'flex', flexDirection: 'column', position: 'absolute', right: isMobile ? -10 : -50, top: isMobile ? 0 : 30, cursor: 'pointer' }} >
                            <i className="fa fa-times-circle" aria-hidden="true" style={{ margin: 'auto', fontSize: 20, color: '#211B50' }} />
                        </Grid>
                    </div>
                </Grid>
            </div>
        </div>
    )
}

export default Cookies