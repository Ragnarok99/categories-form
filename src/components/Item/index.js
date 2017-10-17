import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { ListItem } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import DeleteForever from "material-ui/svg-icons/action/delete-forever";
import { grey400, darkBlack, lightBlack } from "material-ui/styles/colors";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Divider from "material-ui/Divider";
import ShowMore from "../showMore/";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false
    };
  }
  render() {
    let { showMore } = this.state;
    let { attribute, deleteAttribute } = this.props;
    return (
      <div>
        <ListItem
          key={attribute.id}
          rightIconButton={
            <IconButton
              onClick={() => deleteAttribute(attribute.id)}
              touch={true}
              tooltip={`Delete ${attribute.name}`}
              tooltipPosition="top-center"
            >
              <DeleteForever color={grey400} />
            </IconButton>
          }
          primaryText={`${attribute.name}`}
          secondaryText={`${attribute.description || ""}`}
          onClick={() => this.setState({ showMore: !this.state.showMore })}
        />
        {showMore && (
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
            transitionAppearTimeout={500}
            transitionAppear={true}
          >
            <ShowMore properties={attribute} />
          </ReactCSSTransitionGroup>
        )}

        <Divider />
      </div>
    );
  }
}

Item.propTypes = {
  deleteAttribute: PropTypes.func,
  attribute: PropTypes.object
};

export default Item;
