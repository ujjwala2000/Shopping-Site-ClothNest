import React from "react";

import TshirtImg from "../../assets/tshirt.svg";
import Img1 from "../../assets/women/women1.png";
import Img2 from "../../assets/women/women2.jpg";
import Img3 from "../../assets/women/women3.jpg";
import Img4 from "../../assets/women/women4.jpg";

import { FaStar } from "react-icons/fa6";

// ================= PRODUCT DATA =================
const ProductsData = [
  { id: 1, img: Img1, title: "Women Ethnic", rating: 5.0, color: "White" },
  { id: 2, img: Img2, title: "Women Western", rating: 4.5, color: "Red" },
  { id: 3, img: Img3, title: "Goggles", rating: 4.7, color: "Brown" },
  { id: 4, img: Img4, title: "Printed T-Shirt", rating: 4.4, color: "Yellow" },
  { id: 5, img: Img2, title: "Fashion T-Shirt", rating: 4.5, color: "Pink" },
];

// ================= MAIN COMPONENT =================
const Products = () => {

  // 🔥 PAYMENT HANDLER (FINAL)
  const paymentHandler = async () => {
    try {
      const amount = 50000; // ₹500 in paise
      const currency = "INR";

      // 🔹 Create order from backend
      const res = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt: "receipt_1",
        }),
      });

      const order = await res.json();
      console.log("ORDER:", order);

      if (!order.id) {
        alert("Order failed ❌");
        return;
      }

      // ❗ Razorpay SDK check
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded ❌");
        return;
      }

      // 🔹 Razorpay options
      const options = {
        key: "rzp_test_SjzJT0PlG2NXCK", // ✅ your test key
        amount: "50000",
        currency: "INR",
        name: "ClothNest",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: "order_SkS8OMAmqO6r4i", 

        handler: async function (response) {
          console.log("SUCCESS:", response);

          // 🔹 Verify payment
          const verify = await fetch(
            "http://localhost:5000/order/validate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            }
          );

          const result = await verify.json();
          console.log("VERIFY:", result);

          alert("Payment Successful ✅");
        },

        prefill: {
          name: "Test User",
          email: "test@test.com",
          contact: "9999999999",
        },

        notes: {
          address: "ClothNest Office",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.log("FAILED:", response);
        alert("Payment Failed ❌\n" + response.error.description);
      });

      rzp.open();

    } catch (error) {
      console.log("ERROR:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="mt-14 mb-12">
      <div className="container">

        {/* HEADER */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-primary">Top Selling Products</p>
          <h1 className="text-3xl font-bold">Products</h1>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {ProductsData.map((data) => (
            <div key={data.id} className="space-y-3">
              <img
                src={data.img}
                alt={data.title}
                className="h-[220px] w-[150px] object-cover rounded-md"
              />
              <h3 className="font-semibold">{data.title}</h3>
              <p className="text-sm text-gray-600">{data.color}</p>

              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{data.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ PAYMENT SECTION */}
        <div className="flex flex-col items-center mt-10">
          <h2 className="font-bold">Tshirt</h2>
          <p>Solid blue cotton Tshirt</p>

          <img src={TshirtImg} alt="tshirt" className="w-40" />

          <button 
            onClick={paymentHandler}
            className="mt-4 bg-primary text-white px-5 py-2 rounded"
          >
            Pay
          </button>
        </div>

      </div>
    </div>
  );
};

export default Products;