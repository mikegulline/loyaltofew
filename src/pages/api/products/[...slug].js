let fs = require('fs');

const handler = async (req, res) => {
  const slug = req.query.slug;
  let send;
  switch (slug.length) {
    case 1:
      try {
        const category = await JSON.parse(
          fs.readFileSync(`public/data/${slug[0]}.json`, 'utf8')
        );
        checkSend(res, category);
      } catch (error) {
        res.status(404).send({ message: 'No category found!', error });
      }

      break;
    case 2:
      try {
        const category_type = await JSON.parse(
          fs.readFileSync(`public/data/${slug[0]}-${slug[1]}.json`, 'utf8')
        );
        checkSend(res, category_type);
      } catch (error) {
        res.status(404).send({ message: 'No category type found!', error });
      }
      break;
    case 3:
      try {
        const category_type_logo = await JSON.parse(
          fs.readFileSync(
            `public/data/${slug[0]}-${slug[1]}-${slug[2]}.json`,
            'utf8'
          )
        );
        checkSend(res, category_type_logo);
      } catch (error) {
        res
          .status(404)
          .send({ message: 'No category type logo found!', error });
      }
      break;
    case 4:
      try {
        const category_type_logo_color = await JSON.parse(
          fs.readFileSync(
            `public/data/${slug[0]}-${slug[1]}-${slug[2]}-${slug[3]}.json`,
            'utf8'
          )
        );
        checkSend(res, category_type_logo_color);
      } catch (error) {
        res.status(404).send({ message: 'No product found!', error });
      }
      break;
    default:
      console.log('Error 404');
      res.status(404).send({ error: 'Wrong params!' });
  }
};

const checkSend = (res, send) => {
  if (send) res.status(200).json(send);
  else res.status(404).send({ error: 'Nothing found!' });
};

export default handler;
