import React from "react";

import "./styles.css";

interface OwnProps {
  title: string;
}

type Props = OwnProps;

const Header: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <section className="title">
      <div className="container">
        <h1>{props.title}</h1>
      </div>
    </section>
  );
};

export default Header;
