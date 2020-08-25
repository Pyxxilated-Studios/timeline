import React, { FunctionComponent } from "react";

import { Repository } from "../../types";

import moment from "moment";

interface OwnProps {
  repository: Repository;
  side: "right" | "left";
}

type Props = OwnProps;

const Repo: FunctionComponent<Props> = (props: Props) => {
  return (
    <li>
      <div>
        <h1>{props.repository.name}</h1>
        <time>
          {moment(props.repository.created_at).format("MMMM Do YYYY")}
        </time>
        {props.repository.description}
      </div>
    </li>
  );
};

export default Repo;
