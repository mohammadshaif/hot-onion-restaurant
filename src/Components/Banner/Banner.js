import React from 'react';
import './Banner.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Banner = () => {
  const [searchQuery , setSearchQuery] = useState(null)
  const getQuery = e => setSearchQuery(e.target.value);
  return (
    <section className="banner-aria">
      <div className="container">
        <div className="row">
            <div className="col text-center banner-content">
                <h2>Best food waiting for your belly</h2>
                <div className="banner-input">
                    <input id="query" onChange={getQuery} type="text"  placeholder="Search food items"/>
                    <Link to={"/search="+searchQuery}>
                        <button onClick={() => window.scrollBy(0, 500)} className="btn btn-danger search-btn btn-rounded btn primary-btn">Search</button>
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;