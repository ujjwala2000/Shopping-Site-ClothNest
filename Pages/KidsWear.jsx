import React, { useState } from "react";

const KidsWear = () => {

  // 🔹 Store selected product
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🔹 Store user input
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  // 🔹 Kids products (ONLY ONE ARRAY ✅)
  const products = [
    {
      id: 1,
      name: "Kids T-Shirt",
      price: 499,
      image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400",
    },
   {
  id: 2,
  name: "Kids Jeans",
  price: 699,
  image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
},
    {
      id: 3,
      name: "Baby Dress",
      price: 899,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
    },
  ];

  // 🔥 Payment Function
  const handlePayment = async (amount) => {

    // 🔸 Validation
    if (!address || !mobile) {
      alert("Please enter address & mobile");
      return;
    }

    try {
      // 🔸 Call backend
      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
      });

      const data = await res.json();

      // 🔸 Razorpay options
      const options = {
        key: "YOUR_KEY_ID",
        amount: data.amount,
        currency: "INR",
        name: "ClothNest",
        description: "KidsWear Payment",
        order_id: data.id,

        handler: function () {
          alert("Payment Successful ✅");

          // Reset form
          setSelectedProduct(null);
          setAddress("");
          setMobile("");
        },

        prefill: {
          contact: mobile,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      alert("Payment Failed ❌");
    }
  };

  return (
    <div className="p-10 grid grid-cols-3 gap-6">

      {/* 🔹 Product Cards */}
      {products.map((item) => (
        <div key={item.id} className="border p-4 text-center">

          {/* Image */}
          <img
            src={item.image}
            alt={item.name}
            className="h-40 w-full object-cover"
          />

          {/* Details */}
          <h2>{item.name}</h2>
          <p>₹{item.price}</p>

          {/* 🔹 Order Button */}
          <button
            onClick={() => setSelectedProduct(item)}
            className="bg-blue-500 text-white px-4 py-2 mt-2"
          >
            Order Now
          </button>
        </div>
      ))}

      {/* 🔥 POPUP FORM */}
      {selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          
          <div className="bg-white p-6 rounded w-[300px]">

            <h2 className="text-xl mb-3">{selectedProduct.name}</h2>

            <input
              type="text"
              placeholder="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="border p-2 w-full mb-2"
            />

            <button
              className="bg-green-500 text-white px-4 py-2 w-full"
              onClick={() => handlePayment(selectedProduct.price)}
            >
              Pay Now
            </button>

            <button
              className="mt-2 text-red-500 w-full"
              onClick={() => setSelectedProduct(null)}
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default KidsWear;