import React from 'react'
import MomentUtils from '@date-io/moment';
import moment from 'moment';
// import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, withTheme } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import './index.css'
import theme from 'theme';

const DATE_FORMAT = process.env.DATE_FORMAT || 'YYYY-MM-DD';

// const defaultInputStyle = makeStyles(theme => ({
//     root: {
//         border: "2px solid #e2e2e1",
//         overflow: "hidden",
//         borderRadius: 4,
//         backgroundColor: "#fff",
//         fontFamily: "Ubuntu !important",
//         marginLeft:-2,
//         transition: theme.transitions.create(["border-color", "box-shadow"]),
//         "&$focused": {
//             backgroundColor: "#fff",
//         },
//         "&:hover": {
//             background: "none"
//         },
//     },
//     'input': {
//         '&::placeholder': {
//             textOverflow: 'ellipsis !important',
//             color: '#000'
//         }
//     }
// }));
// const darkInputStyle = makeStyles(theme => ({
//     root: {
//         border: "2px solid #B1B1B1",
//         overflow: "hidden",
//         borderRadius: 4,
//         backgroundColor: "#1E1E1E",
//         fontFamily: "Ubuntu !important",
//         marginLeft: -2,
//         color:'#fff',
//         transition: theme.transitions.create(["border-color", "box-shadow"]),
//         "&$focused": {
//             backgroundColor: "#1E1E1E",
//         },
//         "&:hover": {
//             backgroundColor: "#1E1E1E",
//         },
//         "&:visited": {
//             backgroundColor: "#1E1E1E",
//         },
//         "&:active": {
//             backgroundColor: "#1E1E1E",
//         },
//     },
//     'input': {
//         '&::placeholder': {
//             textOverflow: 'ellipsis !important',
//             color: '#616365'
//         },
//         "&$focused": {
//             backgroundColor: "#1E1E1E",
//         },
//         "&:hover": {
//             backgroundColor: "#1E1E1E",
//         },
//     }
// }));
// const disabledInputStyle = makeStyles(theme => ({
//     root: {
//         border: "2px solid #e2e2e1",
//         overflow: "hidden",
//         borderRadius: 4,
//         backgroundColor: "rgba(0, 0, 0, 0.12)",
//         transition: theme.transitions.create(["border-color", "box-shadow"]),
//         "&:hover": {
//             backgroundColor: "rgba(0, 0, 0, 0.12)"
//         }
//     },
//     focused: {}
// }));

function FormCalendar({ value, onChange, name, id, disabled, dark }) {
    // const classes =
    //     disabled ? disabledInputStyle()
    //     :   dark ? darkInputStyle()
    //         : defaultInputStyle()
    
    return (
        <ThemeProvider theme={theme}>
            <div className="input-container" style={{ display: 'flex' }}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    disableFuture
                    // InputProps={{ classes, disableUnderline: true }}
                    inputVariant="outlined"
                    color="disabled"
                    margin="normal"
                    name={name}
                    id={id}
                    label="Date of purchase"
                    openTo="month"
                    views={["year", "month", "date"]}
                    format={DATE_FORMAT}
                    value={value ? moment().format(value): moment().format()}
                    KeyboardButtonProps={{
                    'aria-label': `change date of ${name}`,
                    }}
                    onChange={(mDate, sDate) => {
                        if (mDate) {
                            onChange(name, mDate.format(DATE_FORMAT));
                        } else {
                            onChange(name, '');
                        }
                    }}
                />
            </MuiPickersUtilsProvider>
            </div>
        </ThemeProvider>
    );
}

export default withTheme(FormCalendar);