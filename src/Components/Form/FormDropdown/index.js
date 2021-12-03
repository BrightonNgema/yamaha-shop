import React from 'react';
// import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, withTheme } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import './index.css'
import theme from 'theme';

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

function FormDropdown({
    label,
    placeholder,
    value,
    options,
    name,
    helperText,
    onChange,
    disabled,
    dark,
    adornment
}) {

    // const classes =
    // disabled ? disabledInputStyle()
    //     : dark ? darkInputStyle()
    //         : defaultInputStyle();

    return (
        <ThemeProvider theme={theme}>
            <div className="input-container" style={{ height: '3.7em' }}>
                <Select
                    autoWidth
                    displayEmpty
                    startAdornment={adornment}
                    value={value || ''}
                    onChange={(event) => {
                        onChange(name, event.target.value);
                    }}
                    input={<OutlinedInput
                        variant="outlined"
                        style={{
                            display: 'flex',
                            color: value ? '#000' : '#e2e2e1',
                            textTransform: 'none',
                            fontFamily: "Ubuntu !important",
                        }}
                        // label={!placeholder ? label : null}
                        value={value || ''}
                        name={name} />}
                >
                    {<MenuItem key={`mi_placeholder`} disabled value="">{label || placeholder}</MenuItem>}
                    {options.map(option => {
                        let itemOption = {};
                        if (typeof option === 'string') {
                            itemOption = {
                                value: option,
                                text: option,
                            };
                        } else {
                            itemOption = option;
                        }
                        return <MenuItem
                            style={{
                                textTransform: 'none',
                                fontFamily: "Ubuntu !important",
                            }}
                            key={`mi_${itemOption.value}`}
                            value={itemOption.value}
                        >
                            {itemOption.text}
                        </MenuItem>;
                    })}
                </Select>
                {helperText && helperText.length > 0 && <FormHelperText error>{helperText}</FormHelperText>}
            </div>
        </ThemeProvider>
    );
}

export default withTheme(FormDropdown);