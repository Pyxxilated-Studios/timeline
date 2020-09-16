import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../../components/header';

import { RootDispatch, RootState } from '../../store';
import { setOrdering } from '../../store/preferences/actions';
import { OrderType, PreferencesState } from '../../store/preferences/types';
import { UserState } from '../../store/user/types';

interface StateProps {
  user: UserState;
  preferences: PreferencesState;
}

interface DispatchProps {
  setOrdering: (order: OrderType) => void;
}

type PreferencesProps = StateProps & DispatchProps;

const PreferencesPage: React.FC<PreferencesProps> = (props: PreferencesProps) => {
  if (!props.user.loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header title="Preferences"></Header>
      <div style={{ placeContent: 'center' }}>
        <label htmlFor="orderSelect">Select the order you would like your timeline to be displayed in</label>
        <br />
        <select
          id="orderSelect"
          value={props.preferences.order}
          onChange={(event) => props.setOrdering(event.target.value as OrderType)}>
          <option value="oldestFirst">Oldest Repositories First</option>
          <option value="newestFirst">Newest Repositories First</option>
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  user: state.user,
  preferences: state.preferences
});

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
  setOrdering: (order: OrderType) => dispatch(setOrdering(order))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesPage);
