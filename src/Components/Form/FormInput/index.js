import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import "./index.css";

const defaultInputStyle = makeStyles(theme => ({
    root: {
        border: "2px solid #e2e2e1",
        overflow: "hidden",
        borderRadius: 4,
        backgroundColor: "#fff",
        fontFamily: "Ubuntu !important",
        marginLeft:-2,
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        "&$focused": {
            backgroundColor: "#fff",
        },
        "&:hover": {
            background: "none"
        },
    },
    'input': {
        '&::placeholder': {
            textOverflow: 'ellipsis !important',
            color: '#000'
        }
    }
}));
const darkInputStyle = makeStyles(theme => ({
    root: {
        border: "2px solid #B1B1B1",
        overflow: "hidden",
        borderRadius: 4,
        backgroundColor: "#1E1E1E",
        fontFamily: "Ubuntu !important",
        marginLeft: -2,
        color:'#fff',
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        "&$focused": {
            backgroundColor: "#1E1E1E",
        },
        "&:hover": {
            backgroundColor: "#1E1E1E",
        },
        "&:visited": {
            backgroundColor: "#1E1E1E",
        },
        "&:active": {
            backgroundColor: "#1E1E1E",
        },
    },
    'input': {
        '&::placeholder': {
            textOverflow: 'ellipsis !important',
            color: '#616365'
        },
        "&$focused": {
            backgroundColor: "#1E1E1E",
        },
        "&:hover": {
            backgroundColor: "#1E1E1E",
        },
    }
}));

const disabledInputStyle = makeStyles(theme => ({
    root: {
        border: "2px solid #e2e2e1",
        overflow: "hidden",
        borderRadius: 4,
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.12)"
        }
    },
    focused: {}
}));

function Input(props) {
    const classes =
        props.disabled ? disabledInputStyle()
            : props.dark ? darkInputStyle()
                : defaultInputStyle()
    return (
        <TextField
            InputProps={{ classes, disableUnderline: true }}
            {...props}
        />
    );
}

export default function FormInput({
    className,
    defaultValue,
    disabled,
    error,
    label,
    style,
    type,
    name,
    onChange,
    value,
    multiline,
    placeholder,
    dark,
    helperText
}) {
    return (
        <div className="input-container">
            <Input
                className={`input ${className}`}
                placeholder={placeholder}
                label={!placeholder ? label : null}
                fullWidth
                defaultValue={defaultValue}
                variant="filled"
                autoComplete=""
                error={true}
                disabled={disabled}
                type={type}
                dark={dark}
                name={name}
                onChange={e => onChange(name, e.target.value)}
                value={value}
                multiline={multiline}
                rowsMax={multiline ? 6 : null}
                rows={multiline ? 4 : null}
                helperText={helperText}
            />
        </div>
    );
}

Input.propTypes = {
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    style: PropTypes.object,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    label:PropTypes.string,
    placeholder: PropTypes.string,
    multiline: PropTypes.bool,
    dark: PropTypes.string,
    helperText: PropTypes.string,
};

Input.defaultProps = {
    defaultValue: undefined,
    multiline:false,
    disabled: false,
    error: false,
    style: {},
    type: "text",
    label:"",
    placeholder: "",
    dark: undefined,
    helperText: "",
    value: '',
};
