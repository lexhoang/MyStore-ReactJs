import { Container, Grid, Typography, Button, Rating, Modal, Box } from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

// import { useDispatch, useSelector } from "react-redux"

function ProductDetail() {
  //Link đến trang theo ID
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState({});

  // const { use } = useSelector((reduxData) => reduxData.taskReducer);
  // const dispatch = useDispatch();

  //Tính tiền
  const [quantity, setQuantity] = useState(1);
  const [bill, setBill] = useState(1);

  const minusQuantity = () => {
    setQuantity(quantity === 1 ? 1 : quantity - 1);
  };

  const plusQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Load API
  const fetchAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const btnAddCart = () => {
    let newSelect = {
      product: productId,
      quantity: quantity,
      info: productInfo
    }
    let orderList = JSON.parse(localStorage.getItem("orderList")) || [];

    if (orderList.length >= 1) {
      const productExit = orderList.find(element => element.product == newSelect.product);

      if (Boolean(productExit)) {
        productExit.quantity += newSelect.quantity
      }
      else {
        orderList.push(newSelect);
      }
    }
    else {
      console.log("false")
      orderList.push(newSelect);
    }
    console.log(orderList);

    localStorage.setItem("orderList", JSON.stringify(orderList));
    setOpen(true)
  };

  //Modal xác nhận đơn hàng
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    // navigate(`/products/${productId}`)
    window.location.reload();
  }

  useEffect(() => {
    fetchAPI("http://localhost:8000/products/" + productId)
      .then((data) => {
        // console.log(data);
        // console.log(data.data);
        setProductInfo(data.data);

        //Tính tiền
        // console.log("productInfo.promotionPrice:", data.data.promotionPrice)
        setBill(quantity === 0 ? 0 : quantity * data.data.promotionPrice);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [quantity]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }



  return (
    <Container style={{ backgroundColor: "#ffffff" }}>
      <Grid container mt={5} p={3}>
        <Grid item xs={12} lg={6} md={6} sm={6} className="animate__animated animate__fadeInUp">
          <img
            src={productInfo.imageUrl}
            style={{ width: "80%", borderRadius: "14px" }}
            className="img-card"
          />
        </Grid>

        <Grid item xs={12} md={6} sm={6} lg={6} className="animate__animated animate__fadeInUp animate__delay-1s">
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5">
                <b>{productInfo.name}</b>
              </Typography>
            </Grid>
          </Grid>

          <Grid container mt={3}>
            <Grid item xs={12}>
              <Rating
                name="half-rating-read"
                defaultValue={5}
                precision={0.5}
                readOnly
              />
            </Grid>
          </Grid>

          <Grid container mt={5}>
            <Grid item xs={12}>
              <Typography variant="h6">
                <b>Giá cũ:</b> <strike>
                  <b style={{ opacity: 0.7 }}>${productInfo.buyPrice}</b>
                </strike>
              </Typography>
            </Grid>
          </Grid>

          <Grid container mt={1}>
            <Grid item xs={12}>
              <Typography variant="h5">
                <b style={{ color: "red" }}>Giá mới: ${(productInfo.promotionPrice)}</b>
              </Typography>
            </Grid>
          </Grid>

          <Grid container mt={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                <b style={{ color: "#009688" }}>Số lượng: {productInfo.amount} sản phẩm</b>
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} mt={5}>
            <Grid container>
              <Grid item xs={12} md={3} sm={6} lg={3}>
                <Grid container>
                  <Grid item xs={3} align="right">
                    <Typography variant="h5" mt={2}>
                      {quantity}
                    </Typography>
                  </Grid>

                  <Grid item xs={9} sm={6}>
                    <Grid item xs={12} sm={6}>
                      <Button onClick={plusQuantity} size="small">
                        <AddCircleIcon />
                      </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Button onClick={minusQuantity} size="small">
                        <RemoveCircleIcon />
                      </Button>
                    </Grid>

                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} lg={9} sm={4} md={9} mt={1}>
                <Button variant="contained" color="warning" onClick={btnAddCart}>
                  <b>Add to cart</b>
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item p={1} mt={2} mb={5} xs={12} md={6} lg={6} sm={12}
            style={{
              color: "white",
              backgroundColor: "#009688",
              borderRadius: "10px",
            }}
          >
            <Typography align="center" variant="body1">
              <MonetizationOnIcon /> <b>Thành tiền:</b>
              &nbsp; <b>${numberWithCommas(bill)}</b>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container mt={8} className="p-3" style={{ borderRadius: "14px", backgroundColor: "#f4f5fb" }}>
        <Grid item xs={12}>
          <Typography variant="h5">
            <b>Description</b>
          </Typography>
        </Grid>

        <Grid item xs={12} lg={8} sm={12} md={8} mt={2} pb={5}>
          <Typography variant="body1">{productInfo.description}</Typography>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-detail text-center">
          <Typography variant="h6" className="mt-3">
            Bạn đã thêm thành công sản phẩm vào giỏ hàng
          </Typography>

          <Button onClick={handleClose} variant="contained" className="mt-5">OK</Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default ProductDetail;
