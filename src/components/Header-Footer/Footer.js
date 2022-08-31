import { Container, Grid, Typography, Link } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  const title = [
    "Help Center",
    "Contact Us",
    "Product Help",
    "Warranty",
    "Order Status",
  ];

  return (
    // /* ///////           FOOTER     ///////// */
    <div style={{ marginTop: "80px", backgroundColor: "#f5f5f5" }}>
      <Container className="pt-5 pb-5" sx={{ backgroundColor: "#f5f5f5" }}>
        <Grid container>
          <Grid item xs={6} lg={3} md={3} sm={3}>
            <Typography variant="h6">
              <b>PRODUCTS</b>
            </Typography>
            {title.map(function (element, index) {
              return (
                <Grid item xs={12} key={index}>
                  <Typography variant="caption">{element}</Typography>
                </Grid>
              );
            })}
          </Grid>

          <Grid item xs={6} lg={3} md={3} sm={3}>
            <Typography variant="h6">
              <b>SERVICES</b>
            </Typography>
            {title.map(function (element, index) {
              return (
                <Grid item xs={12} key={index}>
                  <Typography variant="caption">{element}</Typography>
                </Grid>
              );
            })}
          </Grid>

          <Grid item xs={6} lg={3} md={3} sm={3}>
            <Typography variant="h6">
              <b>SUPPORT</b>
            </Typography>
            {title.map(function (element, index) {
              return (
                <Grid item xs={12} key={index}>
                  <Typography variant="caption">{element}</Typography>
                </Grid>
              );
            })}
          </Grid>

          <Grid item xs={6} lg={3} md={3} sm={3} align="center" className="pt-4">
            <Typography variant="h4">
              <b>HEADER PHONE SHOP</b>
            </Typography>
            <Grid container className="d-flex justify-content-center mt-3">
              <Link
                href="https://www.facebook.com/"
                sx={{ mr: 2, color: "black" }}
              >
                <FacebookIcon />
              </Link>
              <Link
                href="https://www.instagram.com/"
                sx={{ mr: 2, color: "black" }}
              >
                <InstagramIcon />
              </Link>
              <Link
                href="https://www.youtube.com/"
                sx={{ mr: 2, color: "black" }}
              >
                <YouTubeIcon />
              </Link>
              <Link href="https://twitter.com/" sx={{ color: "black" }}>
                <TwitterIcon />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Footer;
