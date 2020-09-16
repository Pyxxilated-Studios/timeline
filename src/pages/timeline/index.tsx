import React, { FunctionComponent, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { RootState, RootDispatch } from '../../store';

import { UserState } from '../../store/user/types';

import Header from '../../components/header';
import Timeline from '../../components/timeline';
import { setRepositories, setFetched } from '../../store/user/actions';
import { Repository } from '../../types';

interface StateProps {
  user: UserState;
}

interface LoadDispatchProps {
  setRepositories: (repositories: Repository[]) => void;
  setFetched: (fetched: boolean) => void;
}

type LoadProps = StateProps & LoadDispatchProps;

const mapStateToProps = (state: RootState): StateProps => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: RootDispatch): LoadDispatchProps => ({
  setRepositories: (repositories): void => dispatch(setRepositories(repositories)),
  setFetched: (fetched): void => dispatch(setFetched(fetched))
});

const LoadTimeline = connect(
  mapStateToProps,
  mapDispatchToProps
)((props: LoadProps) => {
  const onReload = (): void => {
    props.setFetched(false);
  };

  if (!props.user.fetched) {
    fetch(`https://api.github.com/users/${props.user.username}/repos`, {
      headers: { Authorization: `token ${props.user.token}` }
    })
      .then((resp) => resp.json())
      .then((data) => {
        props.setRepositories(data);
        props.setFetched(true);
      });
  }

  useEffect(() => {
    // Refresh the repositories everytime the user refreshes the page
    window.onbeforeunload = onReload;

    return (): void => {
      // Remove this avility, otherwise it's possible that we'll endlessly refresh the repositories
      window.onbeforeunload = (): null => null;
    };
  });

  return <Timeline />;
});

type TimelineProps = StateProps;

const TimelinePage: FunctionComponent<TimelineProps> = (props: TimelineProps) => {
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
