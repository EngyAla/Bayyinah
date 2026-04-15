import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Stack, styled, useTheme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Link } from 'react-router-dom';
import { useAuth } from "../pages/Context/AuthContext"


    const drawerWidth = 240;
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
        })(({ theme }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        variants: [
            {
            // @ts-ignore
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
                }),
            },
            },
        ],
        }));


const TopBar = ({open, handleDrawerOpen, setMode}) => {
    const theme = useTheme()
    const auth = useAuth();
    const handelLogOut = ()=>{
        auth.logout()
    }
    return (
        <AppBar position="fixed" 
        // @ts-ignore
        open={open}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                {
                    marginRight: 5,
                },
                open && { display: 'none' },
                ]}
            >
            <MenuIcon />
            </IconButton>
            <Link to={'/'} className='site_title_link'>
            <Typography variant="h4" fontSize={'2.5vw'} noWrap component="div" className='site_title' style={{fontFamily: "Dancing Script", fontWeight: "700",color:'#fff'}}>
                Bayyinah 
            </Typography>
            </Link>
            <Box sx={{ flexGrow: { xs: 0, sm: 0, lg: 1 }, }} />
            <Stack direction={"row"} display={"flex"} alignItems={"center"} justifyContent={"center"} flexWrap={'wrap'} >
            {
                theme.palette.mode == "light" ? 
                (<IconButton aria-label="light_mood" color="inherit" onClick={() => 
                    {
                        setMode(theme.palette.mode === "light" ? "dark" : "light")
                        // toggle the theme
                        localStorage.setItem("currentMood", theme.palette.mode === "dark" ? "light": "dark")
                    }
                }>
                    <LightModeOutlinedIcon />
                </IconButton>) :
                (<IconButton aria-label="dark_mood" color="inherit" onClick={() =>
                    {
                        setMode(theme.palette.mode === "light" ? "dark" : "light")
                        localStorage.setItem("currentMood", theme.palette.mode === "dark" ? "light": "dark")
                    }
                }>
                    <BedtimeOutlinedIcon />
                </IconButton>)
            }
            <IconButton aria-label="LanguageIcon" color='inherit' size="large">
                <LanguageIcon />
            </IconButton>
            <IconButton aria-label="SettingsIcon" color='inherit' size="large">
                <SettingsIcon />
            </IconButton>
            
            {!auth.user ?
            <Link to={"/auth"}>
                <button className='topBar_btn'>SignUp</button>
            </Link> :
            <Link to={"/auth"}>
                <button className='topBar_btn' onClick={handelLogOut}>LogOut</button>
            </Link>
            }
            </Stack>
            </Toolbar>
        </AppBar>
        
    );
    }


export default TopBar;