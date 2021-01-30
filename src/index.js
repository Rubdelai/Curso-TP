import '@babel/polyfill';

import app from './server';

async function main() {
    await app.listen(app.get('puerto'));
    console.log('Server en el puerto', app.get('puerto'));
};

main();