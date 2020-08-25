import React, { FunctionComponent, Suspense } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { RootState, RootDispatch } from "../../store";

import { UserState } from "../../store/user/types";

import Header from "../../components/header";
import Timeline from "../../components/timeline";
import { setRepositories, setFetched } from "../../store/user/actions";
import { Repository } from "../../types";

interface StateProps {
  user: UserState;
}

interface DispatchProps {
  setRepositories: (repositories: Repository[]) => void;
  setFetched: () => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: RootState): StateProps => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
  setRepositories: (repositories) => dispatch(setRepositories(repositories)),
  setFetched: () => dispatch(setFetched(true)),
});

const LoadTimeline = connect(
  mapStateToProps,
  mapDispatchToProps
)((props: Props) => {
  if (!props.user.fetched) {
    fetch(`https://api.github.com/users/${props.user.username}/repos`, {
      headers: { Authorization: `token ${props.user.token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        props.setRepositories(data);
        props.setFetched();
      });
  }

  return <Timeline />;
});

const TimelinePage: FunctionComponent<Props> = (props: Props) => {
  if (!props.user.loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header title={`Project Timeline for ${props.user.username}`} />
      <Suspense fallback={<h1>Fetching Repositories...</h1>}>
        <LoadTimeline />
      </Suspense>
    </>
  );
};

export default connect(mapStateToProps)(TimelinePage);
