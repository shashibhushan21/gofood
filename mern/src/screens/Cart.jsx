import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import trash from "../assets/trash.png.svg";

const Cart = () => {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center text-white fs-3'> The Cart is Empty</div>
            </div>
        );
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem('userEmail');
        let response = await fetch('http://localhost:5000/api/orderData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                order_data: data,
                order_date: new Date().toLocaleDateString()
            })
        });
        // console.log("Order Response:", response);
        if (response.status === 200) {
            alert("Smartness is good, but over smartness is Dengrous not Become OverSmart, without Payment you can't get the Order 😂😂");
            dispatch({ type: "CLEAR" });
        }
    };

    let totalPrice = data.reduce((total, food) => total + food.price, 0);
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl'>
                <table className="table table-dark table-bordered table-hover">
                    <thead className="thead-dark text-cente text-white fs-4">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Delete Item</th>
                        </tr>
                    </thead>
                    <tbody className='text-white'>
                        {data.map((food, index) => (
                            <tr className='text-white' key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td><b>₹ </b>  {food.price}</td>
                                <td>
                                    <button type='button' className='btn p-0 text-white'>
                                        <span style={{ marginRight: "15px" }}>Remove</span>
                                        <img
                                            src={trash}
                                            alt="delete"
                                            onClick={() => { dispatch({ type: "REMOVE", index: index }) }}
                                            style={{ objectFit: "cover", height: "25px", background: "red", borderRadius: "50%" }}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;