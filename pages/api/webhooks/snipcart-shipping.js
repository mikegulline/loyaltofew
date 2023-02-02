import nc from 'next-connect';

const handler = nc();

handler.post(async (req, res) => {
  // const token = req.headers['X-Snipcart-RequestToken'];
  // if (!token) {
  //   return res.json({
  //     errors: [
  //       {
  //         key: 'no_token',
  //         message: 'Missing or invalid RequestToken',
  //       },
  //     ],
  //   });
  // }

  return res.json({
    rates: [
      {
        cost: 10,
        description: '10$ shipping',
      },
      {
        cost: 20,
        description: '20$ shipping',
        guaranteedDaysToDelivery: 5,
      },
    ],
  });
});

// const handler = (req, res) => {
//   const token = req.headers['X-Snipcart-RequestToken'];
//   console.log(req.headers);
//   res.status(200).send(req.headers['X-Snipcart-RequestToken']);
// };

export default handler;
