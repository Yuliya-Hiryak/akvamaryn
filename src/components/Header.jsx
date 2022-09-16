import {
  AppBar,
  Toolbar,
  Typography,
  Container
} from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{mb: 5}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DermPro
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header;