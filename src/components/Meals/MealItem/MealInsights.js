import { useParams } from "react-router-dom"
import CartProvider from "../../../store/CartProvider"

const MealInsights = () => {
    // const { productId } = useParams();
    return(
        <>
        <CartProvider>
        <p>insights</p>
        </CartProvider>
            
        {/* <p>{productId}</p> */}
        </>
    )
    
}

export default MealInsights