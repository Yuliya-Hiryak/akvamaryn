import { Backdrop, CircularProgress } from "@mui/material";


const BackdropCircular = ({ loading, title = '' }) => {
  return (
    <Backdrop open={loading}>
      <p>{title}</p>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropCircular;
