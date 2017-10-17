import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "material-ui/Tabs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getFormValues, isValid } from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import { List } from "material-ui/List";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import _ from "lodash";
import categories from "../constants/categories";
import * as actions from "../actions/";
import styles from "./styles.css";
import NewAttribute from "../components/newAttributeForm/";
import Item from "../components/Item/";

class App extends Component {
  constructor() {
    super();
    this.state = {
      category: "device_info",
      isDisabled: true
    };
  }
  componentDidMount() {
    this.props.actions.getData();
  }

  componentWillReceiveProps(nextProps) {
    let inValidForm = nextProps.forms.find(form => !form.isValid);
    let arrNames = nextProps.forms.map(el => el.name || "");
    let dups;
    arrNames.forEach(name => {
      let number = nextProps.forms.filter(elArr => elArr.name === name).length;

      if (number > 1) {
        dups = true;
      }
    });

    if (!inValidForm && !dups) {
      this.setState({
        isDisabled: false
      });
    } else {
      this.setState({
        isDisabled: true
      });
    }
  }

  render() {
    let { attributes, forms } = this.props;
    let { category, isDisabled } = this.state;
    return (
      <div className="container">
        <Paper style={{ marginBottom: 20 }} zDepth={2}>
          <Tabs
            className={styles.body}
            onChange={value => this.setState({ category: value })}
          >
            {/* category tabs */}
            {categories.map(category => (
              <Tab
                key={category.id}
                value={category.name}
                className={styles.tab}
                label={category.label}
              >
                <h3 className={styles.headline}>{category.label} attributes</h3>
                <p className={styles.p}>{category.decription}</p>
                {/* attributes list section */}
                <div className={`col-md-8 col-xs-12 ${styles.itemsContainer}`}>
                  <Paper style={{ marginBottom: 20 }} zDepth={2}>
                    <List>
                      <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={800}
                        transitionLeaveTimeout={500}
                        transitionAppearTimeout={500}
                        transitionAppear={true}
                      >
                        {attributes &&
                          attributes.map(
                            attribute =>
                              attribute.category == category.name ? (
                                <Item
                                  key={attribute.id}
                                  deleteAttribute={
                                    this.props.actions.deleteAttribute
                                  }
                                  attribute={attribute}
                                />
                              ) : (
                                ""
                              )
                          )}
                      </ReactCSSTransitionGroup>
                    </List>
                  </Paper>
                </div>
                {/* end attributes list */}
                <div />{" "}
                <Card>
                  <CardHeader title="New Attribute" subtitle="Form" />
                  <NewAttribute
                    form={category.name}
                    initialValues={{
                      category: category.name,
                      format: "NONE",
                      data_type: "STRING",
                      members: {},
                      device_resource_type: "Default value"
                    }}
                    attributes={attributes}
                  />
                </Card>
              </Tab>
            ))}
            {/* end category tabs */}
          </Tabs>
        </Paper>
        <div className="row">
          <div className={`col-md-12`}>
            <RaisedButton
              primary={true}
              label="SAVE"
              disabled={isDisabled}
              type="submit"
            />
          </div>
        </div>
        <code>
          <pre>{JSON.stringify(forms, null, 2)}</pre>
        </code>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

const mapStateToProps = state => {
  let forms = [];
  forms = categories.map(cat => {
    return {
      ...getFormValues(cat.name)(state),
      category: cat.name,
      isValid: isValid(cat.name)(state)
    };
  });
  return {
    forms,
    attributes: state.formAttribute.attributes
  };
};

App.propTypes = {
  attributes: PropTypes.array,
  forms: PropTypes.array
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
