export default function validate(values, props) {
  let { attributes } = props;
  values.members === undefined ? (values.members = {}) : "";

  const errors = { members: {} };
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (attributes.find(el => el.name === values.name)) {
    errors.name = `Another attribute already owns the name ${values.name}, please provide a different one.`;
  }

  if (!values.members.unit_measurement) {
    errors.members["unit_measurement"] = "Unit of Measurement is required";
  }
  if (!values.members.min_range) {
    errors.members["min_range"] = "Min range is required";
  }
  if (!values.members.max_range) {
    errors.members["max_range"] = "Max range is required";
  }

  if (
    parseFloat(values.members.max_range) < parseFloat(values.members.min_range)
  ) {
    errors.members["max_range"] = "Max range must be greater than min range";
  }

  if (
    parseFloat(values.members.min_range) > parseFloat(values.members.max_range)
  ) {
    errors.members["min_range"] = "Min range must be lower than max range";
  }

  if (values.members.min_range && values.members.max_range) {
    if (
      !_.inRange(
        parseFloat(values.members.precision),
        parseFloat(values.members.min_range),
        parseFloat(values.members.max_range) + 1
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
        parseFloat(values.members.max_range )+ 1
      )
    ) {
      errors.members["accuracy"] = `Accuracy must be in a range between ${values
        .members.min_range} and ${values.members.max_range}`;
    }
  }

  return errors;
}
