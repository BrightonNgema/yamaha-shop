import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography} from '@material-ui/core';
import Lightbox from "react-image-lightbox";
import { ShareDialog, VideoDialog } from 'components';
import ContentList from '../ContentList';
import { isMobile } from 'react-device-detect';
import './index.css';
import CategoryPicker from '../CategoryPicker';

export default class ContentCategory extends Component {
  static propTypes = {
    type: PropTypes.string,
    category: PropTypes.object,
    items: PropTypes.array,
  };

  state = {
    shareUrl: '',
    shareDialogVisible: false,
    lightboxIndex: 0,
    lightboxIsOpen: false,
    activeGallery: null,
    selectedCategories: [],
    videoDialogVisible: false,
    videoUrl: '',
  };

  onShare = (url) => {
    this.setState({ shareUrl: url, shareDialogVisible: true });
  };

  closeShareDialog = () => {
    this.setState({ shareUrl: '', shareDialogVisible: false });
  };

  openVideoDialog = (url) => {
    this.setState({ videoUrl: url, videoDialogVisible: true });
  }

  closeVideoDialog = (url) => {
    this.setState({ videoUrl: '', videoDialogVisible: false });
  }

  renderLightBox = () => {
    const { type } = this.props;
    const { lightboxIndex, lightboxIsOpen, activeGallery } = this.state;
    if (type !== 'gallery') return null;
    if (!lightboxIsOpen) return null;
    return (<Lightbox
      mainSrc={activeGallery.images[lightboxIndex]}
      nextSrc={activeGallery.images[(lightboxIndex + 1) % activeGallery.images.length]}
      prevSrc={activeGallery.images[(lightboxIndex + activeGallery.images.length - 1) % activeGallery.images.length]}
      onCloseRequest={() => this.setState({ lightboxIsOpen: false, activeGallery: null })}
      onMovePrevRequest={() =>
        this.setState({
          lightboxIndex: (lightboxIndex + activeGallery.images.length - 1) % activeGallery.images.length,
        })
      }
      onMoveNextRequest={() =>
        this.setState({
          lightboxIndex: (lightboxIndex + 1) % activeGallery.images.length,
        })
      }
    />);
  }

  onInteract = (item) => {
    const { type } = this.props;
    switch(type) {
      case 'gallery':
          return this.setState({ activeGallery: item, lightboxIsOpen: true, lightboxIndex: 0 });
      case 'videos':
          return isMobile ? window.location.replace(item.video) : this.openVideoDialog(item.video);
      default:
        return null;
    }
  }

  getFilteredItems = () => {
    const { items } = this.props;
    const { selectedCategories } = this.state;
    if (selectedCategories.length  === 0) return items;

    return items.filter(item => selectedCategories.indexOf(item.category) !== -1);
  }

  render() {
    const { type, category, items } = this.props;
    const { shareUrl, shareDialogVisible, videoUrl, videoDialogVisible } = this.state;
    const filteredItems = this.getFilteredItems();
    const categories = [...new Set(items.map(i => i.category))].map(name => ({ name } ));
    return (
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <Typography align="center" variant="h2">{type || category.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" variant="subtitle1">{category ? category.description : 'SELECT A CATEGORY BELOW'}</Typography>
        </Grid>
        {!category && <Grid item xs={12} align="center" style={{ display: 'flex', overflowY: 'auto' }}>
          <CategoryPicker
            onChange={(selectedCategories) => {
              this.setState({ selectedCategories })
            }}
            items={items}
            categories={categories}
          />
        </Grid>}
        <ContentList onInteract={type ? this.onInteract: null} onShare={this.onShare} items={filteredItems} />
        {/* <Grid item xs={12} align="center">
          <Divider variant="middle" />
        </Grid> */}
        <ShareDialog url={shareUrl} visible={shareDialogVisible} close={this.closeShareDialog} />
        <VideoDialog url={videoUrl} visible={videoDialogVisible} close={this.closeVideoDialog} />
        {this.renderLightBox()}
      </Grid>
    )
  };
}
