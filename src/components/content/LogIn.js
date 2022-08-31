import { Grid, Typography, Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import GoogleIcon from '@mui/icons-material/Google';

import { auth, googleProvider } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LogInContent() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const loginGoogle = () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                console.log(result);
                setUser(result.user);
                navigate("/");
            })
    }


    return (
        <div>
            <Container>
                <Typography variant="h6">
                    <Link to="/">No Login</Link>
                </Typography>
            </Container>

            <Grid container className="d-flex justify-content-center align-items-center" style={{ marginTop: "30px" }}>
                <Grid item xs={5} className=" mx-auto text-center p-5" style={{ backgroundColor: "#dee6e9" }}>
                    <div className="p-5" style={{ backgroundColor: "white", borderRadius: "8px" }}>
                        <Grid container className="d-flex align-items-center justify-content-center">
                            <Grid item xs={12} mb={5}>
                                <Button variant="contained" className="w-100 p-2"
                                    style={{ backgroundColor: "#ec407a", color: "white", borderRadius: "32px" }}
                                    onClick={loginGoogle}
                                >
                                    <GoogleIcon style={{ marginRight: "8px" }} /> Sign in with  <b style={{ marginLeft: "6px", fontSize: "18px" }}> Google</b>
                                </Button>
                            </Grid>
                        </Grid>

                        <hr></hr>

                        <div className="d-flex align-items-center justify-content-center mx-auto"
                            style={{
                                width: "40px", height: "40px", borderRadius: "50%", border: "1px solid black",
                                marginTop: "-35px", backgroundColor: "#000000", color: "white"
                            }}>
                            <Typography variant="h6">or</Typography>
                        </div>

                        <Grid container mt={5}>
                            <Grid item xs={12}>
                                <TextField size="small" fullWidth label="Username" variant="outlined" />
                            </Grid>
                        </Grid>

                        <Grid container mt={3}>
                            <Grid item xs={12}>
                                <TextField size="small" fullWidth label="Password" variant="outlined" />
                            </Grid>
                        </Grid>

                        <Grid container className="d-flex align-items-center justify-content-center mt-4">
                            <Grid item xs={12}>
                                <Button variant="contained" className="w-100 p-2" color="success"
                                    style={{ borderRadius: "32px" }}>
                                    <b style={{ fontSize: "18px" }}>Sign in</b>
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    <Grid container mt={3}>
                        <Grid item xs={12}>
                            <Typography>Don't have an account? <a href="/" style={{ color: "#67bc75", textDecoration: "none" }}>Sign up here</a></Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>

    )
}

export default LogInContent;