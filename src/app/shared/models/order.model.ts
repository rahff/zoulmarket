

export interface CheckoutSession {
  stripeSessionId: string;
  stripePk: string;
}
export interface OrderItem {
  productId: string;
  quantity: number;
  FNSKU: string;
  store: string;
  size: any;
  url_img: string;
  price: number;
  name: string;
}
export interface Purchase {
  createdAt: Date;
  dataUser: {
    numero: string;
    street: string;
    postal: number;
    city: string;
    client: string;
    name: string;
    firstname: string;
  };
  id: string;
  status: boolean;
  subject: Subject[];
  livraison: boolean;
  QrCode?: QrCode
}
export interface Subject {
  idSeller: string;
  FNSKU: string;
  quantity: number;
  size: string | undefined;
  url_img: string;
  name: string;
  price: number
  productId: string
}
export interface QrCode{
  idProduct: string;
  idClient: string;
  idOrder: string;
  src_url: string;
  img_url: string;
}
