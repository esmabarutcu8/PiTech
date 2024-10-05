import React from "react";
import { Input, Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  OrderedListOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          backgroundColor: "#F39C12",
          width: "100vw",
          height: "120px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {" "}
        <h
          style={{
            marginRight: "100px",
            marginLeft: "20px",
            fontSize: "48px",
            color: "#424949",
          }}
        >
          SHOPING
        </h>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Input
            style={{ width: "250px", height: "40px", marginTop: "8px" }}
            placeholder="Arama yapın..."
          ></Input>
          <Button
            style={{
              height: "40px",
              marginTop: "8px",
            }}
          >
            {" "}
            {<SearchOutlined />} Ara
          </Button>
        </div>
        <div style={{ marginLeft: "600px" }}>
          <h
            onClick={() => {
              navigate("");
            }}
            style={{
              fontSize: "20px",
              marginLeft: "30px",
              justify: "end",
              color: "#424949",
            }}
          >
            {<HomeOutlined />}Ana Sayfa
          </h>
          <h
            onClick={() => {
              navigate("/cart");
            }}
            style={{
              fontSize: "20px",
              marginLeft: "30px",
              justify: "end",
              color: "#424949",
            }}
          >
            {<ShoppingCartOutlined />}Sepetim
          </h>

          <h
            onClick={() => {
              navigate("/orders");
            }}
            style={{
              fontSize: "20px",
              marginLeft: "30px",
              justify: "end",
              color: "#424949",
            }}
          >
            {<OrderedListOutlined />}Siparişlerim
          </h>
        </div>
      </div>
    </>
  );
};
export default Navbar;
