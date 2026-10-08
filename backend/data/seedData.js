const initialOutlets = [
  {
    name: "KC Food Court",
    code: "kc",
    icon: "🍔",
    location: "Main Food Court - Station 1",
    isOpen: true,
    avgPrepTimeMinutes: 8,
    status: "High Traffic"
  },
  {
    name: "Nescafe",
    code: "nescafe",
    icon: "☕",
    location: "Gazebo Central Plaza",
    isOpen: true,
    avgPrepTimeMinutes: 5,
    status: "Normal"
  },
  {
    name: "Darling Canteen",
    code: "darling",
    icon: "🍛",
    location: "North Square Block",
    isOpen: true,
    avgPrepTimeMinutes: 10,
    status: "Normal"
  },
  {
    name: "DC Bakery",
    code: "dc-bakery",
    icon: "🥪",
    location: "Technology Tower Basement",
    isOpen: true,
    avgPrepTimeMinutes: 4,
    status: "Normal"
  }
];

const initialMenuItems = [
  // KC Food Court
  {
    outletName: "KC Food Court",
    name: "Crispy Veg Burger",
    price: 95,
    veg: true,
    inStock: true,
    desc: "Aloo tikki patty, lettuce, house sauce.",
    category: "Burgers",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    outletName: "KC Food Court",
    name: "Paneer Kathi Roll",
    price: 120,
    veg: true,
    inStock: true,
    desc: "Tandoori grilled cottage cheese wrap with mint chutney.",
    category: "Rolls",
    img: "https://spicecravings.com/wp-content/uploads/2020/12/Paneer-kathi-Roll-Featured-1.jpg"
  },
  {
    outletName: "KC Food Court",
    name: "Chicken Club Sandwich",
    price: 140,
    veg: false,
    inStock: true,
    desc: "Grilled chicken, toasted brown bread, mayo.",
    category: "Sandwiches",
    img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },
  {
    outletName: "KC Food Court",
    name: "Classic Cold Coffee",
    price: 70,
    veg: true,
    inStock: false,
    desc: "Thick brewed espresso blended with cream.",
    category: "Beverages",
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    outletName: "KC Food Court",
    name: "Steamed Momos (6 pcs)",
    price: 80,
    veg: true,
    inStock: true,
    desc: "Served with fiery red garlic dip.",
    category: "Snacks",
    img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    outletName: "KC Food Court",
    name: "Peri Peri Fries",
    price: 75,
    veg: true,
    inStock: true,
    desc: "Crispy golden tossed french fries with spicy seasoning.",
    category: "Snacks",
    img: "https://sreerajlassibar.com/wp-content/uploads/2024/09/PERI-PERI-FRIES.jpg"
  },

  // Nescafe
  {
    outletName: "Nescafe",
    name: "Hazelnut Cold Coffee",
    price: 85,
    veg: true,
    inStock: true,
    desc: "Chilled latte infused with nutty hazelnut syrup.",
    category: "Beverages",
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    outletName: "Nescafe",
    name: "Cheese Maggi",
    price: 60,
    veg: true,
    inStock: true,
    desc: "2-minute instant noodles loaded with melted cheddar.",
    category: "Snacks",
    img: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80"
  },
  {
    outletName: "Nescafe",
    name: "Hot Chocolate",
    price: 75,
    veg: true,
    inStock: true,
    desc: "Creamy steamed chocolate topped with cocoa powder.",
    category: "Beverages",
    img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80"
  },

  // Darling Canteen
  {
    outletName: "Darling Canteen",
    name: "Special Masala Dosa",
    price: 70,
    veg: true,
    inStock: true,
    desc: "Crispy fermented crepe with spiced potato filling & sambar.",
    category: "South Indian",
    img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"
  },
  {
    outletName: "Darling Canteen",
    name: "Veg Thali",
    price: 110,
    veg: true,
    inStock: true,
    desc: "Complete lunch platter with dal, sabzi, roti, rice and curd.",
    category: "Meals",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80"
  },

  // DC Bakery
  {
    outletName: "DC Bakery",
    name: "Paneer Puff",
    price: 45,
    veg: true,
    inStock: true,
    desc: "Flaky baked pastry filled with spicy minced cottage cheese.",
    category: "Bakery",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    outletName: "DC Bakery",
    name: "Chocolate Walnut Brownie",
    price: 65,
    veg: true,
    inStock: true,
    desc: "Fudgy warm dark chocolate brownie with crunchy walnuts.",
    category: "Dessert",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  }
];

const initialOrders = [
  {
    orderToken: "GB-4102",
    studentName: "Manit Gauba",
    regNo: "24BBS0148",
    outlet: "KC Food Court",
    items: [
      { name: "Crispy Veg Burger", price: 95, qty: 2 },
      { name: "Classic Cold Coffee", price: 70, qty: 1 }
    ],
    totalAmount: 260,
    paymentStatus: "paid",
    paymentMethod: "razorpay",
    razorpayPaymentId: "pay_sim_4102",
    orderStatus: "incoming"
  },
  {
    orderToken: "GB-4103",
    studentName: "Kapish Tickoo",
    regNo: "24BBS0163",
    outlet: "KC Food Court",
    items: [
      { name: "Paneer Kathi Roll", price: 120, qty: 1 },
      { name: "Peri Peri Fries", price: 75, qty: 1 }
    ],
    totalAmount: 195,
    paymentStatus: "paid",
    paymentMethod: "razorpay",
    razorpayPaymentId: "pay_sim_4103",
    orderStatus: "preparing"
  },
  {
    orderToken: "GB-4104",
    studentName: "Deepujjwal Singh",
    regNo: "24BBS0213",
    outlet: "KC Food Court",
    items: [
      { name: "Steamed Momos (6 pcs)", price: 80, qty: 2 }
    ],
    totalAmount: 160,
    paymentStatus: "paid",
    paymentMethod: "razorpay",
    razorpayPaymentId: "pay_sim_4104",
    orderStatus: "ready"
  }
];

const initialUsers = [
  {
    name: "Kapish Tickoo",
    email: "kapish.tickoo2024@vitstudent.ac.in",
    regNo: "24BBS0163",
    role: "student"
  },
  {
    name: "Manit Gauba",
    email: "manit.gauba2024@vitstudent.ac.in",
    regNo: "24BBS0148",
    role: "student"
  },
  {
    name: "Deepujjwal Singh",
    email: "deepujjwal.singh2024@vitstudent.ac.in",
    regNo: "24BBS0213",
    role: "student"
  },
  {
    name: "KC Vendor Manager",
    email: "kc.vendor@gobite.campus",
    role: "vendor",
    outletAssigned: "KC Food Court"
  },
  {
    name: "Campus Admin",
    email: "admin@gobite.campus",
    role: "admin"
  }
];

module.exports = {
  initialOutlets,
  initialMenuItems,
  initialOrders,
  initialUsers
};
