import { Container, Grid, CardActionArea, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { NavLink } from 'react-router-dom';


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function Home() {
  const dispatch = useDispatch();
  const { allProduct, nameProduct } = useSelector((reduxData) => reduxData.taskReducer);

  const fetchAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect((data) => {
    if (nameProduct === "") {
      fetchAPI(`https://my-store-nodejs-999.herokuapp.com/products/?limit=8`)
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
      fetchAPI(`https://my-store-nodejs-999.herokuapp.com/products/?name=${nameProduct}`)
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
      {/* Title */}
      <Container>
        <Grid item xs={12} mt={8} mb={4} p={2}>
          <div className="header">
            <h5 className="title">
              <b>LATEST PRODUCT</b>
            </h5>
          </div>
        </Grid>
      </Container>

      {/* ////////  * PRODUCT *    ////////////// */}
      <Container>
        <Grid container>
          {allProduct.map((product, index) => {
            return (
              <Grid item xs={12} lg={3} md={3} sm={6} mb={3} className="p-3" key={index}>
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
                          variant="body1"
                          color="text.secondary"
                          mt={1}
                          align="center"
                        >
                          <strike><b>{numberWithCommas(product.buyPrice)} VNĐ</b></strike>
                        </Typography>
                        <Typography variant="h6" align="center" sx={{ color: "red" }}>
                          <b>{numberWithCommas(product.promotionPrice)} VNĐ</b>
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
      </Container>

      <Grid item xs={12} style={{ textAlign: "center" }} mt={5}>
        <NavLink to="/products" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#000" }}
          >
            Show All
          </Button>
        </NavLink>
      </Grid>
    </Container>
  );
}

export default Home;
