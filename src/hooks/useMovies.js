import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const usePortfolio = () =>{
    return useContext(GlobalContext)
}

export default usePortfolio;