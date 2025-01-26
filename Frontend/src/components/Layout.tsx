import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Grid,
  Link,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import referralImage from '../assets/referral.jpg';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <List>
      {user ? (
        <>
          <ListItem button onClick={() => handleNavigation('/referrals')}>
            <ListItemText primary="Referrals" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      ) : (
        <ListItem button onClick={() => handleNavigation('/login')}>
          <ListItemText primary="Login" />
        </ListItem>
      )}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: '#E0DADD',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: theme.palette.primary.main,
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onClick={() => handleNavigation('/')}
          >
            Referral Connect
          </Typography>
          {!isMobile && user && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                color="primary"
                onClick={() => handleNavigation('/referrals')}
                sx={{
                  borderColor: 'black',
                  color: 'black',
                  border: '1px solid',
                  padding: '6px 16px',
                  borderRadius: '8px',
                }}
              >
                Candidates
              </Button>
              <Button
                color="primary"
                onClick={handleLogout}
                sx={{
                  borderColor: 'black',
                  color: 'black',
                  border: '1px solid',
                  padding: '6px 16px',
                  borderRadius: '8px',
                }}
              >
                Logout
              </Button>


            </Box>
          )}
          {!isMobile && !user && (
            <Button color="primary" onClick={() => handleNavigation('/login')} sx={{
              borderColor: 'black',  
              color: 'black',        
              border: '1px solid',   
              padding: '6px 16px',   
              borderRadius: '4px',   
            }}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
          width: "100vw",
          backgroundColor: theme.palette.background.default,
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${referralImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          p: 2,
        }}
      >
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          py: 4,
          px: 2,
          mt: 'auto',
          backgroundColor: '#E0DADD',
          color: 'Black',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} >
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                About Us
              </Typography>
              <Typography variant="body2" color="inherit" paragraph>
                We are a leading referral portal that connects top talent with great opportunities. Refer, track, and manage your referrals with ease.
              </Typography>
              <Link href="/about" color="inherit" underline="hover">
                Learn More
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Contact
              </Typography>
              <Typography variant="body2" color="inherit" paragraph>
                Email: <Link href="mailto:support@referralportal.com" color="inherit">support@referralportal.com</Link>
              </Typography>
              <Typography variant="body2" color="inherit">
                Phone: +123 456 7890
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'start', gap: 1 }}>
                <IconButton
                  component="a"
                  href="https://github.com"
                  target="_blank"
                  rel="noopener"
                  color="inherit"
                  aria-label="GitHub"
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener"
                  color="inherit"
                  aria-label="LinkedIn"
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener"
                  color="inherit"
                  aria-label="Twitter"
                >
                  <Twitter />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" color="inherit">
              Referral Connect @ {new Date().getFullYear()} | All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
