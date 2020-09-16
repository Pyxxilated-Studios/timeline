import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../../components/header';

import { RootDispatch, RootState } from '../../store';
import { setOrdering } from '../../store/preferences/actions';
import { OrderType, PreferencesState } from '../../store/preferences/types';
import { logout } from '../../store/user/actions';
import { UserState } from '../../store/user/types';

interface StateProps {
  user: UserState;
  preferences: PreferencesState;
}

interface DispatchProps {
  setOrdering: (order: OrderType) => void;
  logout: () => void;
}

type PreferencesProps = StateProps & DispatchProps;

const PreferencesPage: React.FC<PreferencesProps> = (props: PreferencesProps) => {
  if (!props.user.loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header title="Preferences"></Header>
      <div style={{ display: 'flex', flexDirection: 'column', placeContent: 'center' }}>
        <div style={{ margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="orderSelect">Select the order you would like your timeline to be displayed in</label>

          <select
            id="orderSelect"
            value={props.preferences.order}
            onChange={(event) => props.setOrdering(event.target.value as OrderType)}>
            <option value="oldestFirst">Oldest Repositories First</option>
            <option value="newestFirst">Newest Repositories First</option>
          </select>
        </div>

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
            cursor: 'pointer',
            margin: '5em auto'
          }}
          onClick={props.logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  user: state.user,
  preferences: state.preferences
});

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
  setOrdering: (order: OrderType) => dispatch(setOrdering(order)),
  logout: (): void => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesPage);
