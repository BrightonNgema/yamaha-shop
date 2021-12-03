import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, GridList, GridListTile } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { isMobile } from "react-device-detect";
import './index.css';
import ContentItem from './ContentItem';

class ContentList extends Component {
  static propTypes = {
    items: PropTypes.array,
    onShare: PropTypes.func,
    onInteract: PropTypes.func,
  };

  static defaultProps = {
    items: [],
    onShare: () => {},
  };

  state = {
    maxItems: 4,
  }

  toggleMaxItems = () => {
    this.setState(prevState => ({ maxItems: prevState.maxItems === 4 ? 100 : 4 }));
  }

  render() {
    const { items, onShare, onInteract } = this.props;
    const { maxItems } = this.state;
    return (
      <Grid container item xs={12}>
        <Grid item xs={12} className="grid-list-container">
          <GridList cols={isMobile ? Math.max(maxItems, items.length) : 4}
            style={{
              // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
              transform: 'translateZ(0)',
            }}
          >
            {items
            .slice(0, isMobile ? Math.max(maxItems, items.length) : maxItems)
            .map(item => (<GridListTile key={`item_${item.id}`}><ContentItem onInteract={onInteract} onShare={onShare} item={item} /></GridListTile>))}
          </GridList>
        </Grid>
        <Grid className="more-btn-container" item xs={12} align="center" style={{ marginTop: 50 }}>
          <Button variant="outlined"
            onClick={this.toggleMaxItems}
          >
            SHOW {maxItems === 4 ? 'MORE' : 'LESS'}
            {maxItems === 4 ? <AddIcon /> : <RemoveIcon />}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default ContentList;
