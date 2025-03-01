import React from 'react'

const Card = (props) => {

    let options = props.options;
    let priceOptions = Object.keys(options)
    return (
        <div>
            <div className="card mt-3 card-shadow" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src= {props.imgsrc} style={{height:"200px", objectFit:"fill"}} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodName}</h5>
                    {/* <p className="card-text">This is some importent text</p> */}
                    <div className='container w-100'>
                        <select className='m-2 h-100 w-30 bg-success rounded'>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-100 w-40 bg-success rounded'>
                            {/* <option value="half">half</option>
                            <option value="full">full</option> */}
                            {priceOptions.map((data)=>{
                                return(
                                    <option key={data} value={data}>{data}</option>
                                )
                            })}
                        </select>

                        <div className='d-inline h-100 m-2 rounded'>
                            Total Price = {options[priceOptions[0]]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
