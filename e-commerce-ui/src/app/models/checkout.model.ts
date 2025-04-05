export interface CheckoutFormData {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Shipping Information
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Payment Information
  paymentMethod: string;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;

  // Additional Information
  saveInfo: boolean;
  notes: string;
}

export const TEST_CHECKOUT_DATA: CheckoutFormData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 555-123-4567',

  address: '123 Main Street',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'United States',

  paymentMethod: 'credit',
  cardName: 'John Doe',
  cardNumber: '4111111111111111',
  expiryDate: '12/25',
  cvv: '123',

  saveInfo: true,
  notes: 'Please leave the package at the front door.'
};
