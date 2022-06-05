import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { UserContext } from "../App";

const columns = [
  { field: "id", headerName: "Order ID", width: 90 },
  { field: "name", headerName: "Name", width: 180 },
  { field: "orders", headerName: "Order", width: 580 },
  { field: "price", headerName: "Price", width: 70 },
  { field: "address", headerName: "Delivery Address", width: 230 },
  { field: "date", headerName: "Date", width: 250 },
];

const ProfileOrders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/orders")
      .then((res) => res.json())
      .then((data) => {
        const newOrders = data.filter((t) => t.userOrderedID === user.id);
        setOrders(newOrders);
      });
  }, []);

  const rows = orders.map((t) => {
    let ordersTitle = "";
    let orderDeliveryAddress =`${t.address.street} , ${t.address.city}\n${t.address.country} ${t.address.zipCode}`;
    let count = 1;
    t.itemOrdered.forEach((element) => {
      ordersTitle += `${count}. ${element.itemTitle} -   x${element.amount}\n`;
      count++;
    });
    return {
      id: t.id,
      name: t.personName,
      orders: ordersTitle,
      price: t.totalPrice,
      date: t.purchaseDate,
      address: orderDeliveryAddress
    };
  });
  return (
    <div style={{ height: "90vh", width: "90%", margin: "5vh 0 5vh 5vh" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};

export default ProfileOrders;
