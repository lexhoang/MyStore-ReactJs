import { Container, Grid, CardActionArea, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { NavLink } from 'react-router-dom';


import { useEffect } from "react";
import { useState } from "react";


function ProductHot() {
  const [productHot, setProductHot] = useState([]);

  const fetchAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchAPI("https://my-store-nodejs-999.herokuapp.com/products/?limit=4&skip=8")
      .then((data) => {
        setProductHot(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <Container>
      {/* ////////  * PRODUCT *    ////////////// */}
      <Grid item xs={12} mt={12} mb={4} p={2} >
        <Typography variant="h4" className="text-center"><b>Sản phẩm nổi bật</b></Typography>
      </Grid>
      <Grid container>
        {productHot.map((product, index) => {
          return (
            <Grid item xs={12} lg={3} md={3} sm={6} mb={3} p={5} key={index}>
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
                        mt={3}
                        align="center"
                      >
                        <b>Giá cũ:</b> <strike><b>${numberWithCommas(product.buyPrice)}</b></strike>
                      </Typography>
                      <Typography variant="h6" align="center" sx={{ color: "red" }}>
                        Giá mới: <b>${numberWithCommas(product.promotionPrice)}</b>
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
            className="custom-btn btn-showAll"
          >
            <span>Click!</span><span>Show All</span>
          </button>
        </NavLink>
      </Grid>
    </Container>
  );
}

export default ProductHot;
