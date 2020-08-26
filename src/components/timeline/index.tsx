import React, { useEffect, FunctionComponent } from "react";

import Repo from "../repo";

import "./styles.css";
import { UserState } from "../../store/user/types";
import { RootState } from "../../store";
import { connect } from "react-redux";

const moment = require("moment");

// check if an element is in viewport
// http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
const isElementInViewport = (el: Element) => {
  const rect = el.getBoundingClientRect();

  return !(
    rect.top >= (window.innerHeight || document.documentElement.clientHeight) ||
    rect.left >= (window.innerWidth || document.documentElement.clientWidth) ||
    rect.bottom <= 0 ||
    rect.right <= 0
  );
};

const callbackFunc = () => {
  const items = document.querySelectorAll(".timeline li");
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      items[i].classList.add("in-view");
    } else if (items[i].classList.contains("in-view")) {
      items[i].classList.remove("in-view");
    }
  }
};

interface StateProps {
  user: UserState;
}

type Props = StateProps;

const Timeline: FunctionComponent<Props> = (props: Props) => {
  useEffect(() => {
    callbackFunc();

    // listen for events
    // window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);

    return () => {
      // window.removeEventListener("load", callbackFunc);
      window.removeEventListener("resize", callbackFunc);
      window.removeEventListener("scroll", callbackFunc);
    };
  }, []);

  return (
    <section className="timeline" id="timeline">
      <ul>
        {props.user.repositories
          .sort((r1, r2) => moment(r1.created_at) - moment(r2.created_at))
          .map((repo, idx) => (
            <Repo
              key={repo.id}
              side={idx % 2 === 0 ? "left" : "right"}
              repository={repo}
            />
          ))}
      </ul>
    </section>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  user: state.user,
});

export default connect(mapStateToProps)(Timeline);
