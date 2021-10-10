export interface Order {
  productId: string;
  productName: string
  adresse_livraison: {
    numero: string;
    street: string;
    postal: number;
    city: string;
    client: string;
  };
  quantity: number;
  FNSKU: string;
  paypal_auth: string | null
}
export interface CheckoutSession {
  stripeSessionId: string;
  stripePk: string;
}