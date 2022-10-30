import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, styled, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomButtons from './CustomButtons';
import Search from './Search';
import { Menu } from '@mui/icons-material';
import AmfashionLogoImg from "../images/AmfashionLogoImg.png"

const StyledHeader = styled(AppBar)`
    background: #ffcd4f;
    height: 70px;
`;
const Component = styled(Link)`
    margin-left: 2%;
    line-height: 0;
    color: #FFFFFF;
    text-decoration: none;
`;

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block'
  }
}));

const CustomButtonWrapper = styled(Box)(({ theme }) => ({
  margin: '0 5% 0 auto',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));


const Header = () => {
  const logoURL = AmfashionLogoImg.png;


  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }
  const handleOpen = () => {
    setOpen(true);
  }

  const list = () => (
    <Box style={{ width: 250 }} onClick={handleClose}>
      <List>
        <listItem button>
          <CustomButtons />
        </listItem>
      </List>
    </Box>
  );


  return (
    <StyledHeader>
      <Toolbar style={{ minHeight: 70 }}>
        <MenuButton
          color="inherit"
          onClick={handleOpen}
        >
          <Menu />
        </MenuButton>
        <Drawer open={open} onClose={handleClose}>
          {list()}
        </Drawer>
        <Component to='/'>
          <img src={AmfashionLogoImg} alt="none" style={{ height: '60px',
          width:' 190px',
          margin: '5px',}} />
        </Component>
        <Search />
        <CustomButtonWrapper>
          <CustomButtons />
        </CustomButtonWrapper>
      </Toolbar>
    </StyledHeader>
  )
}

export default Header
