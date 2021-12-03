import React, { Component } from 'react'
import { TabletView } from 'react-device-detect'
import { HexGrid, Layout, Hexagon } from 'react-hexgrid'
import './HexagonTablet.css'
import HexagonText from '../HexagonText'
import Patterns from '../Patterns'
import { SwipeableDrawer, List, ListItem, Button } from '@material-ui/core'
import Clear from '@material-ui/icons/Clear'
import Right from '@material-ui/icons/KeyboardArrowRight'
import Left from '@material-ui/icons/KeyboardArrowLeft'
import Arrow from '@material-ui/icons/ArrowRightAlt'
import { Link, withRouter } from 'react-router-dom'

class HexagonTablet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            size: this.determineHexagonSize(),
            viewBox: this.determineViewBox(),
            powerProductHover: false,
            powerProductHoverFill: 'power2',
            powerProductTitle: 'POWER PRODUCTS',
            proAudioHover: false,
            proAudioHoverFill: 'proaudio2',
            proAudioTitle: 'PRO AUDIO',
            motorbikeHover: false,
            motorbikeHoverFill: 'motorbike2',
            motorbikeTitle: 'MOTORCYCLES',
            homeAudioHover: false,
            homeAudioHoverFill: 'homeaudio2',
            homeAudioTitle: 'HOME AUDIO',
            musicHover: false,
            musicHoverFill: 'music2',
            musicTitle: 'MUSIC',
            marineHover: false,
            marineHoverFill: 'marine2',
            marineTitle: 'MARINE',
            golfCartsHover: false,
            golfCartsHoverFill: 'golf2',
            golfCartsTitle: 'GOLF CARS',
            worldHover: false,
            worldHoverFill: 'world2',
            worldTitle: 'WORLD OF YAMAHA',
            shopHover: false,
            shopHoverFill: 'shop2',
            shopTitle: 'YAMAHA SHOP',
            toggle: false,
            data: null,
            history: [],
            title: null
        }
        this.displayHover = this.displayHover.bind(this)
        this.removeDisplayHover = this.removeDisplayHover.bind(this)
        this.upDrawerLevel = this.upDrawerLevel.bind(this)
        this.toggleDrawer = this.toggleDrawer.bind(this)
        this.onRedirect = this.onRedirect.bind(this)
        this.downDrawLevel = this.downDrawLevel.bind(this)
    }
    onRedirect(link) {
        if (link.includes('http')) {
            window.open(link, '_blank')
        } else {

            this.props.history.push('finance/types_of_finance')
        }
    }

    upDrawerLevel(levels) {
        let history = this.state.history

        if (this.state.data == null) {
            this.setState((state, props) => ({
                data: levels
            }))
        } else {
            history.push(this.state.data)
            this.setState((state, props) => ({
                history: history,
                data: levels
            }))
        }
    }
    downDrawLevel() {
        this.setState((state, props) => ({
            data: this.state.history.pop()
        }))
    }
    toggleDrawer(open, name) {
        // const newLink = name === "MUSIC" || name === "HOME AUDIO"
        //     ? "https://www.loansdirect.co.za/yamaha"
        //     : "https://financeapps.wesbank.co.za/financeApps/individual/asset/index.xhtml?siteID=yamaha&appType=LSR&appSrc=yamahacoza"
        if (this.props.hover) {
            let drawerData = [
                {
                    title: 'Individual Application',
                    link: "https://financeapps.wesbank.co.za/financeApps/individual/asset/index.xhtml?siteID=yamaha&appType=LSR&appSrc=yamahacoza"
                },
                {
                    title: 'Organisation Application',
                    link: "https://financeapps.wesbank.co.za/financeApps/company/asset/index.xhtml?siteID=yamahacorp&appType=CPY&appSrc=yamahacoza"
                }
            ]
            this.setState({ ...this.state, toggle: open, data: drawerData, title: name })
        }
    }
    renderMenu() {
        if (this.state.data == null) {
            return
        }

        return (
            <div role='presentation'>
                <List style={{ color: 'white' }}>
                    <ListItem style={{ display: 'inline-block' }}>
                        <span style={{ display: 'inline-block' }}>{this.state.title}</span>
                        <Clear
                            style={{ float: 'right', fontSize: 32, color: 'white' }}
                            onClick={e => {

                                this.toggleDrawer(false)
                            }}
                        />
                    </ListItem>
                    <ListItem style={{ display: 'inline-block' }}>
                        {this.state.history.length > 0 ? (
                            <Left
                                onClick={() => {
                                    this.downDrawLevel()
                                }}
                                style={{
                                    float: 'left',
                                    fontSize: 32,
                                    color: 'white',
                                    backgroundColor: '#D52B1E'
                                }}
                            />
                        ) : (
                                <></>
                            )}
                        {/* TODO */}
                        {/* <Clear
                            style={{ float: 'right', fontSize: 32, color: 'white' }}
                            onClick={e => {
                                
                                this.toggleDrawer(false)
                            }}
                        /> */}
                    </ListItem>
                    {this.state.data
                        ? this.state.data.map((title, index) => (
                            <ListItem key={index}>
                                <Button
                                    style={{ float: 'left', textAlign: 'left' }}
                                    className='btn-outline'
                                    onClick={e => {
                                        title.tier
                                            ? this.upDrawerLevel(title.tier)
                                            : this.onRedirect(title.link)
                                    }}>
                                    <span className='drawer-btn'>{title.title}</span>
                                    <Right
                                        style={{
                                            float: 'right',
                                            textAlign: 'right',
                                            color: 'white'
                                        }}
                                    />
                                </Button>
                            </ListItem>
                        ))
                        : this.toggleDrawer(false)}
                </List>
                <List>
                    <ListItem className='additional-items'>
                        <Link to='/finance/types_of_finance'>
                            <span className='drawer-btn'>Types of Finance</span>
                            <Arrow style={{ color: 'white', fontSize: 15 }} />
                        </Link>
                    </ListItem>
                </List>
            </div>
        )
    }

    componentWillMount() {
        this.determineHexagonSize()
    }

    componentDidMount() {
        this.upDrawerLevel(this.props.menuInfo)
    }

    determineViewBox() {
        return '30 -135 200 500'
    }

    determineHexagonSize() {
        return { x: 28, y: 28 }
    }

    displayHover(e, fill) {
        let hover = e + 'Hover'
        let fillValue = e + 'HoverFill'
        let title = e + 'Title'
        let x = fill + '1'
        if (this.props.hover) {
            this.setState({ [hover]: true, [fillValue]: x });
        } else if (e === "shop") {
            this.setState({ [title]: "Coming Soon" });
        } else {
            return null;
        }
    }

    removeDisplayHover(e, fill, text) {
        let hover = e + 'Hover'
        let fillValue = e + 'HoverFill'
        // let titles = e + 'Title'
        let x = fill + '2'
        if (this.props.hover) {
            this.setState({ [hover]: false, [fillValue]: x })
        }
    }

    navigate = (navlink) => {
        if (!this.props.hover) {
            if (this.props.warranty) {
                return this.props.history.push({
                    pathname: `/warranty/${navlink}`,
                });
            } else if (this.props.home) {
                return this.props.history.push({
                    pathname: `/category/${navlink}`,

                });
            }
        }
    };

    render() {
        return (
            <TabletView>
                <HexGrid viewBox={this.determineViewBox()}>
                    {/* Main grid with bit hexagons, all manual */}
                    <Layout
                        size={this.determineHexagonSize()}
                        flat={true}
                        spacing={1}
                        origin={{ x: 0, y: 0 }}>
                        {/* {First Column from the right} */}
                        <Hexagon s={0} q={5.1} r={-3.3} fill='red' />
                        <Hexagon s={0} q={5.1} r={-2.3} fill='red' />
                        <Hexagon s={0} q={5.1} r={-1.2998} fill='red' />
                        <Hexagon s={0} q={5.1} r={-0.3} fill='red' />

                        {/* {Second Column from the right */}
                        {this.props.hover ?
                            <Hexagon s={0} fill='red'
                                q={4.1}
                                r={-2.3} />
                            : <Hexagon
                                name='powerProductHover'
                                s={0}
                                className='hexagon-standard-style power-product'
                                onClick={e =>
                                    this.props.home ? this.navigate("power_products", 7) : null
                                }
                                onMouseEnter={() => this.displayHover('powerProduct', 'power')}
                                onMouseLeave={() =>
                                    this.removeDisplayHover('powerProduct', 'power', 'POWER PRODUCTS')
                                }
                                fill='power2'
                                q={4.1}
                                r={-2.3}>
                                <HexagonText title={this.state.powerProductTitle} mobile />
                            </Hexagon>}

                        <Hexagon
                            s={0}
                            className='hexagon-standard-style pro-audio'
                            onClick={e =>
                                this.props.home ? this.navigate("pro_audio", 5) :
                                    this.toggleDrawer(true, 'PRO AUDIO')
                            }
                            onMouseEnter={() => this.displayHover('proAudio', 'proaudio')}
                            onMouseLeave={() =>
                                this.removeDisplayHover('proAudio', 'proaudio', 'PRO AUDIO')
                            }
                            fill='proaudio2'
                            q={4.1}
                            r={-1.3}>
                            <HexagonText title={this.state.proAudioTitle} />
                        </Hexagon>
                        {/* {!this.props.home ? (
                            <Hexagon s={0} q={4.1} r={-0.3} fill='red' />
                        ) : ( */}
                        {/* <Hexagon
                                    className='hexagon-standard-style shop'
                                    onClick={e =>
                                        this.props.home ? null :
                                            this.toggleDrawer(true, 'YAMAHA SHOP')
                                    }
                                    fill='shop2'
                                    onMouseEnter={() => this.displayHover('shop', 'shop')}
                                    onMouseLeave={() =>
                                        this.removeDisplayHover('shop', 'shop', 'YAMAHA SHOP')
                                    }
                                    s={0}
                                    q={4.1}
                                    r={-0.3}>
                                    <HexagonText title={this.state.shopTitle} mobile />
                                </Hexagon>
                            )} */}
                        {/* {Third Column from the right} */}
                        <Hexagon
                            className='hexagon-standard-style motorbike'
                            onClick={e => {
                                this.props.home ? this.navigate("motorcycles", 1) :
                                    this.toggleDrawer(true, 'MOTORCYCLES')
                            }}
                            s={0}
                            onMouseEnter={() => this.displayHover('motorbike', 'motorbike')}
                            onMouseLeave={() =>
                                this.removeDisplayHover('motorbike', 'motorbike', 'MOTORCYCLES')
                            }
                            q={3.1}
                            r={-2.3}
                            fill='motorbike2'>
                            <HexagonText title={this.state.motorbikeTitle} mobile />
                        </Hexagon>
                        <Hexagon
                            className='hexagon-standard-style golfcarts'
                            onClick={e => {
                                this.props.home ? this.navigate("golf_cars", 2) :
                                    this.toggleDrawer(true, 'GOLF CARS')
                            }}
                            fill='golf2'
                            onMouseEnter={() => this.displayHover('golfCarts', 'golf')}
                            onMouseLeave={() =>
                                this.removeDisplayHover('golfCarts', 'golf', 'GOLF CARS')
                            }
                            q={3.1}
                            r={-1.3}
                            s={0}>
                            <HexagonText title={this.state.golfCartsTitle} mobile />
                        </Hexagon>
                        <Hexagon
                            className='hexagon-standard-style homeaudio'
                            onClick={e => {
                                this.props.home ? this.navigate("home_audio", 4) :
                                    this.toggleDrawer(true, 'HOME AUDIO')
                            }}
                            fill='homeaudio2'
                            onMouseEnter={() => this.displayHover('homeAudio', 'homeaudio')}
                            onMouseLeave={() =>
                                this.removeDisplayHover('homeAudio', 'homeaudio', 'HOME AUDIO')
                            }
                            q={3.1}
                            r={-0.3}
                            s={1}>
                            <HexagonText title={this.state.homeAudioTitle} mobile />
                        </Hexagon>
                        <Hexagon s={0} q={3.1} r={0.7} fill='red' />

                        {/* {Forth Column from the right} */}
                        <Hexagon
                            s={0}
                            q={2.1}
                            onMouseEnter={() => this.displayHover('music', 'music')}
                            onMouseLeave={() =>
                                this.removeDisplayHover('music', 'music', 'Music')
                            }
                            r={-1.3}
                            className='hexagon-standard-style music'
                            onClick={e => {
                                this.props.home ? this.navigate("music", 6) :
                                    this.toggleDrawer(true, 'MUSIC')
                            }}
                            fill='music2'>
                            <HexagonText title={this.state.musicTitle} mobile />
                        </Hexagon>
                        <Hexagon
                            s={0}
                            q={2.1}
                            r={-0.3}
                            onMouseEnter={() => this.displayHover('marine', 'marine')}
                            onMouseLeave={() =>
                                this.removeDisplayHover(
                                    'marine',

                                    'marine',
                                    'MARINE'
                                )
                            }
                            id='test'
                            fill='marine2'
                            className='hexagon-standard-style marine'
                            onClick={e => {
                                this.props.home ? this.navigate("marine", 3) :
                                    this.toggleDrawer(true, 'MARINE')
                            }}>
                            <HexagonText title={this.state.marineTitle} mobile />
                        </Hexagon>
                        {!this.props.home ? (
                            <Hexagon s={0} q={2.1} r={0.7} fill='red' />
                        ) : (
                                <Hexagon
                                    s={0}
                                    q={2.1}
                                    onMouseEnter={() => this.displayHover('world', 'world')}
                                    onMouseLeave={() =>
                                        this.removeDisplayHover('world', 'world', 'WORLD OF YAMAHA')
                                    }
                                    r={0.7}
                                    fill='world2'
                                    className='hexagon-standard-style world'
                                    onClick={e => this.props.history.push("world_of_yamaha")}>
                                    <HexagonText title={this.state.worldTitle} mobile />
                                </Hexagon>
                            )}
                        {/* {Last Column from the right} */}
                        <Hexagon s={0} q={1.1} r={-1.3} fill='red' />
                        <Hexagon s={0} q={1.1} r={-0.3} fill='red' />
                        <Hexagon s={0} q={1.1} r={0.7} fill='red' />
                        <Hexagon s={0} q={1.1} r={1.7} fill='red' />
                    </Layout>
                    <Patterns size={this.state.size} />
                </HexGrid>
                <SwipeableDrawer
                    anchor='right'
                    open={this.state.toggle}
                    onOpen={e => {
                        this.toggleDrawer(true)
                    }}
                    onClose={e => this.toggleDrawer(false)}
                    className='drawerColor drawer-hexagon'>
                    {this.renderMenu()}
                </SwipeableDrawer>
            </TabletView>
        )
    }
}

export default withRouter(HexagonTablet)
