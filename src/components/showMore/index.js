import React from "react";
import styles from "./styles.css";
import PropTypes from "prop-types";

const ShowMore = props => {
  let { format, data_type, device_resource_type } = props.properties;
  return (
    <div className="container">
      <div className={styles.details}>
        <ul>
          <li>
            <span className={styles.title}>Format:</span>{" "}
            <span className={styles.value}>{format}</span>
          </li>
          <li>
            <span className={styles.title}>Data Type:</span>{" "}
            <span className={styles.value}>{data_type}</span>
          </li>
          <li>
            <span className={styles.title}>Device Resource Type:</span>{" "}
            <span className={styles.value}>{device_resource_type}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

ShowMore.propTypes = {
  properties: PropTypes.object
};

export default ShowMore;
