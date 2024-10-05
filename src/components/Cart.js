import React, { useState } from "react";
import { Row, Col, Card, Button } from "antd";
import { useEffect } from "react";

const Cart = () => {
  const { Meta } = Card;
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const data = async () => {
      try {
        //backend kısmını tamamlayamadığım için front kısmında geçici olarak data çekip bastım
        const response = await fetch("https://fakestoreapi.com/products");
        const result = await response.json();
        console.log("result::", result);
        setProductData(result);
      } catch (error) {
        console.log("error");
      }
    };
    data();
  }, []);
  return (
    <div>
      <p style={{ fontSize: "24px", color: "#424949" }}>
        <b>SEPETİM </b>
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          height: 500,
          width: "1500px",
          overflowY: "scroll",
        }}
      >
        <Row>
          {productData.map((card, index) => (
            <Col key={index} style={{ marginBottom: "16px" }}>
              <Card
                style={{
                  width: "1200px",
                  height: "300px",
                  borderRadius: "20px",
                  marginLeft: "200px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ marginTop: "40px" }}
                    alt="example"
                    src="https://via.placeholder.com/150"
                  />
                  <Meta
                    style={{
                      marginLeft: "200px",
                      width: "500px",
                      height: "200px",
                      paddingTop: "50px",
                    }}
                    title={card.title}
                    description={card.description}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "10px",
                    marginLeft: "500px",
                  }}
                >
                  <p style={{ fontSize: "15px" }}>
                    <b>Price:</b>
                    {card.price}$
                  </p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "20px",
        }}
      >
        <p style={{ fontSize: "20px", paddingTop: "10px", marginTop: "75px" }}>
          {/* Toplam değeri hesaplamak için function yaz */}
          Toplam:898989
        </p>
        <Button
          style={{
            marginLeft: "20px",
            marginTop: "75px",
            width: "200px",
            height: "50px",
          }}
        >
          Siparişi Onayla
        </Button>
      </div>
    </div>
  );
};

export default Cart;
