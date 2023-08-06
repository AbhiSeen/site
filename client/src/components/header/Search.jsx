import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, List, ListItem, Box, styled } from '@mui/material';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'; 
import { getProducts as listProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';


const SearchContainer = styled(Box)`
  border-radius: 4px;
  margin-left: 10px;
  width: 35vw;
  background-color: #fff;
  border: 1px solid rgb(104, 85, 224);
  border-left:8px solid rgb(104, 85, 224);
  display: flex;
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: #fff;
  background: rgb(104, 85, 224);
`;

const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #FFFFFF;
  margin-top: 36px;
`;

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
`;

const Search = () => {
  const [ text, setText ] = useState();
    const [ open, setOpen ] = useState(true)

    const getText = (text) => {
        setText(text);
        setOpen(false)
    }

    const {products} = useSelector(state => state.getProducts);

    const dispatch = useDispatch();

    useMemo(() => dispatch(listProducts()), [])

  return (
    <SearchContainer>
      <InputSearchBase
        placeholder="Search for products, brands and more"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => getText(e.target.value)}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      {
        text &&
        <ListWrapper hidden={open}>
          {
            products.filter(product => product.name.toLowerCase().includes(text.toLowerCase())).map(product => (
              <ListItem>
                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  onClick={() => setOpen(true)}
                >
                  {product.name}
                </Link>
              </ListItem>
            ))
          }
        </ListWrapper>
      }
    </SearchContainer>
  )
}

export default Search;





