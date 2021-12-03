import React from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "..";
import './confirm.css'



function ConfirmationModal({ address, isOpen, isClosed, handleClose, handleDelete }) {

    return (
        <Dialog
            open={isOpen}
            onClose={isClosed}
            className="dialog-box"
            aria-labelledby="draggable-dialog-title"
            disableBackdropClick={true}
        >
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    style={{ position: "absolute", right: 0, top: 0 }}
                    onClick={isClosed}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent style={{ marginTop: 20 }}>
                <div>
                    <h4 className="confirm-heading login-title">
                        Are you sure you want to delete your {address} address?
                    </h4>
                </div>
            </DialogContent>
            <DialogActions className="confirm-button2">
                <Button
                    title="Cancel"
                    type="secondary yamaha-btn-lg"
                    onClick={handleClose}
                />
                <Button
                    title="Delete"
                    type="primary yamaha-btn-lg"
                    onClick={handleDelete}
                />
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationModal;
