declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PaystackPop: any; // You can use a more specific type if Paystack provides one
  }
}
