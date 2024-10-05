import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Modal,
  Select,
  notification,
} from "antd";
import { useEffect } from "react";
import { ShoppingCartOutlined, PlusOutlined } from "@ant-design/icons";
import {
  fetchAllCategories,
  fetchAllProducts,
  updateProduct,
  addProduct,
} from "../api/productApi";

const { Meta } = Card;

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [selectedProductId, setSelectProductId] = useState("");
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [basketData, setBasketData] = useState([]);
  const [addProduct, setAddProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  const [selectedProduct, setSelectedProduct] = useState({
    // Güncelleme yapmak için seçilen ürün backend den çekilecek
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  const [form] = Form.useForm();
  useEffect(() => {
    //backend kısmını tamamlayamadığım için front kısmına fake api den data çekip bastım geçici olarak
    const data = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        console.log("response:::", response);
        const result = await response.json();
        console.log("result::", result);
        setProductsData(result);
      } catch (error) {
        console.log("error");
      }
    };
    data();
  }, []);

  useEffect(() => {
    AllProducts();
    AllCategories();
  }, []);
  const AllProducts = async () => {
    try {
      const allProducts = await fetchAllProducts();
      // setProductsData(allProducts);
    } catch (error) {
      notification.error({ message: error });
    }
  };
  const AllCategories = async () => {
    try {
      const allCategories = await fetchAllCategories();
      //(allCategories);
    } catch (error) {
      notification.error({ message: error });
    }
  };

  const showModal = () => {
    setOpen(true);
  };
  const showAddProductModal = () => {
    setAddOpen(true);
  };

  const handleUpdateOk = async () => {
    console.log("güncelleme");
    try {
      //selectedProductId id yi dolu gönder
      await updateProduct(selectedProductId, selectedProduct);
      AllProducts(); //Ürün Listesi Güncelleme
      setOpen(false);

      notification.success({ message: "Güncelleme işlemi başarılı" });
    } catch (error) {
      notification.error({ error });
    }
  };

  const handleOk = async () => {
    try {
      await addProduct(addProduct);
      notification.success({ message: "Yeni Ürün eklendi." });
      AllProducts(); //Ürün Listesi Güncelleme
      setAddOpen(false);
    } catch (error) {
      notification.error({ error });
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setAddOpen(false);
    form.resetFields();
  };

  return (
    <div style={{ marginTop: "5px" }}>
      <Modal
        open={open}
        onCancel={handleCancel}
        width={850}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Vazgeç
          </Button>,
          <Button type="primary" key="ok" onClick={handleUpdateOk}>
            Güncellemeyi Kaydet
          </Button>,
        ]}
      >
        <div style={{ height: "250px" }}>
          <h2 style={{ color: "#6c757d " }}>Ürün Güncelleme</h2>
          <Form>
            <div
              style={{
                marginTop: "50px",
              }}
            >
              <label
                style={{
                  fontSize: "15px",
                  marginRight: "10px",
                  marginTop: "200px",
                  color: "#6c757d",
                }}
              >
                Ürün İsmi:
              </label>

              <Input
                style={{ width: "300px", height: "40px" }}
                placeholder="Ürün İsmi giriniz"
                name="updatedTitle"
                onChange={(e) => {
                  setSelectedProduct({
                    ...selectedProduct,
                    title: e.target.value,
                  });
                }}
              ></Input>
              <label
                style={{
                  fontSize: "15px",
                  marginRight: "10px",
                  marginLeft: "30px",
                  color: "#6c757d",
                }}
              >
                Fiyat:
              </label>

              <Input
                style={{ width: "300px", height: "40px", marginRight: "40px" }}
                name="updatedPrice"
                type="number"
                placeholder="Fiyat giriniz"
                onChange={(e) => {
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  });
                }}
              ></Input>
            </div>
            <div>
              <label
                style={{
                  fontSize: "15px",
                  marginRight: "12px",
                  marginLeft: "5px",
                  color: "#6c757d",
                }}
              >
                Kategori:
              </label>
              <Select
                placeholder="Kategori Seçiniz"
                style={{ width: "300px", marginTop: "20px", height: "40px" }}
              >
                {/* categories dolu olmadığı için hata veriyor o nedenle şimdilik kapattım */}
                {/* {categories.map((option) => (
                  <Option key={option?.id} value={option?.name}>
                    {option?.name}
                  </Option>
                ))} */}
              </Select>
              <label
                style={{
                  fontSize: "15px",
                  marginRight: "5px",
                  marginLeft: "10px",
                  marginTop: "200px",
                  color: "#6c757d",
                }}
              >
                Resim Url:
              </label>

              <Input
                style={{ width: "300px", height: "40px" }}
                placeholder="Resim Url giriniz"
                name="updatedImage"
                onChange={(e) => {
                  setSelectedProduct({
                    ...selectedProduct,
                    image: e.target.value,
                  });
                }}
              ></Input>
            </div>

            <label
              style={{
                fontSize: "15px",
                marginRight: "10px",
                marginLeft: "5px",
                color: "#6c757d",
              }}
            >
              Açıklama:
            </label>

            <Input
              style={{ width: "680px", height: "40px", marginTop: "20px" }}
              placeholder="Açıklama giriniz"
              name="updatedDescription"
              onChange={(e) => {
                setSelectedProduct({
                  ...selectedProduct,
                  description: e.target.value,
                });
              }}
            ></Input>
          </Form>
        </div>
      </Modal>
      <Modal
        open={addOpen}
        onCancel={handleCancel}
        width={850}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Vazgeç
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            Kaydet
          </Button>,
        ]}
      >
        <div style={{ height: "250px" }}>
          <h2 style={{ color: "#6c757d " }}>Ürün Ekleme</h2>
          <Form>
            <div
              style={{
                marginTop: "50px",
              }}
            >
              <label
                style={{
                  fontSize: "15px",
                  marginRight: "10px",
                  marginTop: "200px",
                  color: "#6c757d",
                }}
              >
                Ürün İsmi:
              </label>
              <Input
                style={{ width: "300px", height: "40px" }}
                placeholder="Ürün İsmi giriniz"
                name="addTitle"
                onChange={(e) => {
                  setAddProduct({ ...addProduct, title: e.target.value });
                }}
              ></Input>
              <label
                style={{
                  fontSize: "15px",
                  marginRight: "10px",
                  marginLeft: "30px",
                  color: "#6c757d",
                }}
              >
                Fiyat:
              </label>
              <Input
                style={{ width: "300px", height: "40px" }}
                name="addPrice"
                type="number"
                placeholder="Fiyat giriniz"
                onChange={(e) => {
                  setAddProduct({ ...addProduct, price: e.target.value });
                }}
              ></Input>
            </div>
            <div>
              <label
                style={{
                  fontSize: "15px",
                  marginRight: "12px",
                  marginLeft: "5px",
                  color: "#6c757d",
                }}
              >
                Kategori:
              </label>
              <Select
                placeholder="Kategori Seçiniz"
                style={{ width: "300px", marginTop: "20px", height: "40px" }}
              >
                {/* categories dolu olmadığı için hata veriyor o nedenle şimdilik kapattım */}
                {/* {categories.map((option) => (
                  <Option key={option?.id} value={option?.name}>
                    {option?.name}
                  </Option>
                ))} */}
              </Select>
              <label
                style={{
                  fontSize: "15px",
                  marginRight: "5px",
                  marginLeft: "10px",
                  marginTop: "200px",
                  color: "#6c757d",
                }}
              >
                Resim Url:
              </label>

              <Input
                style={{ width: "300px", height: "40px" }}
                placeholder="Resim Url giriniz"
                name="addImage"
                onChange={(e) => {
                  setAddProduct({
                    ...addProduct,
                    image: e.target.value,
                  });
                }}
              ></Input>
            </div>

            <label
              style={{
                fontSize: "15px",
                marginRight: "10px",
                marginLeft: "5px",
                color: "#6c757d",
              }}
            >
              Açıklama:
            </label>
            <Input
              style={{ width: "680px", height: "40px", marginTop: "20px" }}
              name="addDescription"
              placeholder="Açıklama giriniz"
              onChange={(e) => {
                setAddProduct({ ...addProduct, description: e.target.value });
              }}
            ></Input>
          </Form>
        </div>
      </Modal>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={showAddProductModal}
          style={{ marginLeft: "1250px", marginTop: "20px", height: "40px" }}
        >
          <PlusOutlined /> Yeni Ürün ekle
        </Button>
      </div>

      <div
        style={{ marginTop: "50px", marginLeft: "20px", marginRight: "20px" }}
      >
        <Row gutter={16}>
          {productsData.map((card, index) => (
            <Col span={8} key={index} style={{ marginBottom: "20px" }}>
              <Card
                style={{
                  height: "450px",
                  overflow: "hidden",
                  backgroundColor: "#EAECEE",
                }}
                cover={
                  <img
                    alt="example"
                    src="https://via.placeholder.com/150"
                    style={{ height: "200px" }}
                  />
                }
              >
                <Meta
                  style={{
                    marginBottom: "20px",
                    maxHeight: "100px",
                    textOverflow: "ellipsis",
                  }}
                  title={card.title}
                  description={card.description}
                />
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <p style={{ fontSize: "15px" }}>
                    <b>Price:</b>
                    {card.price}$
                  </p>
                  <div style={{ display: "flex" }}>
                    <Button
                      style={{
                        marginTop: "5px",
                        marginLeft: "150px",
                        height: "40px",
                        // onClick={addBasket}
                      }}
                      icon={<ShoppingCartOutlined />}
                    >
                      Sepete Ekle
                    </Button>
                    <Button
                      onClick={showModal}
                      style={{
                        marginTop: "5px",
                        marginLeft: "15px",
                        height: "40px",
                        width: "100px",
                      }}
                    >
                      Güncelle
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Products;
