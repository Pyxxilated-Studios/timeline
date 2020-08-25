import React, { useState, FunctionComponent } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { RootState, RootDispatch } from "../../store";
import { UserState } from "../../store/user/types";

import { Repository } from "../../types";

import {
  setUsername,
  setRepositories,
  setLoggedIn,
} from "../../store/user/actions";

import Header from "../../components/header";

import "./styles.css";

interface StateProps {
  user: UserState;
}

interface DispatchProps {
  setUsername: (username: string) => void;
  setRepositories: (repositories: Repository[]) => void;
  setLoggedIn: () => void;
}

type Props = StateProps & DispatchProps;

const LoginPage: FunctionComponent<Props> = (props: Props) => {
  const [password, setPassword] = useState("");

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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Link
            type="submit"
            to="/timeline"
            onClick={() => {
              fetch(
                `https://api.github.com/users/${props.user.username}/repos`,
                {
                  headers: {
                    Authorization:
                      "Basic " + btoa(props.user.username + ":" + password),
                  },
                }
              )
                .then(async (resp) => {
                  if (resp.ok) {
                    return resp.json();
                  }

                  throw Error(`Unable to connect: ${resp.status}`);
                })
                .then((data) => {
                  props.setRepositories(data);
                  props.setLoggedIn();
                })
                .catch((error) => console.log("There was an error:", error));
            }}
          >
            Login
          </Link>
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
  setRepositories: (repositories) => dispatch(setRepositories(repositories)),
  setLoggedIn: () => dispatch(setLoggedIn(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
