import React, { useState, useEffect } from "react";

export const Count = () => {
  const [count, setCount] = useState(localStorage.getItem("count"));
  const [data, setData] = useState([]);
  const [address, setAddress] = useState("");
  const [add, setAdd] = useState("");

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
  const onDelete = (id) => {
    fetch(`${url}/api/v1/houses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => getData());
  };
  const onAdd = (id) => {
    fetch(`${url}/api/v1/houses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        address: add,
        attachments: [
          {
            imgPath:
              "https://miro.medium.com/max/1200/1*lO2QMyyxHA_puGTn0l9RLg.png",
          },
        ],
        categoryId: 12,
        city: "Beruniy",
        country: "Orzu",
        description: "Ishyoqmas yalqov dangasas grajdanlar",
        favorite: true,
        houseDetails: {
          area: 12,
          bath: 31,
          beds: 41,
          garage: 412,
          room: 12,
          yearBuilt: 1023,
        },
        locations: {
          latitude: 0,
          longitude: 0,
        },
        name: "string",
        price: 123124124,
        region: "string",
        salePrice: 1231,
        status: true,
        zipCode: 218321,
      }),
    })
      .then((res) => res.json())
      .then((res) => getData());
  };
  return (
    <div>
      <h5>Restfull Api</h5>
      <input type="text" value={add} onChange={(e) => setAdd(e.target.value)} />
      <button onClick={onAdd}>Add</button>
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
            <button onClick={() => onDelete(value.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};
export default Count;
