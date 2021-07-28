import React, { useCallback, useEffect, useState } from "react";

const pickButMap = [
  {
    pick: "Rock",
  },
  {
    pick: "Paper",
  },
  {
    pick: "Scissors",
  },
];

const PickButton = (props) => {
  const { onClick, pick } = props;
  return (
    <div className="col">
      <button
        {...{
          type: "button",
          className: "btn btn-dark btn-circle btn-lg",
          onClick,
          pick,
        }}
      >
        {pick}
      </button>
    </div>
  );
};

function UserControls({ user, update }) {
  const [pick, setPick] = useState(null);
  const [label, setLabel] = useState("Pick One");
  const [disabled, setDisable] = useState(true);

  const onClick = useCallback(({ target }) => {
    setPick(target.getAttribute("pick"));
  }, []);

  const onSubmit = useCallback(() => {
    console.log("pick", pick);
    if (pick) {
      update(`${user.type}.choice`, pick);
      update(`${user.type}.isPicked`, true);
      setPick(null);
    }
  }, [pick, update, user.type]);

  useEffect(() => {
    if (pick) {
      const name = user.name;
      if (user.type === "user") {
        setLabel(`${name} picked ${pick}`);
      } else {
        setLabel(`${name} has picked`);
      }
      setDisable(false);
    }
  }, [pick, user.name, user.type]);

  return (
    <div className="row text-center">
      {pickButMap.map((props, idx) => (
        <PickButton key={idx} {...{ onClick }} {...props} {...user} />
      ))}
      <div className="pt-3 pb-3">{label}</div>
      <div className="w-100">
        {/* {user.type === 'user' && ( */}
        <button
          {...{
            className: "btn btn-secondary btn-lg",
            onClick: onSubmit,
            disabled,
          }}
        >
          Submit
        </button>
        {/* )} */}
      </div>
    </div>
  );
}

export default UserControls;
