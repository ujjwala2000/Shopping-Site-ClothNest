import React, { useState } from "react";

const MensWear = () => {

  // 🔹 Selected product
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🔹 User input
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  // 🔹 Product data
  const products = [
    {
      id: 1,
      name: "Casual Shirt",
      price: 799,
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    },
    {
      id: 2,
      name: "Cool T-Shirt",
      price: 499,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    },
    {
      id: 3,
      name: "Denim Jeans",
      price: 1299,
      image: "https://images.unsplash.com/photo-1516826957135-700dedea698c",
    },
  ];

  // 🔥 PAYMENT FUNCTION
  const handlePayment = async (amount) => {

    // 🔸 Validate input
    if (!address || !mobile) {
      alert("Enter address & mobile");
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
        description: "Order Payment",
        order_id: data.id,

        handler: function () {
          alert("Payment Successful ✅");

          // Reset
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

    } catch (err) {
      alert("Payment Failed ❌");
    }
  };

  return (
    <div className="p-10 grid grid-cols-3 gap-6">

      {/* 🔹 Product Cards */}
      {products.map((item) => (
        <div key={item.id} className="border p-4 text-center">
          <img src={item.image} alt="" className="h-40 mx-auto" />
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

      {/* 🔥 Popup */}
      {selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[300px]">

            <h2>{selectedProduct.name}</h2>

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="border p-2 w-full mb-2"
            />

            <button
              onClick={() => handlePayment(selectedProduct.price)}
              className="bg-green-500 text-white w-full py-2"
            >
              Pay Now
            </button>

            <button
              onClick={() => setSelectedProduct(null)}
              className="text-red-500 w-full mt-2"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default MensWear;