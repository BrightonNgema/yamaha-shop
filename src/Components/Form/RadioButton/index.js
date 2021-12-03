import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const YamahaRadioButton = withStyles({
    root: {
        "&$checked": {
            color: "#D52B1E",
            borderColor: "rgba(0, 0, 0, 0.54)"
        }
    },
    checked: {}
})(props => <Radio color="default" {...props} />);

export default function RadioButtonsGroup({
    label,
    selectedValue,
    handleChange
}) {
    return (
        <FormControlLabel
            label={label}
            control={
                <YamahaRadioButton
                    checked={selectedValue === label}
                    onChange={() => handleChange(label)}
                />
            }
        />
    );
}
