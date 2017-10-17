import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm, getFormValues } from "redux-form";
import { connect } from "react-redux";
import Snackbar from "material-ui/Snackbar";
import Chip from "material-ui/Chip";
import RaisedButton from "material-ui/RaisedButton";
import Add from "material-ui/svg-icons/content/add-circle";
import _ from "lodash";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import uuid from "uuid";
import { Values } from "redux-form-website-template";
import validate from "../../utils/validate";
import categories from "../../constants/categories";
import renderTextField from "../renderTextField/";
import { saveAttribute } from "../../actions";
import RenderMember from "../../components/renderMembers/";
import styles from "./styles.css";

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
    this.handleSelectedChanged = this.handleSelectedChanged.bind(this);
  }

  renderSelectField(field) {
    return (
      <SelectField
        floatingLabelText={field.label}
        floatingLabelFixed={true}
        {...field}
        fullWidth={true}
        value={field.input.value}
        onChange={(eve, index, val) =>
          this.handleSelectedChanged(eve, index, val, field)}
      />
    );
  }

  handleSelectedChanged(eve, index, val, field) {
    this.props.change("members", {}); //clean up data

    let { name } = field.input;
    if (name === "data_type" && val === "OBJECT") {
      this.props.change("default_value", null); //clean up data
      this.props.change("format", "NONE"); //clean up data
    }
    if (
      this.state.data_type === "STRING" &&
      this.state.format !== "NONE" &&
      name === "format" &&
      val === "NONE"
    ) {
      this.setState({
        valuesChips: []
      });
    }
    this.setState({
      [name]: val //tracking the values selected
    });
    field.input.onChange(val);
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      invalid,
      propertiesForms
    } = this.props;
    let { data_type, format, valueEnum, valuesChips } = this.state;
    return (
      <div className="container">
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
            <div className="col-sm-12 col-md-4">
              <Field name="name" label="Name" component={renderTextField} />
            </div>
            <div className="col-sm-12 col-md-4">
              <Field
                name="description"
                label="Description"
                component={renderTextField}
              />
            </div>
            <div className="col-sm-12 col-md-4">
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
            <div className="col-sm-12 col-md-4">
              <Field
                disabled={data_type === "OBJECT"}
                name="default_value"
                label="Default Value"
                component={renderTextField}
              />
            </div>
            <div className="col-sm-12 col-md-4">
              <Field
                name="data_type"
                component={this.renderSelectField.bind(this)}
                label="Data Type"
              >
                <MenuItem primaryText={"STRING"} value={"STRING"} />
                <MenuItem primaryText={"OBJECT"} value={"OBJECT"} />
              </Field>
            </div>
            <div className="col-sm-12 col-md-4">
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
            format={format}
            valueEnum={valueEnum}
            data_type={data_type}
            valuesChips={valuesChips}
            handleAddChip={this.handleAddChip}
            handleInputEnum={this.handleInputEnum}
            handleDeleteChip={this.handleDeleteChip}
          />

          {/* ends fields */}

          <div className="row">
            <div className={`col-md-12 ${styles.rowButtonAddAttribute}`}>
              <RaisedButton
                className={styles.btnAddAttribute}
                disabled={invalid}
                icon={<Add />}
                primary={true}
                label="Add attribute"
                type="submit"
                fullWidth={true}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }

  handleInputEnum(value) {
    this.setState({
      valueEnum: value
    });
  }

  handleDeleteChip(idChip) {
    this.setState(
      {
        valuesChips: this.state.valuesChips.filter(chip => chip.id !== idChip)
      },
      () => {
        this.props.change("members", { enumerations: this.state.valuesChips });
      }
    );
  }

  handleAddChip() {
    let { valueEnum } = this.state;
    if (valueEnum && valueEnum.trim() !== "") {
      this.setState(
        {
          valuesChips: this.state.valuesChips.concat({
            id: uuid.v4(),
            value: valueEnum
          }),
          valueEnum: ""
        },
        () => {
          this.props.change("members", {
            enumerations: this.state.valuesChips
          });
        }
      );
    } else {
      this.setState({
        open: true
      });
    }
    let element = document.querySelector("#enumField");
    element.focus();
  }

  onSubmit(values) {
    this.props.saveAttribute(values);
    this.props.reset();
    this.setState({
      valuesChips: [],
      data_type: "STRING",
      format: "NONE"
    });
  }
}

NewAttributeForm.propTypes = {
  form: PropTypes.string,
  initialValues: PropTypes.object,
  attributes: PropTypes.array
};

export default reduxForm({
  validate
})(connect(null, { saveAttribute })(NewAttributeForm));
