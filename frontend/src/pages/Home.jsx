import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionsSection from '../components/Products/GenderCollectionsSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../redux/slices/productSlice'
import BestSellerCard from "../components/Products/BestSellerCard";
import axios from 'axios'

const Home = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)

  const [bestSellerProduct, setBestSellerProduct] = useState(null)

  useEffect(() => {
    // Fetch filtered products
    dispatch(
      fetchProductsByFilters({
        gender: 'Women',
        category: 'Bottom Wear',
        limit: 8,
      })
    )

    // Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        )
        setBestSellerProduct(response.data)
      } catch (error) {
        console.error('Best seller fetch failed:', error)
      }
    }

    fetchBestSeller()
  }, [dispatch])

  return (
    <div>
      <Hero />
      <GenderCollectionsSection />
      <NewArrivals />

      {/* Best Seller Section */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
     {bestSellerProduct ? (
  <BestSellerCard product={bestSellerProduct} />
) : (
  <p className="text-center">Loading Best Seller Product...</p>
)}


      {/* Top Wears */}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  )
}

export default Home
