import React, { Component } from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import { List } from "material-ui/List";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import categories from "../constants/categories";
import * as actions from "../actions/";
import styles from "./styles.css";
import NewAttribute from "../components/newAttributeForm/";
import Item from "../components/Item/";

class App extends Component {
  constructor() {
    super();
    this.state = {
      category: "device_info"
    };
  }
  componentDidMount() {
    this.props.actions.getData();
    console.log(this.props.actions);
  }

  render() {
    let { attributes } = this.props;
    let { category } = this.state;
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
                                  {...attribute}
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
                <div />
              </Tab>
            ))}
            {/* end category tabs */}
          </Tabs>
          <Card>
            <CardHeader title="New Attribute" subtitle="Form" />
            <NewAttribute currentCategory={category} attributes={attributes} />
          </Card>
        </Paper>
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
  return {
    attributes: state.formAttribute.attributes
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
