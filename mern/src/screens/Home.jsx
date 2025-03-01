import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousal from '../components/Carousal'

const Home = () => {
  const [search, setSearch] = useState('');
  const [foodcat, setfoodCat] = useState([]);
  const [fooditem, setfoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch('http://localhost:5000/api/foodData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      let data = await response.json();
      // console.log(data);

      // console.log(data[0], data[1]);
      setfoodItem(data[0]);
      setfoodCat(data[1]);

    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  }

  useEffect(() => {
    loadData();
  }, [])
  return (
    <div>
      <Navbar />
      <div>
        {/* This is  Carousal Section Start */}
        <div>
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner" id='carousel'>
              <div className="carousel-caption" style={{ zIndex: '11' }}>
                <div className="d-flex justify-content-center ">
                  <input className="form-control me-2" type="search" placeholder="Search item" aria-label="Search"
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    style={{ background: "#333", color: "#fff" }} />
                  {/* <button className="btn btn-outline-success" style={{background: "blue", color:"white"}} type="submit">Search</button> */}
                </div>
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
         {/* This is  Carousal Section Start */}

        <div className='container  '>
          {
            foodcat.length > 0
              ? foodcat.map((data) => {
                return (

                  <div className='row mb-3'>
                    <div key={data._id} className='fs-3 m-3'>
                      {data.CategoryName}
                    </div>
                    <hr />

                    {fooditem.length > 0
                      ?
                      fooditem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                        .map(filterItems => {
                          return (
                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                              <Card 
                              className="card-shadow"
                              foodName={filterItems.name}
                                options={filterItems.options[0]}
                                imgsrc={filterItems.img}
                              ></Card>
                            </div>
                          )
                        }) : <div>No Such Data Found</div>
                    }

                  </div>
                );
              }) : <div>Loading...</div>
          }

          {/* <Card/> */}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
