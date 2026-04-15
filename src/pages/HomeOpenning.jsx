import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, Button, styled, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import MovingIcon from '@mui/icons-material/Moving';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useSearch } from './Context/SearchContext';

const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
            width: '20ch',
            },
        },
        },
    }));
    const HomeOpening = ()=>{
    const theme = useTheme()
    const {setSearch} = useSearch();

    // console.log(search)
    return(
        <>
            <div className="home_container" style={{backgroundColor: theme.palette.background.paper}}>
                <div className='home_title'>
                    <Link to={'/'} style={{color:theme.palette.text.primary}}> 
                        <h1>Bayyinah.com</h1>
                        {/* <h1>Mishkat.com</h1> */}
                    </Link>
                    <Search className='home_search'
                    sx={{backgroundColor: theme.palette.background.default,
                        border: '1px solid rgba(108, 108, 108, 0.39)'
                    }}>
                        <SearchIconWrapper>
                        <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        inputMode='search'
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e)=> setSearch(e.target.value)}
                        />
                    </Search>
                    <div className="home_btn" style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 3}}>
                        <Button sx={{marginX: 2, fontSize: '17px'}} variant="contained" style={{textTransform: "capitalize", color:"#fff",padding:"8px 15px", minWidth:"150px" }}><MenuOpenIcon />&nbsp;Navigate Quran</Button>
                        <Button sx={{marginX: 2, fontSize: '17px'}} variant="contained" style={{textTransform: "capitalize", color: "#fff",padding:"8px 25px",minWidth:"150px" }}><MovingIcon />&nbsp;Popular</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeOpening;