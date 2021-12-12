import { Product } from 'src/app/shared/models/product';

export const product: Product = {
  name: 'Basket Femme sport',
  price: 39.99,
  vendeur: 'Intersport',
  img: [
    {
      img_big: '/uploads/basket1_4038cb6da8.jpg',
      img_md: '/uploads/small_basket1_4038cb6da8.jpg',
      img_mini: '/uploads/thumbnail_basket1_4038cb6da8.jpg',
    },
    {
      img_big: '/uploads/basket2_55e57d7059.jpg',
      img_md: '/uploads/small_basket2_55e57d7059.jpg',
      img_mini: '/uploads/thumbnail_basket2_55e57d7059.jpg',
    },
    {
      img_big: '/uploads/basket3_8f699c2f82.jpg',
      img_md: '/uploads/small_basket3_8f699c2f82.jpg',
      img_mini: '/uploads/thumbnail_basket3_8f699c2f82.jpg',
    },
  ],
  description:
    'Femme Basket Chaussures de Sport Running Course Sport Fitness Sneakers Chaussures de Running sur Route Outdoor Casual',
  id: '611c5c7099327d3732e3225f',
  store: '611b0fccf3f28850cf41c7bf',
  characteristics: ['Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure ipsa delectus tempora voluptates labore a',
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure ipsa delectus tempora voluptates labore a',
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure ipsa delectus tempora voluptates labore a',
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure ipsa delectus tempora voluptates labore a',
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure ipsa delectus tempora voluptates labore a'],
  variations: [
    {
      img: "http://localhost:1337/upload/machin",
      linkId: "12355rr4gtr4g8t4t145r"
    },
  ],
  tailles: [],
  stock: true,
  FNSKU: 'basketF_58_mark',
  avis: [
    {
      rating: 5,
      title: 'génial',
      commentaire: 'super !',
      product: '611c5c7099327d3732e3225f',
      user: '6109e19ea9933461e5654490',
      username: 'Raphael',
    },
  ],
};
