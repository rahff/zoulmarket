export interface Order {
  items: OrderItem[]
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
export interface OrderItem {
  productId: string;
  quantity: number;
  FNSKU: {product: string, store: string, size: any};
}
