import React from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import Chip from "material-ui/Chip";
import { TextField } from "redux-form-material-ui";
import styles from "./styles.css";

const Enum = ({
  onChange,
  valuesChips,
  onClick,
  valueEnum,
  handleDeleteChip
}) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-8 col-md-10">
          <TextField
            fullWidth={true}
            id="enumField"
            value={valueEnum || ""}
            onChange={ev => onChange(ev.target.value)}
            hintText={`Some value.`}
            floatingLabelText={"Enumerations"}
          />
        </div>
        <div className="col-sm-4 col-md-2">
          <RaisedButton
            label="Add"
            onClick={onClick}
            className={styles.btn_add_attribute}
            primary={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {valuesChips &&
            valuesChips.map(chip => (
              <Chip
                className={styles.chip}
                key={chip.id}
                onRequestDelete={() => handleDeleteChip(chip.id)}
              >
                {chip.value}
              </Chip>
            ))}
        </div>
      </div>
    </div>
  );
};

Enum.PropTypes = {
  onChange: PropTypes.func,
  valuesChips: PropTypes.array,
  onClick: PropTypes.func,
  valueEnum: PropTypes.string,
  handleDeleteChip: PropTypes.func
};

export default Enum;
