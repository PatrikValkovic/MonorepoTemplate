import 'reflect-metadata';
import * as process from 'process';
import { AddressInfo } from 'net';
import { createServer } from '@agora/server';
import { createGlobalDI, createGlobalModule } from '@agora/be-business-logic';

const main = async () => {
    const container = await createGlobalDI(createGlobalModule());
    const { http } = await createServer(container);

    const listener = http.listen(parseInt(process.env.PORT || 'x', 10), '0.0.0.0', () => {
        const address = listener.address() as AddressInfo;
        console.log(`✅ server is listening on http://${address.address}:${address.port}`);
    });
};

main()
    .catch(error => {
        console.error('❌ error running the application');
        console.error(error);
        process.exit(1);
    });
