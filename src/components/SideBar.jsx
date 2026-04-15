import List from '@mui/material/List';
// @ts-ignore
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, styled, Typography, useTheme } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import SideCard from './sideCard';
// @ts-ignore
import QuranIcon from '../assets/Quran.png'
// @ts-ignore
import AzkarIcon from '../assets/Azkar.png';
// @ts-ignore
import TasbihIcon from '../assets/Tasbih.png';
// @ts-ignore
import PrayerIcon from '../assets/Prayer.png';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    }));

    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        });
        
        const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
        });
        
        const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            variants: [
            {
                props: ({ open }) => open,
                style: {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
            ],
        }),
        );

        const arr1 = [
            {
                "text": "Quran",
                "icon": QuranIcon,
                "path": "/quran",
                "style": "35",
                "style2": "10"
            },
            {
                "text": "Azkar",
                "icon": AzkarIcon,
                "path": "/azkar",
                "style": "65",
                "style2": "0"
            },
            {
                "text": "Tasbih",
                "icon": TasbihIcon,
                "path": "/tasbih",
                "style": "45",
                "style2": "20"
            },
            {
                "text": "Prayer Time",
                "icon": PrayerIcon,
                "path": "/prayertime",
                "style": "60",
                "style2": "5"
            }
        ]

const SideBar = ({open, handleDrawerClose})=>{
    const theme = useTheme();
    const navigate = useNavigate();
    return(
        <Drawer variant="permanent" open={open}>
        <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <SideCard open={open}/>
        {/* <Typography sx={{mx:1, display: open ? "block": "none"}}>Menu</Typography> */}
        {/* <Divider /> */}
        {arr1.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ display: 'block', mt: 3 }}>
            <ListItemButton onClick={()=> navigate(item.path)}
                sx={[
                {
                    minHeight: 48,
                    px: 2.5,
                },
                open
                    ? {
                        justifyContent: 'initial',
                    }
                    : {
                        justifyContent: 'center',
                    },
                ]}
            >
                <ListItemIcon
                sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    width: 32,
                    height: 42,
                    mr: open ? 3 : 'auto',
                }}
                >
                <Box
                    component="img"
                    src={item.icon}
                    alt={item.text}
                    sx={{
                    width: 50,
                    objectFit: 'contain', // أو "cover" لو حابة تملي المساحة
                    }}
                />                
                </ListItemIcon>
                <ListItemText
                primary={item.text}
                sx={[
                    open
                    ? {
                        opacity: 1,
                        }
                    : {
                        opacity: 0,
                        },
                        
                ]
                
            }
                />
            </ListItemButton>
            {/* {index % 2 === 1 ? <Divider /> : ""} */}
            {/* <Divider /> */}
            </ListItem>
        ))}
        </List>
    </Drawer>
    )
}

export default SideBar;