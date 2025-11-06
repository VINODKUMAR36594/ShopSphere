import React from 'react'
import {FiChevronLeft,FiChevronRight} from 'react-icons/fi'
const NewArrivals = () => {
    const newArrivals=[
        {
            _id:"1",
            name : "Stylish Jacket",
            price:120,
            images:[{
                url:'https://picsum.photos/500/500?random=1',
                altText:"Stylish Jacket",
            },
        ],
        },
        {
            _id:"3",
            name : "Stylish Jacket",
            price:120,
            images:[{
                url:'https://picsum.photos/500/500?random=3',
                altText:"Stylish Jacket",
            },
        ],
        },
        {
            _id:"4",
            name : "Stylish Jacket",
            price:120,
            images:[{
                url:'https://picsum.photos/500/500?random=4',
                altText:"Stylish Jacket",
            },
        ],
        },
        {
            _id:"5",
            name : "Stylish Jacket",
            price:120,
            images:[{
                url:'https://picsum.photos/500/500?random=5',
                altText:"Stylish Jacket",
            },
        ],
        },
        {
            _id:"6",
            name : "Stylish Jacket",
            price:120,
            images:[{
                url:'https://picsum.photos/500/500?random=6',
                altText:"Stylish Jacket",
            },
        ],
        },
        {
            _id:"7",
            name : "Stylish Jacket",
            price:120,
            images:[{
                url:'https://picsum.photos/500/500?random=7',
                altText:"Stylish Jacket",
            },
        ],
        },
        {
            _id:"8",
            name : "Stylish Jacket",
            price:120,
            images:[{
                url:'https://picsum.photos/500/500?random=8',
                altText:"Stylish Jacket",
            },
        ],
        },

    ];
  return (
    <section>
        <div className='container mx-auto text-center mb-10 relative'>
            <h2 className='text-3xl font-bold mb-4'>
                Explore New Arriavls
            </h2>
            <p className='text-lg text-gray-600 mb-8'>
                Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion. 
            </p>
        {/* scroll buttons */}
        <div className='absolute right-0 bottom-[-30px] flex space-x-2 '>
            <button className='p-2 rounded border bg-white text-black'>
                <FiChevronLeft className='text-2xl'/>
            </button>
            <button className='p-2 rounded border bg-white text-black'>
                <FiChevronRight className='text-2xl'/>
            </button>

        </div>
        </div>
        {/* scrolleb content */}
        <div className='container mx-auto overflow-x-scroll flex space-x-6 relative'>
            {newArrivals.map((product)=>(
                <div key={product._id}>
                    <img src={product.images[0]?.url} alt={product.images[0]?.altText || product.name} />
                    <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg'>
                        <Link to={`/product/${product._id}`}
                    </div>
                </div>
            ))}
        </div>

    </section>
  )
}

export default NewArrivals