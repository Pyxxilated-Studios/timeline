import React from "react";

import { Repository } from "../../types";

import moment from "moment";

const Repo: React.FunctionComponent<{
  repository: Repository;
  side: "right" | "left";
}> = ({ repository, side }) => {
  return (
    <li>
      <div>
        <h1>{repository.name}</h1>
        <time>{moment(repository.created_at).format("MMMM Do YYYY")}</time>
        {repository.description}
      </div>
    </li>
  );
};

export default Repo;
