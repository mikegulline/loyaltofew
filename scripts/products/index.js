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

// store.json
try {
  const filePath = path.join(__dirname, '../../public/data/store.json');
  (async () => {
    fs.writeFileSync(
      filePath,
      JSON.stringify(
        {
          function: 'getStore()',
          output: '/public/data/store.json',
          ...getStore(),
        },
        null,
        2
      )
    );
  })();
} catch (err) {
  console.log('write store.json', err);
}

// categories.json
try {
  const filePath = path.join(__dirname, '../../public/data/categories.json');
  const categories = getStore()['categories'].map(({ category }) =>
    getCategory(category)
  );
  (async () => {
    fs.writeFileSync(
      filePath,
      JSON.stringify(
        {
          function: 'getCategory(category) []Array',
          output: '/public/data/categories.json',
          categories: [...categories],
        },
        null,
        2
      )
    );
  })();
} catch (err) {
  console.log('write categories.json', err);
}

// catagory single
try {
  (async () =>
    getStore()['categories'].map(({ category }) =>
      (async () => {
        const filePath = path.join(
          __dirname,
          `../../public/data/${category.toLowerCase()}.json`
        );
        fs.writeFileSync(
          filePath,
          JSON.stringify(
            {
              function: 'getCategory(category) singles',
              output: '/public/data/categories.json',
              ...getCategory(category),
            },
            null,
            2
          )
        );
      })()
    ))();
} catch (err) {
  console.log('write categories.json', err);
}

// types.json
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

// color-logo.json
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
                    await getPlaiceholder(l.image).then(
                      ({ base64 }) => (logosObj = { ...l, imageBlur: base64 })
                    );
                    return logosObj;
                  }
                );
                Promise.all(processLogos).then((responses) => {
                  fs.writeFileSync(
                    filePath,
                    JSON.stringify(
                      {
                        function: 'getColor(category, type, logo, color)',
                        output: `/public/data/${category.toLowerCase()}-${type.toLowerCase()}-${logo.toLowerCase()}-${color.toLowerCase()}.json`,
                        ...{ ...processProds, logos: responses },
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
}

console.log('Done.');
