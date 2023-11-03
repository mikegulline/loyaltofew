const {
  getStore,
  getCategory,
  getType,
  getLogo,
  getColor,
  kebab,
} = require('./models.js');
const { getPlaiceholder } = require('plaiceholder');
//
const path = require('path');
const fs = require('fs');

const store = getStore();
// console.log(store.categories[0].products[0].logos);

try {
  const filePath = path.join(__dirname, '../../public/data/menu.json');
  const menu = store['categories'].map(({ name, link, products: prod }) => {
    const products = prod.map(({ name, link }) => {
      return {
        name,
        location: link,
      };
    });
    return {
      name,
      location: link,
      subMenu: products,
    };
  });

  const menuRest = [
    { name: 'Our Story', location: '/our-story' },
    { name: 'Contact', location: '/contact' },
    { name: 'Orders', location: '/orders' },
  ];

  fs.writeFileSync(filePath, JSON.stringify([...menu, ...menuRest], null, 2));
} catch (err) {
  console.log('write menu.json', err);
} finally {
  console.log('DONE: write menu.json');
}

// /public/data/store-new.json
async function storeNew() {
  const filePath = path.join(__dirname, '../../public/data/store-new.json');
  const categories = store.categories.map(
    async ({ category, name, link, meta, products: processProds }) => {
      const products = processProds.map(
        async ({ name, type, link, image, logos: l, colors }) => {
          let imageBlur = '';
          await getPlaiceholder(image).then(
            ({ base64 }) => (imageBlur = base64)
          );
          const logos = l.map(({ logo, colors }) => ({ logo, colors }));
          return { name, type, link, image, imageBlur, logos, colors };
        }
      );
      return await Promise.all(products).then((res) => ({
        category,
        name,
        link,
        meta,
        products: res,
      }));
    }
  );
  await Promise.all(categories).then((res) => {
    fs.writeFileSync(
      filePath,
      JSON.stringify(
        {
          ...store,
          categories: res,
        },
        null,
        2
      )
    );
  });
}
(async () => {
  try {
    await storeNew();
  } catch (err) {
    console.log('write store-new.json', err);
  } finally {
    console.log('DONE: write store-new.json');
  }
})();

// /public/data/mens.json

async function categoryNew() {
  const op = store['categories'].map(async ({ category: cat }) => {
    const filePath = path.join(
      __dirname,
      `../../public/data/${cat.toLowerCase()}.json`
    );
    const category = getCategory(cat);
    const products = await category.products.map(
      async ({ type, colors, name, link, image, logos: processLogos }) => {
        const logos = await processLogos.map(
          async ({ link, linkColor, image, logo, colors }) => {
            let imageBlur = '';
            await getPlaiceholder(image).then(
              ({ base64 }) => (imageBlur = base64)
            );
            return {
              logo,
              colors,
              link,
              image,
              imageBlur,
            };
          }
        );
        return await Promise.all(logos).then((res) => ({
          name,
          link: `${category.link}/${type}`.toLocaleLowerCase(),
          logos: res,
          colors,
        }));
      }
    );
    return await Promise.all(products).then((res) => {
      fs.writeFileSync(
        filePath,
        JSON.stringify(
          {
            ...{ ...category, products: res },
          },
          null,
          2
        )
      );
    });
  });
  return await Promise.all(op);
}
(async () => {
  try {
    await categoryNew();
  } catch (err) {
    console.log('write category.json', err);
  } finally {
    console.log('DONE: write category.json');
  }
})();

// /public/data/mens-tee.json
async function typeNew() {
  const op = store['categories'].map(async ({ category, products }) => {
    const pop = products.map(async ({ type }) => {
      const filePath = path.join(
        __dirname,
        `../../public/data/${category.toLowerCase()}-${type.toLowerCase()}.json`
      );

      fs.writeFileSync(
        filePath,
        JSON.stringify(
          {
            function: 'getType(category, type)',
            output: `/public/data/${category.toLowerCase()}-${type.toLowerCase()}.json`,
            ...getType(category, type),
          },
          null,
          2
        )
      );
    });
    return await Promise.all(pop);
  });
  return await Promise.all(op);
}
(async () => {
  try {
    await typeNew();
  } catch (err) {
    console.log('write types.json', err);
  } finally {
    console.log('DONE: write types.json');
  }
})();

// /public/data/mens-tee-stamp-green.json
const myMemo = {};
async function productNew() {
  const { categories } = store;
  for (let c = 0; c < categories.length; c++) {
    let { category, products } = categories[c];
    for (let p = 0; p < products.length; p++) {
      let { type, logos } = products[p];
      for (let l = 0; l < logos.length; l++) {
        let { logo, colors } = logos[l];
        for (let lc = 0; lc < colors.length; lc++) {
          let color = colors[lc];
          const filePath = path.join(
            __dirname,
            `../../public/data/${category.toLowerCase()}-${type.toLowerCase()}-${kebab(
              logo.toLowerCase()
            )}-${color.toLowerCase()}.json`
          );
          //
          let processProds = getColor(category, type, logo, color);

          await getPlaiceholder(processProds.image).then(
            ({ base64 }) =>
              (processProds = {
                ...processProds,
                imageBlur: base64,
              })
          );
          const passLogos = [];
          for (let ppl = 0; ppl < processProds.logos.length; ppl++) {
            const image = `${processProds.logos[ppl].imageColorRoot}${color}.jpg`;
            if (processProds.logos[ppl].colors.indexOf(color) < 0) {
              continue;
            }
            if (myMemo.hasOwnProperty(image)) {
              passLogos.push(myMemo[image]);
              continue;
            }

            const link =
              `${processProds.logos[ppl].link}/${color}`.toLowerCase();
            let logosObj = await getPlaiceholder(image).then(({ base64 }) => {
              return {
                colors: processProds.logos[ppl].colors,
                logo: processProds.logos[ppl].logo,
                link,
                image,
                imageBlur: base64,
              };
            });
            myMemo[image] = logosObj;
            passLogos.push(logosObj);
          }
          delete processProds.imageRoot;
          delete processProds.category;
          delete processProds.tags;
          fs.writeFileSync(
            filePath,
            JSON.stringify(
              {
                ...processProds,
                type: processProds.type.type,
                name_root: processProds.type.name,
                logos: passLogos,
              },
              null,
              2
            )
          );
        }
      }
    }
  }
}
(async () => {
  try {
    await productNew();
  } catch (err) {
    console.log('write productNew', err);
  } finally {
    console.log('DONE: productNew');
  }
})();
