import React from "react";
import {
    FormControlLabel,
    Checkbox as MaterialCheckbox
} from "@material-ui/core";
import { ThemeProvider, withTheme } from "@material-ui/styles";
import theme from "theme";

export function Checkbox({
    onChange,
    checked,
    name,
    label,
    error,
    defaultChecked
}) {
    return (
        <ThemeProvider theme={theme}>
            <FormControlLabel
                style={{ textTransform: "none" }}
                control={
                    <MaterialCheckbox
                        name={name}
                        defaultChecked={defaultChecked}
                        checked={checked}
                        onChange={(k, v) => onChange(name, v)}
                        value="1"
                        color="primary"
                    />
                }
                label={label}
            />
        </ThemeProvider>
    );
}

export default withTheme(Checkbox);
