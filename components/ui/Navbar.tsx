import NextLink from 'next/link'
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material"
import { SearchOutlined, ShoppingCartCheckoutOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { UiContext } from '@/context'

export const Navbar = () => {
  const {pathname:path}= useRouter()
  const {toggleSideMenu}=useContext(UiContext)
  
  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref legacyBehavior>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography sx={{ml:0.5}}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1}/>
        <Box sx={{display:{xs:'none',sm:'block'}}}>
          <NextLink href='/category/men' passHref legacyBehavior>
            <Link >
              <Button color={path==='/category/men'?'primary':'info'}>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' passHref legacyBehavior>
            <Link >
              <Button color={path==='/category/women'?'primary':'info'}>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kid' passHref legacyBehavior>
            <Link >
              <Button color={path==='/category/kid'?'primary':'info'}>Niños</Button>
            </Link>
          </NextLink>

        </Box>

        <Box flex={1}/>
        <IconButton>
          <SearchOutlined/>
        </IconButton>

        <NextLink href='/cart' passHref legacyBehavior>
          <Link >
          <IconButton>
            <Badge badgeContent={2} color='secondary'>
              <ShoppingCartCheckoutOutlined/>
            </Badge>
          </IconButton>
          </Link>
        </NextLink>
        <Button
        onClick={toggleSideMenu}
        >Menú</Button>
      </Toolbar>
    </AppBar>
  )
}
