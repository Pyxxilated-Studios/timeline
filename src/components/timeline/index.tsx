import React, { useEffect } from "react";

import { Repository } from "../../types";

import Repo from "../repo";

import "./styles.css";

const moment = require("moment");

// check if an element is in viewport
// http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
function isElementInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

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

const Timeline: React.FunctionComponent<{
  username: string;
  repositories: Repository[];
}> = ({ username, repositories }) => {
  useEffect(() => {
    // listen for events
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);

    return () => {
      window.removeEventListener("load", callbackFunc);
      window.removeEventListener("resize", callbackFunc);
      window.removeEventListener("scroll", callbackFunc);
    };
  }, []);

  return (
    <>
      <section className="intro">
        <div className="container">
          <h1>Github Repository Timeline for {username}</h1>
        </div>
      </section>
      <section className="timeline">
        <ul>
          {repositories
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
    </>
  );
};

export default Timeline;
