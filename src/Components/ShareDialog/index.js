import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { ThemeProvider } from '@material-ui/styles';
import { FileCopy } from '@material-ui/icons';
import { isMobile } from "react-device-detect";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';
import theme from 'theme';
import './index.css';

function ShareButton({ type, url }) {
  switch(type) {
    case 'FACEBOOK':
      return <FacebookShareButton
        url={url}
      >
        <FacebookIcon size={57} round />
      </FacebookShareButton>;
    case 'TWITTER':
      return <TwitterShareButton
        url={url}
      >
        <TwitterIcon size={57} round />
      </TwitterShareButton>;
    case 'WHATSAPP':
      return <WhatsappShareButton
        url={url}
      >
        <WhatsappIcon size={57} round />
      </WhatsappShareButton>;
    case 'EMAIL':
    default:
      return <EmailShareButton
        body={url}
        openWindow
      >
        <EmailIcon size={57} round />
      </EmailShareButton>;
  }
}

export default class ShareDialog extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
  };

  copyText = () => {
    this.copyInput.select();
    document.execCommand('copy');
  }

  render() {
  const { visible, close, url } = this.props; 
    return (
      <ThemeProvider theme={theme}>
        <Dialog
          fullScreen={isMobile}
          maxWidth="xs"
          fullWidth
          open={visible}
          onClose={close}
          aria-labelledby="Share"
        >
          <DialogTitle id="responsive-dialog-title">Share</DialogTitle>
          <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
            <DialogContentText style={{ display: 'flex' }}>
              <input ref={(ref) => this.copyInput = ref} style={{ flex: 1, padding: 5 }} value={url} readOnly />
              <IconButton key="close" aria-label="Close" color="inherit" onClick={this.copyText}>
                  <FileCopy size="large" />
              </IconButton>
            </DialogContentText>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-around' }}>
              <ShareButton url={url} type="FACEBOOK" />
              <ShareButton url={url} type="TWITTER" />
              <ShareButton url={url} type="WHATSAPP" />
              <ShareButton url={url} type="EMAIL" />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={close} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  }
}
