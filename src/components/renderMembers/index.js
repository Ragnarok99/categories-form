import React from "react";
import Enum from "../enum/";
import renderTextField from "../renderTextField/";
import { Field } from "redux-form";
import PropTypes from "prop-types";

const RenderMember = props => {
  let member = "members";
  let { format, data_type, valueEnum, valuesChips, handleDeleteChip } = props;

  switch (data_type) {
    case "STRING":
      if (format === "NONE") {
        //enum
        return (
          <Enum
            valueEnum={valueEnum}
            onChange={value => props.handleInputEnum(value)}
            onClick={props.handleAddChip}
            valuesChips={valuesChips}
            handleDeleteChip={handleDeleteChip}
          />
        );
      } else if (format === "NUMBER") {
        //ranges

        return (
          <div>
            <div className="row">
              <div className="col-sm-6">
                <Field
                  type="number"
                  fullWidth={true}
                  name={`${member}.min_range`}
                  label="Min Range"
                  component={renderTextField}
                />
              </div>
              <div className="col-sm-6">
                <Field
                  type="number"
                  fullWidth={true}
                  label="Max Range"
                  name={`${member}.max_range`}
                  component={renderTextField}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-4">
                <Field
                  fullWidth={true}
                  name={`${member}.unit_measurement`}
                  label="Unit of Measurement"
                  component={renderTextField}
                />
              </div>
              <div className="col-sm-4">
                <Field
                  type="number"
                  fullWidth={true}
                  label="Precision"
                  name={`${member}.precision`}
                  component={renderTextField}
                />
              </div>
              <div className="col-sm-4">
                <Field
                  type="number"
                  fullWidth={true}
                  label="Accuracy"
                  name={`${member}.accuracy`}
                  component={renderTextField}
                />
              </div>
            </div>
          </div>
        );
      }
    default:
      return <div />;
  }
};
RenderMember.propTypes = {
  format: PropTypes.string,
  data_type: PropTypes.string,
  valueEnum: PropTypes.string,
  valuesChips: PropTypes.array,
  handleDeleteChip: PropTypes.func
};
export default RenderMember;
