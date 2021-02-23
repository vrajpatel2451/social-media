import React, { useEffect } from "react";
import API from "./API";
import FormForRegistration from "./FormForRegistration";
import './Registration.css'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";


function Registration(props) {
  useEffect(()=>{
    if (props.isAuthenticated) {
      return <Redirect to="/" />;
    }
  },[])
  return (
    <div className="LoginFormMerge">
      <FormForRegistration></FormForRegistration>

      {/* <API></API> */}
    </div>
  );
}


Registration.propTypes = {
  // login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) =>({
  isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps) (Registration);
