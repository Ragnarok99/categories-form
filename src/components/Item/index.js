import React, { Component } from "react";
import styles from "./styles.css";
import { ListItem } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import DeleteForever from "material-ui/svg-icons/action/delete-forever";
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';

class item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false
    };
  }
  render() {
    let { showMore } = this.state;

    return (
      <div>
        <ListItem
          key={this.props.id}
          rightIconButton={
            <IconButton
              onClick={() => this.props.deleteAttribute(this.props.id)}
              touch={true}
              tooltip={`Delete ${this.props.name}`}
              tooltipPosition="top-center"
            >
              <DeleteForever color={grey400} />
            </IconButton>
          }
          primaryText={`${this.props.name}`}
          secondaryText={`${this.props.description}`}
          onClick={() => this.setState({ showMore: !this.state.showMore })}
        />
        {showMore && <span>1</span>}
        <Divider />

      </div>
    );
  }
}

export default item;
