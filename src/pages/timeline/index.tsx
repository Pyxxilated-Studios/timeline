import React, { FunctionComponent, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { RootState, RootDispatch } from '../../store';

import { UserState } from '../../store/user/types';

import Header from '../../components/header';
import Timeline from '../../components/timeline';
import { setRepositories, setFetched, logout } from '../../store/user/actions';
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

interface TimelineDispatchProps {
  logout: () => void;
}

type TimelineProps = StateProps & TimelineDispatchProps;

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
      <div style={{ placeContent: 'center', display: 'flex' }}>
        <button
          style={{
            fontSize: '1.2em',
            fontWeight: 'bold',
            backgroundColor: '#f45b69',
            color: '#fff',
            border: 'none',
            boxShadow: '0px 0px 1em black',
            padding: '.25em',
            borderRadius: '.5em',
            cursor: 'pointer'
          }}
          onClick={props.logout}>
          Logout
        </button>
      </div>
    </>
  );
};

const mapDispatchToTimelineProps = (dispatch: RootDispatch): TimelineDispatchProps => ({
  logout: (): void => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToTimelineProps)(TimelinePage);
