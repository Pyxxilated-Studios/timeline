import React, { FunctionComponent } from "react";
import moment from "moment";

import { Repository } from "../../types";

interface OwnProps {
  repository: Repository;
  side: "right" | "left";
}

type Props = OwnProps;

const Repo: FunctionComponent<Props> = (props: Props) => {
  return (
    <li>
      <div>
        <h1>
          <a href={props.repository.html_url}>{props.repository.name}</a>
        </h1>
        <time>
          {moment(props.repository.created_at).format("MMMM Do YYYY")}
        </time>
        {props.repository.description}
      </div>
    </li>
  );
};

export default Repo;
