import React, { useState } from "react";

import Timeline from "../timeline";

import { Repository } from "../../types";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [timelineRepositories, setTimelineRepositories] = useState<
    Repository[]
  >();
  const [fetched, setFetched] = useState(false);

  return (
    <>
      {!fetched ? (
        <>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <button
            onClick={() => {
              fetch(`https://api.github.com/users/${username}/repos`, {
                headers: {
                  Authorization: "Basic " + btoa(username + ":" + password),
                },
              })
                .then((resp) => resp.json())
                .then((data) => {
                  setTimelineRepositories(data);
                  setFetched(true);
                });
            }}
          >
            Authorise
          </button>
        </>
      ) : (
        <Timeline
          username={username}
          repositories={timelineRepositories || []}
        />
      )}
    </>
  );
};

export default LandingPage;
