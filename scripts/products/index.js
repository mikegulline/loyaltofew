const {
  getStore,
  // getCategory,
  // getType,
  // getLogo,
  // getColor,
} = require('./models.js');

const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../../public/data/products.json');

const main = async () => {
  fs.writeFileSync(filePath, JSON.stringify(getStore(), null, 2));
};

main().then(() => console.log('Done.'));
