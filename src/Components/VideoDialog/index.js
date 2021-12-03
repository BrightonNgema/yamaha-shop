import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import './index.css';

export class VideoDialog extends Component {

  static propTypes = {
    close: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  render() {
    const { close, visible, url } = this.props;
    return (
      <Dialog
        onClose={close}
        aria-labelledby="video-dialog"
        open={visible}
        style={{ width: '80vw', height: '60vh', left: '10vw', top: '20vh' }}
      >
        <iframe
          title={url}
          key="video-frame"
          style={{ height: '100%', width: '100%' }}
          src={url.replace('/watch?v=', '/embed/')}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Dialog>
    )
  }
}

export default VideoDialog
