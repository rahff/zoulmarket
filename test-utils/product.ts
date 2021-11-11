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
  characteristics: {
    champ1:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure ipsa delectus tempora voluptates labore a',
    champ2:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure ipsa delectus tempora voluptates labore a',
    champ3:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure ipsa delectus tempora voluptates labore a',
    champ4:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure ipsa delectus tempora voluptates labore a',
    champ5:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure ipsa delectus tempora voluptates labore a',
  },
  pointures: {
    p1: 34,
    p2: 35,
    p3: 36,
    p4: 37,
    p5: 38,
    p6: 39,
    p7: 40,
    p8: 41,
    p9: 42,
  },
  variations: [
    {
      name: 'Basket Femme sport noire',
      description:
        'Femme Basket Chaussures de Sport Running Course Sport Fitness Sneakers Chaussures de Running sur Route Outdoor Casual',
      img: [
        {
          img_big: '/uploads/basket_black1_4bfcedba21.jpg',
          img_md: '/uploads/small_basket_black1_4bfcedba21.jpg',
          img_mini: '/uploads/thumbnail_basket_black1_4bfcedba21.jpg',
        },
        {
          img_big: '/uploads/basket_black2_9e50b4de2c.jpg',
          img_md: '/uploads/small_basket_black2_9e50b4de2c.jpg',
          img_mini: '/uploads/thumbnail_basket_black2_9e50b4de2c.jpg',
        },
        {
          img_big: '/uploads/basket_back3_573b58c23f.jpg',
          img_md: '/uploads/small_basket_back3_573b58c23f.jpg',
          img_mini: '/uploads/thumbnail_basket_back3_573b58c23f.jpg',
        },
      ],
      price: 39.99,
      id: '611d6c2b44dab81cfcb99ef1',
      stock: true,
      FNSKU: 'basketF_58_mark_NR',
    },
  ],
  sizes: null,
  sizes_XXS_TO_XXXL: null,
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
