import React from 'react'
import { Snackbar, SnackbarContent, IconButton, makeStyles} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './index.css'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles1 = makeStyles(theme => ({
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
        fontSize: 20,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));
const Toastr = ({ open,onClose, message, variant,horizontalPosition='center',duration=null }) => {
    const classes = useStyles1();
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: horizontalPosition }}
            className="toaster"
            key='top,center'
            autoHideDuration={duration}
            open={open}
            onClose={onClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}>
                <SnackbarContent
                    style={{ backgroundColor: variant === 'error' ? '#d62c1e' : '#43a047' }}
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            {variant === 'success' && <CheckCircleIcon className={classes.iconVariant} />}
                            {variant === 'error' && <WarningIcon className={classes.iconVariant} />}
                            <span id="message-id">{message}</span>
                        </span>
                    }
                    action={[
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
                            <CloseIcon className={classes.icon} />
                        </IconButton>,
                    ]}
                />
        </Snackbar>
    );
}

export default Toastr;