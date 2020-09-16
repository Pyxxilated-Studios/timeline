import React, { useEffect, FunctionComponent } from 'react';
import { parseJSON, compareAsc } from 'date-fns';

import { UserState } from '../../store/user/types';
import { RootState } from '../../store';
import { connect } from 'react-redux';
import { PreferencesState } from '../../store/preferences/types';

import Repo from '../repo';

import './styles.css';

// check if an element is in viewport
// http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
const isElementInViewport = (el: Element): boolean => {
  const rect = el.getBoundingClientRect();

  return !(
    rect.top >= (window.innerHeight || document.documentElement.clientHeight) ||
    rect.left >= (window.innerWidth || document.documentElement.clientWidth) ||
    rect.bottom <= 0 ||
    rect.right <= 0
  );
};

const callbackFunc = (): void => {
  const items = document.querySelectorAll('.timeline li');
  for (let i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      items[i].classList.add('in-view');
    } else if (items[i].classList.contains('in-view')) {
      items[i].classList.remove('in-view');
    }
  }
};

interface StateProps {
  user: UserState;
  preferences: PreferencesState;
}

type Props = StateProps;

const Timeline: FunctionComponent<Props> = (props: Props) => {
  callbackFunc();

  useEffect(() => {
    // listen for events
    // window.addEventListener("load", callbackFunc);
    window.addEventListener('resize', callbackFunc);
    window.addEventListener('scroll', callbackFunc);

    return (): void => {
      // window.removeEventListener("load", callbackFunc);
      window.removeEventListener('resize', callbackFunc);
      window.removeEventListener('scroll', callbackFunc);
    };
  }, []);

  return (
    <section className="timeline" id="timeline">
      <ul>
        {props.user.repositories
          .sort((r1, r2) => {
            const diff = compareAsc(parseJSON(r1.created_at), parseJSON(r2.created_at));

            if (props.preferences.order === 'oldestFirst') {
              return diff;
            } else {
              return -diff;
            }
          })
          .map((repo, idx) => (
            <Repo key={repo.id} side={idx % 2 === 0 ? 'left' : 'right'} repository={repo} />
          ))}
      </ul>
    </section>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  user: state.user,
  preferences: state.preferences
});

export default connect(mapStateToProps)(Timeline);
