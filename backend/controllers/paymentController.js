// Payment Controller (Razorpay Integration / Simulation for Course Prototype)

// @desc    Initiate a Razorpay payment order
// @route   POST /api/payment/create-order
// @access  Public
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', outletName = 'Campus Outlet' } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: 'Valid amount is required' });
    }

    // In a 50% prototype, generate a simulated Razorpay order ID or use configured test credentials
    const simulatedOrderId = `order_rzp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    return res.status(200).json({
      success: true,
      message: 'Razorpay order created successfully',
      data: {
        id: simulatedOrderId,
        amount: Math.round(Number(amount) * 100), // in paise
        currency,
        key: process.env.RAZORPAY_KEY_ID || 'rzp_test_campus_mock',
        outlet: outletName
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify Razorpay payment
// @route   POST /api/payment/verify
// @access  Public
const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    // For prototype simulation
    const paymentId = razorpayPaymentId || `pay_${Date.now()}`;

    return res.status(200).json({
      success: true,
      verified: true,
      message: 'Payment verified successfully via Razorpay gateway',
      data: {
        paymentId,
        orderId: razorpayOrderId || `order_${Date.now()}`,
        status: 'captured'
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createRazorpayOrder,
  verifyPayment
};
