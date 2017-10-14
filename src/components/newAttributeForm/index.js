import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Snackbar from "material-ui/Snackbar";
import Chip from "material-ui/Chip";
import RaisedButton from "material-ui/RaisedButton";
import styles from "./styles.css";
import _ from "lodash";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import uuid from 'uuid';
import {
  Values
} from 'redux-form-website-template'

import Add from 'material-ui/svg-icons/content/add-circle';
import renderTextField from '../renderTextField/';
import { saveAttribute } from "../../actions";
import RenderMember from '../../components/renderMembers/';
 
class NewAttributeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_type: "STRING",
      format: "NONE",
      valueEnum: null,
      valuesChips: [],
      open: false
    };

    this.handleAddChip = this.handleAddChip.bind(this);
    this.handleInputEnum = this.handleInputEnum.bind(this);
    this.handleDeleteChip = this.handleDeleteChip.bind(this);
  }

  renderSelectField(field) {
    return (
      <SelectField
        floatingLabelText={field.label}
        floatingLabelFixed={true}
        {...field}
        value={field.input.value}
        onChange={(eve, index, val) => {
          let { name } = field.input;
          if (
            (name === "format" && val === "NONE") ||
            (name === "data_type" && val === "OBJECT")) {
            this.props.change("members", null); //clean up data
          }
          this.setState({
            [name]: val //tracking the values selected
          });
          field.input.onChange(val);
        }}
      />
    );
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, invalid } = this.props;
    let { data_type } = this.state;
    return (
      <div className="container">
      <Values form="AttributeForm" />

        {/* message for missing value in enum field */}
        <Snackbar
          open={this.state.open}
          message="You can´t add empty values in Enumerations field, please provide one :)"
          autoHideDuration={4000}
          onRequestClose={() => {
            this.setState({ open: false });
          }}
        />
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="row">
            <div className="col-sm-4">
              <Field
                name="name"
                label="Name"
                component={renderTextField}
              />
            </div>
            <div className="col-sm-4">
              <Field
                name="description"
                label="Descrption"
                component={renderTextField}
              />
            </div>
            <div className="col-sm-4">
              <Field
                disabled={true}
                name="device_resource_type"
                component={this.renderSelectField.bind(this)}
                label="Device Resourse Type"
              >
                <MenuItem
                  primaryText={"Default value"}
                  value={"Default value"}
                />
                <MenuItem primaryText={"value one"} value={2} />
                <MenuItem primaryText={"value two"} value={3} />
              </Field>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <Field
                disabled={data_type === "OBJECT"}
                name="default_value"
                label="Default Value"
                component={renderTextField}
              />
            </div>
            <div className="col-sm-4">
              <Field
                name="data_type"
                component={this.renderSelectField.bind(this)}
                label="Data Type"
              >
                <MenuItem primaryText={"STRING"} value={"STRING"} />
                <MenuItem primaryText={"OBJECT"} value={"OBJECT"} />
              </Field>
            </div>
            <div className="col-sm-4">
              <Field
                disabled={data_type === "OBJECT"}
                name="format"
                component={this.renderSelectField.bind(this)}
                label="Format"
              >
                <MenuItem primaryText={"NONE"} value={"NONE"} />
                <MenuItem primaryText={"NUMBER"} value={"NUMBER"} />
                <MenuItem primaryText={"BOOLEAN"} value={"BOOLEAN"} />
                <MenuItem primaryText={"DATE-TIME"} value={"DATE-TIME"} />
                <MenuItem primaryText={"CDATA"} value={"CDATA"} />
                <MenuItem primaryText={"URI"} value={"URI"} />
              </Field>
            </div>
          </div>

          {/* fields options */}

          <RenderMember 
            {...this.state} 
            handleAddChip={this.handleAddChip} 
            handleInputEnum={this.handleInputEnum}
            handleDeleteChip={this.handleDeleteChip}
          />

          {/* ends fields */}

          <div className="row">
            <div className={`col-md-12 ${styles.rowButtonAddAttribute}`}>
              <RaisedButton
                className={styles.btnAddAttribute}
                disabled={submitting || invalid}
                icon={<Add />}
                primary={true}
                label="Add attribute"
                type="submit"
                fullWidth={true} 
              />
            </div>
          </div>

          {/* <RaisedButton onClick={reset} label="reset" type="button" /> */}
        </form>
      </div>
    );
  }

  handleInputEnum(value){
    this.setState({
      valueEnum: value
    })
  }

  handleDeleteChip(idChip){
    this.setState({
      valuesChips: this.state.valuesChips.filter(chip => chip.id !== idChip)
    })
  }

  handleAddChip() {
    let { valueEnum } = this.state;
    console.log(valueEnum);
    if (valueEnum && valueEnum.trim() !== "") {
      this.setState({
        valuesChips: this.state.valuesChips.concat({id:uuid.v4(),value:valueEnum}),
        valueEnum: ""
      });
    } else {
      this.setState({
        open: true
      });
    }
    let element = document.querySelector("#enumField");
    element.focus();
  }

  onSubmit(values) {
    values["category"] = this.props.currentCategory;
    console.log(values);
    this.props.saveAttribute(values);
    this.props.reset();
  }
}

function validate(values, props) {
  let { attributes } = props;

  const errors = { members: {} };
  if (!values.name) {
    errors.name = "Enter a name";
  }
  if (attributes.find(el => el.name === values.name)) {
    errors.name = `Another attribute already owns the name ${values.name}, please provide a different one.`;
  }
  if (values.members) {
    if (
      parseFloat(values.members.max_range) <
      parseFloat(values.members.min_range)
    ) {
      errors.members["max_range"] = "Max range must be greater than min range";
    }

    if (
      parseFloat(values.members.min_range) >
      parseFloat(values.members.max_range)
    ) {
      errors.members["min_range"] = "Min range must be lower than max range";
    }
    if (
      !_.inRange(
        parseFloat(values.members.precision),
        parseFloat(values.members.min_range),
        parseFloat(values.members.max_range)
      )
    ) {
      errors.members[
        "precision"
      ] = `Precision must be in a range between ${values.members
        .min_range} and ${values.members.max_range}`;
    }
    if (
      !_.inRange(
        parseFloat(values.members.accuracy),
        parseFloat(values.members.min_range),
        parseFloat(values.members.max_range)
      )
    ) {
      errors.members["accuracy"] = `Accuracy must be in a range between ${values
        .members.min_range} and ${values.members.max_range}`;
    }
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "AttributeForm",
  initialValues: {
    format: "NONE",
    data_type: "STRING",
    device_resource_type: "Default value"
  }
})(connect(null, { saveAttribute })(NewAttributeForm));
