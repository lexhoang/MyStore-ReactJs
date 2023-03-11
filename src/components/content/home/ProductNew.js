import { Container, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { NavLink } from 'react-router-dom';


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function ProductNew() {
  const dispatch = useDispatch();
  const { allProduct, nameProduct } = useSelector((reduxData) => reduxData.taskReducer);

  const fetchAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect((data) => {
    if (nameProduct === "") {
      fetchAPI(`https://my-store-node-js.vercel.app/products/?limit=8`)
        .then((data) => {
          dispatch({
            type: "ALL_PRODUCT",
            setProducts: data.data,
          });
          console.log(data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      fetchAPI(`https://my-store-node-js.vercel.app/products/?name=${nameProduct}`)
        .then((data) => {
          dispatch({
            type: "ALL_PRODUCT",
            setProducts: data.data,
          });
          console.log(data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [nameProduct]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <Container>
      {/* ////////  * PRODUCT *    ////////////// */}
      <Grid item xs={12} mt={16} p={2}>
        <div className="header">
          <h5 className="title">
            <b>Sản phẩm mới</b>
          </h5>
        </div>
        {/* <Typography variant="h4" className="text-center"><b>Sản phẩm mới</b></Typography> */}
      </Grid>
      <Grid container>
        {allProduct.map((product, index) => {
          return (
            <Grid item xs={12} lg={3} md={3} sm={6} mb={3} p={4} key={index}>
              <NavLink to={product._id} style={{ textDecoration: "none" }}>
                <div className="home-card">
                  {/* <Card> */}
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      width="100%"
                      image={product.imageUrl}
                      alt="green iguana"
                      className="img-card"
                    />
                    <CardContent>
                      <Typography
                        variant="body1"
                        component="div"
                        className="name-product"
                        style={{ height: "60px", color: "#000", fontSize: "18px" }}
                        align="center"
                      >
                        <b>{product.name}</b>
                      </Typography>

                      <Typography
                        variant="body2"
                        component="div"
                        className="name-product"
                        style={{ color: "#000", opacity: "0.5" }}
                        align="center"
                      >
                        <b>{product.description}</b>
                      </Typography>

                      <Typography
                        variant="h6"
                        color="text.secondary"
                        mt={1}
                        align="center"
                      >
                        <b>Giá cũ:</b> <strike><b>${numberWithCommas(product.buyPrice)}</b></strike>
                      </Typography>
                      <Typography variant="h6" align="center" sx={{ color: "red" }}>
                        <b>  Giá mới: ${numberWithCommas(product.promotionPrice)}</b>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {/* </Card> */}
                </div>
              </NavLink>
            </Grid>
          );
        })}
      </Grid>

      <Grid item xs={12} style={{ textAlign: "center" }}>
        <NavLink to="/products" style={{ textDecoration: "none" }}>
          <button
            // variant="contained"
            className="custom-btn btn-newProduct"
          ><span>Show All</span>
          </button>
        </NavLink>
      </Grid>
    </Container>
  );
}

export default ProductNew;
