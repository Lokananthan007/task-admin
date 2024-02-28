import React from "react";
import { Outlet } from "react-router-dom";
function Rootlayout(){
    return(
        <>
        <Outlet/>
        </>
    );

}
export default Rootlayout;