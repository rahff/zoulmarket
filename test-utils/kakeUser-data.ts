import { User } from 'src/app/shared/models/user.model';

export const fakeUser: User = {
  adresse: {
    postal: 7000,
    city: 'Vesoul',
    numero: '12bis',
    rue: 'rue du pont',
    name: 'Andrey ',
    firstname: 'RAPHAEL',
  },
  confirmed: true,
  email: 'raphaelandrey99@gmail.com',
  firstname: 'RAPHAEL',
  id: '6109e19ea9933461e5654490',
  name: 'Andrey ',
  role: {
    _id: '6109c7d2f6a67c5a3ab95018',
    name: 'Authenticated',
    description: 'Default role given to authenticated user.',
    type: 'authenticated',
    __v: 0,
    id: '6109c7d2f6a67c5a3ab95018',
  },
  tel: '07 72 11 12 99',
  orders: [
    {
      status: true,
      livraison: false,
      subject: [
        {
          idSeller: 'Intersport',
          FNSKU: 'basketF_58_mark',
          quantity: 1,
          size: '37',
          url_img: '/uploads/small_basket1_4038cb6da8.jpg',
          price: 39.99,
          name: 'Basket Femme sport',
          productId: '611c5c7099327d3732e3225f',
        },
      ],
      dataUser: {
        street: 'rue du pont',
        city: 'Vesoul',
        numero: '12bis',
        postal: 7000,
        name: 'Andrey ',
        firstname: 'RAPHAEL',
        client: "4545454"
      },
      createdAt:new Date(Date.now()),
      id: '61829654acc90e482e1ec5b5',
    },
  ],
};
