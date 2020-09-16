import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../../store';
import { UserState } from '../../store/user/types';

interface StateProps {
  user: UserState;
}

type NavigationPaneProps = StateProps;

const NavigationPane: React.FC<NavigationPaneProps> = (props: NavigationPaneProps) => {
  return (
    <nav
      style={{
        position: 'fixed',
        width: '100%',
        backgroundColor: '#f45b69',
        height: '2em',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '0 .5em'
      }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3>Timeline</h3>
      </Link>

      <div>
        {props.user.loggedIn ? <Link to="/preferences">{props.user.username}</Link> : <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  user: state.user
});

export default connect(mapStateToProps)(NavigationPane);
