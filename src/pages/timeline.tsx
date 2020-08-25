import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { RootState } from "../store";

import { UserState } from "../store/user/types";

import Header from "../components/header";
import Timeline from "../components/timeline";

interface StateProps {
  user: UserState;
}

type Props = StateProps;

const TimelinePage: FunctionComponent<Props> = (props: Props) => {
  if (!props.user.loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header title={`Github Repository Timeline for ${props.user.username}`} />
      <Timeline />
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  user: state.user,
});

export default connect(mapStateToProps)(TimelinePage);
