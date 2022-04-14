import React, { useState, useEffect } from "react";

export const Count = () => {
  const [count, setCount] = useState(localStorage.getItem("count"));
  const [data, setData] = useState([]);
  const [address, setAddress] = useState("");

  const { REACT_APP_URL: url } = process.env;
  const getData = () => {
    fetch(`${url}/api/v1/houses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res?.dataList[0]));
  };
  useEffect(() => {
    getData();
  }, []);

  const onUpdate = (id) => {
    fetch(`${url}/api/v1/houses/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ address: address }),
    })
      .then((res) => res.json())
      .then((res) => getData());
  };
  return (
    <div>
      <h5>Restfull Api</h5>
      {data.map((value) => {
        return (
          <div>
            <h5>{value.address}</h5>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={() => onUpdate(value.id)}>Update</button>
          </div>
        );
      })}
    </div>
  );
};
export default Count;
