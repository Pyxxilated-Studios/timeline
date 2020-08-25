import React, { Suspense, FunctionComponent } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";

import { RootDispatch, RootState } from "../../store";
import { UserState } from "../../store/user/types";

import { setLoggedIn, setToken } from "../../store/user/actions";

interface DispatchProps {
  setLoggedIn: () => void;
  setToken: (token: string) => void;
}

interface StateProps {
  user: UserState;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

const mapStateToProps = (state: RootState): StateProps => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
  setLoggedIn: () => dispatch(setLoggedIn(true)),
  setToken: (token) => dispatch(setToken(token)),
});

const Load = connect(
  mapStateToProps,
  mapDispatchToProps
)((props: Props) => {
  const query = queryString.parse(props.location.search);

  // Fetch the token via proxy
  fetch(`/authenticate/${query.code}`, {})
    .then((resp) => resp.json())
    .then((data) => {
      props.setToken(data.token);
      props.setLoggedIn();
    });

  return <Redirect to="/timeline" />;
});

const VerifyLoginPage: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  return (
    <Suspense
      fallback={
        <div>
          <h1>Loading...</h1>
        </div>
      }
    >
      <Load {...props} />
    </Suspense>
  );
};

export default connect()(VerifyLoginPage);
