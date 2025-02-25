import React from 'react'

const Carousal = () => {
  return (
    <div>
      
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{zIndex:'11'}}>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search item" aria-label="Search" style={{background: "#333",color:"#fff"}}/>
              <button className="btn btn-outline-success" style={{background: "blue", color:"white"}} type="submit">Search</button>
            </form>
          </div>
          <div className="carousel-item active">
            <img 
              src="https://cdn.pixabay.com/photo/2023/09/25/22/08/ai-generated-8276129_1280.jpg" 
              className="d-block w-100" // Note: corrected classNameName to className
              alt="Burger" 
              style={{
                filter: 'brightness(50%)',
                width: '100%',
                height: '500px',  // You can adjust this value
                objectFit: 'cover' // Ensures image maintains aspect ratio
              }} 
            />
          </div>
          <div className="carousel-item">
            <img 
              src="https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_1280.jpg" 
              className="d-block w-100" // Note: corrected classNameName to className
              alt="Pizza" 
              style={{
                filter: 'brightness(50%)',
                width: '100%',
                height: '500px',  // You can adjust this value
                objectFit: 'cover'
              }} 
            />
          </div>
          <div className="carousel-item">
            <img 
              src="https://im.whatshot.in/img/2019/May/shutterstock-1133804639-cropped-1557741221.jpg" 
              className="d-block w-100" // Note: corrected classNameName to className
              alt="Momos" 
              style={{
                filter: 'brightness(50%)',
                width: '100%',
                height: '500px',  // You can adjust this value
                objectFit: 'cover'
              }} 
            />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Carousal