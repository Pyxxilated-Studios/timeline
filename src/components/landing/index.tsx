import React, { useState } from "react";
import { connect } from "react-redux";

import { RootState, RootDispatch } from "../../store";
import { UserState } from "../../store/user/types";

import { Repository } from "../../types";

import { setUsername, setRepositories } from "../../store/user/actions";

import Timeline from "../timeline";

interface StateProps {
  user: UserState;
}

interface DispatchProps {
  setUsername: (username: string) => void;
  setRepositories: (repositories: Repository[]) => void;
}

type Props = StateProps & DispatchProps;

const LandingPage = (props: Props) => {
  const [password, setPassword] = useState("");

  return (
    <>
      {props.user.repositories.length === 0 ? (
        <>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={props.user.username}
            onChange={(event) => props.setUsername(event.target.value)}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <button
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
                .then((resp) => resp.json())
                .then((data) => props.setRepositories(data))
                .catch((error) => console.log("There was an error:", error));
            }}
          >
            Authorise
          </button>
        </>
      ) : (
        <Timeline
          username={props.user.username}
          repositories={props.user.repositories || []}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
  setUsername: (username) => dispatch(setUsername(username)),
  setRepositories: (repositories) => dispatch(setRepositories(repositories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
