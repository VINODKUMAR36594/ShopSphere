import React, { useEffect } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionsSection from '../components/Products/GenderCollectionsSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection  from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../../slices/productSlice'
const placeholderProducts =[
   {
        _id:1,
        name:"product 1",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=1"
        }],


    },
    {
        _id:2,
        name:"product 2",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=2"
        }],


    },
    {
        _id:3,
        name:"product 3",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=3"
        }],


    },
    {
        _id:4,
        name:"product 4",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=4"
        }],


    },
     {
        _id:1,
        name:"product 5",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=5"
        }],


    },
    {
        _id:2,
        name:"product 6",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=6"
        }],


    },
    {
        _id:3,
        name:"product 7",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=7"
        }],


    },
    {
        _id:4,
        name:"product 8",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?random=8"
        }],


    },
]
const Home = () => {
    const dispatch=useDispatch();
    const {products,loading,error}=useSelector((state)=>state.products)
    const [bestSellerProduct,setBestSellerProducr]=useState(null)
    useEffect(()=>{
        dispatch(fetchProductsByFilters({
            gender:"Women",
            category:"Bottom Wear",
            limit:8,
        }))
        const fetchBestSeller =async ()=>{
            try {
                const response =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
                setBestSellerProducr(response.data)
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
        {bestSellerProduct?(<ProductDetails productId={bestSellerProduct._id}/>):(
            <p className='text-center'>Laoding best seller product....</p>
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
