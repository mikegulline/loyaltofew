const {
  getStore,
  getCategory,
  getType,
  getLogo,
  getColor,
} = require('./models.js');
const { getPlaiceholder } = require('plaiceholder');

const path = require('path');
const fs = require('fs');

try {
  const filePath = path.join(__dirname, '../../public/data/menu.json');
  const menu = getStore()['categories'].map(
    ({ name, link, products: prod }) => {
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
    }
  );

  const menuRest = [
    { name: 'About', location: '/about' },
    { name: 'Contact', location: '/contact' },
    { name: 'Orders', location: '/orders' },
  ];

  (async () => {
    fs.writeFileSync(filePath, JSON.stringify([...menu, ...menuRest], null, 2));
  })();
} catch (err) {
  console.log('write store.json', err);
}

// /public/data/store-new.json
try {
  const filePath = path.join(__dirname, '../../public/data/store-new.json');
  (async () => {
    const store = getStore();
    const categories = await store.categories.map(
      async ({ category, name, link, meta, products: processProds }) => {
        const products = await processProds.map(
          async ({ name, type, link, image, logos: l, colors }) => {
            let imageBlur = '';
            await getPlaiceholder(image).then(
              ({ base64 }) => (imageBlur = base64)
            );
            const logos = l.map(({ logo }) => ({ logo }));
            return { name, type, link, image, imageBlur, logos, colors };
          }
        );
        return Promise.all(products).then((res) => ({
          category,
          name,
          link,
          meta,
          products: res,
        }));
      }
    );
    Promise.all(categories).then((res) => {
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
  })();
} catch (err) {
  console.log('write store.json', err);
}

// /public/data/mens.json
try {
  (async () =>
    getStore()['categories'].map(({ category: cat }) =>
      (async () => {
        const filePath = path.join(
          __dirname,
          `../../public/data/${cat.toLowerCase()}.json`
        );
        ///////////////

        ///////////////
        const category = getCategory(cat);
        const products = await category.products.map(
          async ({ type, colors, name, link, image, logos: processLogos }) => {
            const logos = await processLogos.map(
              async ({ link, linkColor, image, logo }) => {
                let imageBlur = '';
                await getPlaiceholder(image).then(
                  ({ base64 }) => (imageBlur = base64)
                );

                return {
                  logo,
                  link,
                  // linkColor,
                  image,
                  imageBlur,
                };
              }
            );
            return Promise.all(logos).then((res) => ({
              // type,
              name,
              link: `${category.link}/${type}`.toLocaleLowerCase(),
              // link,
              // image,
              logos: res,
              colors,
            }));
          }
        );
        Promise.all(products).then((res) => {
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
      })()
    ))();
} catch (err) {
  console.log('write categories.json', err);
}

// /public/data/mens-tee.json
try {
  (async () =>
    getStore()['categories'].map(({ category, products }) => {
      products.map(({ type }) => {
        const filePath = path.join(
          __dirname,
          `../../public/data/${category.toLowerCase()}-${type.toLowerCase()}.json`
        );
        (async () => {
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
        })();
      });
    }))();
} catch (err) {
  console.log('write types.json', err);
}

// /public/data/mens-tee-stamp-green.json
try {
  (async () => {
    const { categories } = getStore();
    categories.map(({ category, products }) =>
      products.map(({ type, logos, colors }) =>
        logos.map(({ logo }) =>
          colors.map((color) => {
            const filePath = path.join(
              __dirname,
              `../../public/data/${category.toLowerCase()}-${type.toLowerCase()}-${logo.toLowerCase()}-${color.toLowerCase()}.json`
            );
            (async () => {
              let processProds = getColor(category, type, logo, color);
              await getPlaiceholder(processProds.image).then(
                ({ base64 }) =>
                  (processProds = { ...processProds, imageBlur: base64 })
              );

              (async () => {
                const processLogos = await processProds.logos.map(
                  async (l, i) => {
                    let logosObj = {};
                    const image = `${l.imageColorRoot}${color}.jpg`;
                    const link = `${l.link}/${color}`.toLowerCase();
                    await getPlaiceholder(image).then(
                      ({ base64 }) =>
                        (logosObj = {
                          logo: l.logo,
                          link,
                          image,
                          imageBlur: base64,
                        })
                    );
                    return logosObj;
                  }
                );
                Promise.all(processLogos).then((responses) => {
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
                        logos: responses,
                      },
                      null,
                      2
                    )
                  );
                });
              })();
            })();
          })
        )
      )
    );
  })();
} catch (err) {
  console.log('write color-logo.json', err);
} finally {
  console.log('Done.');
}
