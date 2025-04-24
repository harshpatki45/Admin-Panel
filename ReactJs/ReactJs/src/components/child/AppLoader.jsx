import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners"

function AppLoader ({children}) {
   const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)

        const timeout = setTimeout(() => {
            setLoading(false)
        }, 500);

        return () => clearTimeout(timeout)
    }, [location]);

    return (
        <>

        {loading && (
            <div  style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
              className="d-flex align-items-center justify-content-center">
            <ClipLoader color="white" size={80} />
          </div>
        )}
        {children}
        </>
    )
}

export default AppLoader;