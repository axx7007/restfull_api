import React, { useState, useEffect } from "react";

export const Count = () => {
  const [count, setCount] = useState(localStorage.getItem("count"));
  const [data, setData] = useState([]);

  const { REACT_APP_URL: url } = process.env;
  useEffect(() => {
    fetch(`${url}/api/v1/houses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res?.dataList[0]));
  }, []);

  return (
    <div>
      <h5>Restfull Api</h5>
      {data.map((value) => {
        return <h5>{value.address}</h5>;
      })}
    </div>
  );
};
export default Count;
