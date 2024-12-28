import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 240;
const navItems = ['Home', 'Login', 'Signup'];

export default function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ₹Pay
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <b>₹Pay</b>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          <h1>Welcome to RuPay Wallet - Your Secure and Seamless Digital Wallet Solution!</h1>
          <br />
          <h3>Simplify Your Finances</h3>
          <h4>At RuPay Wallet, we're redefining the way you manage your money. Our innovative digital wallet provides a secure, convenient, and user-friendly platform to handle all your financial transactions effortlessly.</h4>

          <h2>Why Choose RuPay Wallet?: </h2>
          <h4><b>Secure Transactions: </b>With top-notch encryption and security protocols, your financial data is always protected.</h4>
          <h4><b>Fast and Convenient: </b>Send and receive money in an instant, pay bills, and make purchases without any hassle.</h4>
          <h4><b>Global Accessibility: </b>Whether you're at home or abroad, RuPay Wallet keeps you connected to your finances.</h4>
          <h4><b>User-Friendly Interface: </b>Our intuitive design ensures that even first-time users can navigate the app with ease.</h4>
          <h4><b>Rewards and Offers: </b>Enjoy exclusive deals and cashback rewards every time you use RuPay Wallet.</h4>

          <hr />

          <div style={{textAlign: 'center'}}>
            <h3>Get Started Today!</h3>
            <p>Join thousands of satisfied users who trust RuPay Wallet for their daily financial needs. Download the app now and experience the future of digital payments.</p>
        </div>
        </Typography>
      </Box>
    </Box>
  );
}

// DrawerAppBar.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };


