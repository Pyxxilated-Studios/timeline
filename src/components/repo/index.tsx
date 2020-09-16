import React, { FunctionComponent } from 'react';
import { parseJSON, format } from 'date-fns';

import { Repository } from '../../types';

interface OwnProps {
  repository: Repository;
  side: 'right' | 'left';
}

type Props = OwnProps;

const Repo: FunctionComponent<Props> = (props: Props) => {
  return (
    <li>
      <div>
        <h1>
          <a href={props.repository.html_url}>{props.repository.name}</a>
        </h1>
        <time>{format(parseJSON(props.repository.created_at), 'PPP')}</time>
        {props.repository.description}
      </div>
    </li>
  );
};

export default Repo;
