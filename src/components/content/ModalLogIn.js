import { Grid, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import GoogleIcon from '@mui/icons-material/Google';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function ModalLogIn({ openModalLogIn, handleCloseModal, loginGoogle }) {

    //STYLE:
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: '#dee6e9',
        border: '3px solid #fff',
        boxShadow: 24,
        pt: 1,
        pr: 3,
        pl: 3,
        pb: 3,
    }


    return (
        <Modal open={openModalLogIn} onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid item xs={12} align="right">
                    <Button variant="contained" size="small" sx={{ backgroundColor: "gray" }} onClick={handleCloseModal}>X</Button>
                </Grid>

                <Grid item xs={5} mt={2}>
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
                            <Typography align="center">Don't have an account?
                                <a href="/" style={{ textDecoration: "none" }}>
                                    <Typography className="text-form" variant="subtitle"> Sign up here</Typography>
                                </a>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

export default ModalLogIn;