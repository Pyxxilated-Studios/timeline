import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { RootState, RootDispatch } from "../../store";
import { UserState } from "../../store/user/types";

import { setUsername, setState } from "../../store/user/actions";

import Header from "../../components/header";

import "./styles.css";

interface StateProps {
  user: UserState;
}

interface DispatchProps {
  setUsername: (username: string) => void;
  setState: (state: string) => void;
}

type Props = StateProps & DispatchProps;

const LoginPage: FunctionComponent<Props> = (props: Props) => {
  useEffect(() => {
    if (props.user.state.length === 0) {
      props.setState(uuidv4());
    }
  }, [props]);

  if (props.user.loggedIn) {
    return <Redirect to="/timeline" />;
  }

  return (
    <>
      <Header title="Login" />
      <section style={{ marginTop: "1em" }}>
        <form className="login-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={props.user.username}
            onChange={(event) => props.setUsername(event.target.value)}
          />
          <a
            type="submit"
            href={`https://github.com/login/oauth/authorize?login=${props.user.username}&client_id=${process.env.REACT_APP_CLIENT_ID}&state=${props.user.state}`}
          >
            Login
          </a>
        </form>
      </section>
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
  setUsername: (username) => dispatch(setUsername(username)),
  setState: (state) => dispatch(setState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
