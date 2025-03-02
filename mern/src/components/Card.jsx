import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

const Card = (props) => {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options)


    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleAddToCart = async () => {
        await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finalPrice, img: props.fooditem.img, qty: qty, size: size });

        // await console.log(data);
         // Show success message
         setSuccessMessage(`${props.fooditem.name} added to cart`);

         // Reset the success message after 3 seconds
         setTimeout(() => {
             setSuccessMessage("");
         }, 1000);
       
    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>
            <div className="card mt-3 card-shadow" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.fooditem.img} style={{ minHeight: "20px", objectFit: "fill" }} />
                <div className="card-body m-2">
                    <h5 className="card-title">{props.fooditem.name}</h5>
                    {/* <p className="card-text">This is some importent text</p> */}
                    <div className='container w-100'>
                        <select className=' h-100 w-30 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-100 w-40 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {/* <option value="half">half</option>
                            <option value="full">full</option> */}
                            {priceOptions.map((data) => {
                                return (
                                    <option key={data} value={data}>{data}</option>
                                )
                            })}
                        </select>

                        <div className='d-inline h-100 m-2 rounded'>
                            {/* Total Price = {options[priceOptions[0]]} */}
                        <br />   <b>Rs.. ₹</b> {finalPrice}/-
                        </div>
                    </div>

                    <hr></hr>
                    <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
                    {successMessage && (
                        <div className="alert alert-success mt-2" style={{ "width": "100%" , "textAlign": "center", display: "flex", justifyContent: "center", bottom: "0", left: "0", transform: 'translate(-0%, -0%)' ,position: "absolute"}}>
                            {successMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card
