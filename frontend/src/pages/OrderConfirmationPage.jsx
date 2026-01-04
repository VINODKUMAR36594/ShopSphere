import React from "react";


const checkout = {
  _id: "1234",
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "Black",
      size: "M",
      price: 120,
      quantity: 2,
      image: "https://picsum.photos/150?random=1",
    },
  ],
  shippingAddress: {
    address: "123 Fashion Street",
    city: "New York",
    country: "USA",
  },
};

const OrderConfirmationPage = () => {
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank you for your order! 🎉
      </h1>

      {checkout && (
        <div className="border rounded-lg p-6 space-y-6">
          {/* Order Info */}
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Order ID: {checkout._id}
              </h2>
              <p className="text-gray-500">
                Order Date:{" "}
                {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="text-right">
              <p className="font-medium">Estimated Delivery</p>
              <p className="text-emerald-600">
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>

            {checkout.checkoutItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 border-b pb-4 mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Color: {item.color} | Size: {item.size}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                {/* payment and delivery info */}

                <p className="font-semibold">
                  <h2>Payment</h2>
                  <h2>Paypal</h2>
                  ${item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            <p className="text-gray-600">
              {checkout.shippingAddress.address},{" "}
              {checkout.shippingAddress.city},{" "}
              {checkout.shippingAddress.country}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
