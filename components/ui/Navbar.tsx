import NextLink from 'next/link'
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material"
import { ClearOutlined, SearchOutlined, ShoppingCartCheckoutOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { UiContext } from '@/context'

export const Navbar = () => {
  const {pathname:path,push}= useRouter()
  const {toggleSideMenu}=useContext(UiContext)

    const [searchTerm, setSearchTerm] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false)

    const onSearchTerm=()=>{
        if(!searchTerm.trim().length) return 
        push(`/search/${searchTerm}`)
    }
  
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
        <Box sx={{display: isSearchVisible?'none':{xs:'none',sm:'block'}}}
          className='fadeIn'
        >
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
        
        
        {
          isSearchVisible
            ? <Input
                  sx={{display:{xs:'none',sm:'flex'}}}
                  autoFocus
                  value={searchTerm}
                  onChange={e=>setSearchTerm(e.target.value)}
                  onKeyUp={e=>e.key==='Enter'?onSearchTerm():null}
                  type='text'
                  placeholder="Buscar..."
                  endAdornment={
                      <InputAdornment position="end">
                          <IconButton
                            onClick={()=>setIsSearchVisible(false)}
                          >
                            <ClearOutlined />
                          </IconButton>
                      </InputAdornment>
                  }
              />
            :
            <IconButton 
            sx={{display:{xs:'none',sm:'flex'}}}
              onClick={()=>setIsSearchVisible(true)}
              className='fadeIn'
            >
              <SearchOutlined/>
            </IconButton>
        }
        
        <IconButton
          sx={{display:{xs:'flex',sm:'none'}}}
          onClick={toggleSideMenu}
        >
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
