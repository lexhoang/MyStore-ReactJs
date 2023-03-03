import { Container, Grid, Button, Typography } from '@mui/material';
import introduce from "../../../assets/images/introduce.jpg";

function Introduce() {

    return (
        <div style={{ background: "linear-gradient(to bottom, #fff, #26a69a)" }}>
            <Grid container mt={18} className="mx-auto d-flex justify-content-center align-items-center">
                <Grid item lg={6} md={6} sm={12} xs={12} mb={3} p={8}>
                    <Typography variant="h4">
                        <b>ĐỒNG HỒ CỦA CHÚNG TÔI ĐƯỢC CHẾ TẠO VỚI MÀN HÌNH LƯU Ý ĐẾN CHI TIẾT.</b>
                    </Typography>

                    <Typography variant="h6" mt={2}>
                        Khám phá bộ sưu tập đồng hồ uy tín, độ chính xác cao.
                        Chúng tôi cung cấp nhiều loại đồng hồ phù hợp với mọi cổ tay.
                        Khám phá nhiều lựa chọn đồng hồ để tìm ra sự kết hợp hoàn hảo giữa phong cách và chức năng.
                    </Typography>
                    <Grid item lg={12} mt={5}>
                        <div className="btn-introduce"><a href="/products">Learn more</a></div>
                    </Grid>
                </Grid>

                <Grid item lg={2} md={2} sm={12} xs={12}> </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <img src={introduce} width="100%" />
                </Grid>
            </Grid>
        </div>
    )
}

export default Introduce;