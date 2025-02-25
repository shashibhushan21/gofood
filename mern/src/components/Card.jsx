import React from 'react'

const Card = () => {
    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src="https://tse1.mm.bing.net/th?id=OIP.taWVRTfeubV4ONv7_5dTFQHaEK&pid=Api&P=0&h=180" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is some importent text</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100 w-30 bg-success rounded'>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-100 w-40 bg-success rounded'>
                            <option value="half">half</option>
                            <option value="full">full</option>
                        </select>

                        <div className='d-inline h-100'>
                            Total Price
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
