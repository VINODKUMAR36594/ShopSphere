import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Hero from '../components/Layout/Hero'
import GenderCollectionsSection from '../components/Products/GenderCollectionsSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection  from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../../slices/productSlice'
import { Link } from 'react-router-dom'

const Home = () => {
    const dispatch=useDispatch();
    const {products,loading,error}=useSelector((state)=>state.products)
    const [bestSellerProduct,setBestSellerProduct]=useState(null)
    useEffect(()=>{
        dispatch(fetchProductsByFilters({
            gender:"Women",
            category:"Bottom Wear",
            limit:8,
        }))
        const fetchBestSeller =async ()=>{
            try {
                const response =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
                setBestSellerProduct(response.data?.bestseller ?? null)
            } catch (error) {
                console.error(error);
            }
        }
        fetchBestSeller();
    },[dispatch])
  return (
    <div>
        <Hero/>
        <GenderCollectionsSection/>
        <NewArrivals/>
        {/* best seller section */}
        <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
        {bestSellerProduct ? (
            <div className='container mx-auto text-center mb-8'>
                <Link to={`/product/${bestSellerProduct._id}`} className='inline-block'>
                    <div className='max-w-xs mx-auto rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow'>
                        <img src={bestSellerProduct.images?.[0]?.url || '/placeholder.png'} alt={bestSellerProduct.name} className='w-full h-64 object-cover' />
                        <div className='p-4 bg-white'>
                            <h3 className='font-semibold text-lg'>{bestSellerProduct.name}</h3>
                            <p className='text-gray-600'>₹{bestSellerProduct.price}</p>
                        </div>
                    </div>
                </Link>
            </div>
        ) : (
            <p className='text-center'>Loading best seller product....</p>
        )}
      

      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>Top Wears for Women</h2>
        <ProductGrid products={products} loading={loading} error={error}/>
      </div>
      <FeaturedCollection/>
      <FeaturesSection/>
    </div>
  )
}

export default Home
