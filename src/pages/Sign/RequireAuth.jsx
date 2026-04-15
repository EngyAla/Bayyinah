import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { CircularProgress, Stack } from "@mui/material";

export default function RequireAuth() {
    const { user, loading } = useAuth();    
    const location = useLocation();



//🔍 السبب الأساسي: لكتابه كود loading
// عند عمل refresh:
// الـ React يعيد تحميل كل شيء من البداية.
// AuthContext بيبدأ بقيمة user = null.
// RequireAuth بيشتغل بسرعة قبل ما useEffect في AuthContext يكمّل قراءة المستخدم من localStorage.
// وده بيخليه يعتقد إن "user مش موجود"، فيعيد التوجيه إلى /auth.
    if(loading){
        return <>
        <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} mt={'5'}>
            <h1>Wait a second...</h1>
            <CircularProgress />
        </Stack>
        </>
    }
    if (!user) {
        return <Navigate to="/auth" state={{ from: location }} replace />;       
    }
    return <Outlet />;
}