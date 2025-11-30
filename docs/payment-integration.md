# Payment Integration for BookMyShoot

## Sri Lankan Payment Gateways

BookMyShoot supports integration with popular Sri Lankan payment gateways to facilitate secure transactions in LKR.

### Supported Payment Providers

1. **PayHere** - The most popular payment gateway in Sri Lanka
2. **Dialog Cash** - Mobile payment solution by Dialog
3. **Commercial Bank VPOS** - Virtual payment solution by Commercial Bank
4. ** Sampath Vishwa** - Payment solution by Sampath Bank

### Implementation Approach

The current implementation provides a framework for integrating with these payment gateways. In a production environment, you would need to:

1. Register with the chosen payment gateway provider
2. Obtain API credentials (merchant ID, secret keys)
3. Implement the specific API integration for each provider
4. Set up webhooks for payment status updates
5. Handle currency conversion if needed

### PayHere Integration Example

To integrate with PayHere, you would typically:

1. Create a payment request with:
   - Merchant ID
   - Order details (amount, currency, order ID)
   - Customer details
   - Return URLs (success, cancel, webhook)
   - Security hash

2. Redirect the customer to PayHere's payment page

3. Handle the response via webhooks to update booking status

### Security Considerations

- All payment transactions must be conducted over HTTPS
- Sensitive payment data should never be stored in the database
- Implement proper webhook signature verification
- Use environment variables for API keys and credentials
- Log all payment activities for audit purposes

### Currency Support

- Primary currency: **LKR (Sri Lankan Rupee)**
- Display format: `LKR 1,250.00`
- All prices in the system are stored and displayed in LKR

### Testing

For testing purposes, most payment gateways provide:
- Sandbox environments
- Test card numbers
- Simulated payment scenarios

### Future Enhancements

- Support for international payments (PayPal, Stripe)
- Recurring payments for subscription services
- Mobile wallet integrations (eZ Cash, mCash)
- Bank transfer options