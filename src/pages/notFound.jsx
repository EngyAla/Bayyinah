import { Box, Typography, useTheme } from "@mui/material";

const NotFound = ()=>{
    const theme = useTheme()
    return(
        <Box textAlign={"center"}>
        <Typography variant="h6" color={theme.palette.error.main} sx={{fontSize: "45px"}}>Page Not Found</Typography>
        <Typography variant="body1" color={theme.palette.error.main}>Please try again later...</Typography>
        </Box>
    )
}

export default NotFound;