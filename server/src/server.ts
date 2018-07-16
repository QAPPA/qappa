import * as express from 'express';
import {
    ServerLoader,
    ServerSettings,
    GlobalAcceptMimesMiddleware
} from '@tsed/common';
import path = require('path');

@ServerSettings({
    rootDir: path.resolve(__dirname),
    mount: {
        '/': '${rootDir}/controllers/**/*.ts'
    },
    acceptMimes: ['application/json'],
    httpPort: 3001,
    httpsPort: 3002
})
export default class Server extends ServerLoader {
    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public $onMountingMiddlewares(): void | Promise<any> {
        const bodyParser = require('body-parser');
        const compress = require('compression');
        const methodOverride = require('method-override');

        this
            .use(GlobalAcceptMimesMiddleware)
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({ extended: true }));

        return null;
    }

    public $onReady() {
        console.log('Server started...');
    }

    public $onServerInitError(err) {
        console.error(err);
    }
}
