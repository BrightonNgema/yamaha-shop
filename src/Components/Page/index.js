import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, withTheme } from '@material-ui/styles';
import { Grid, Container } from '@material-ui/core';
import theme, { primaryTheme } from 'theme';
import NavBar from '../NavBar';
import Footer from '../Footer';
import ActivityLoader from '../ActivityLoader';

class Page extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    footerProps: PropTypes.object,
    navBarProps: PropTypes.object,
    loading: PropTypes.bool,
    fullWidthElements: PropTypes.node,
    carousel: PropTypes.node,
  }

  static defaultProps = {
    footerProps: {},
    navBarProps: {},
    loading: false,
    children: <h1>You need to add content to this page</h1>,
    fullWidthElements: null,
    carousel: null,
  }

  render() {
    const { children, footerProps, navBarProps, loading, fullWidthElements, usePrimaryTheme, carousel } = this.props;
    return (
      <ThemeProvider theme={usePrimaryTheme ? primaryTheme : theme}>
        <ActivityLoader loading={loading}>
          {navBarProps && <NavBar logoColor={"white"} {...navBarProps} />}
          {carousel}
          {fullWidthElements}
          <Container spacing={12} style={{ paddingTop: fullWidthElements ? 0 : 141 }}>
            <Grid container style={{ color: "black" }}>
              {!loading && children}
            </Grid>
          </Container>
          {carousel ? null : <Footer {...footerProps} />}
        </ActivityLoader>
      </ThemeProvider>
    );
  }
}

export default withTheme(Page);