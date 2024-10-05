import { useEffect, useState } from "react";
import { Table, notification } from "antd";
import { fetchOrders } from "../api/ordersApi";

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  //sayfa ilk açıldığında sipariş datasını çekme
  useEffect(() => {
    const OrderList = async () => {
      const data = await fetchOrders();
      if (data) {
        setOrdersData(data);
      } else {
        console.log("error");
      }
    };
  }, []);

  const columns = [
    {
      title: "Sipariş No",
      dataIndex: "siparisId",
      key: "siparisId",
    },
    {
      title: "Ürün Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sipariş Tarihi",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Sipariş Tarihi",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Sipariş Durumu",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <>
      <p style={{ fontSize: "24px", color: "#424949" }}>
        <b>SİPARİŞLERİM </b>
      </p>
      <div>
        <Table dataSource={ordersData} columns={columns} />
      </div>
    </>
  );
};
export default Orders;
