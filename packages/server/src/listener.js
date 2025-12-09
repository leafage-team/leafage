import http from 'node:http';
import finalhandler from 'finalhandler';
import enableDestroy from 'server-destroy';
import { runWithContext, ServerError, utils } from '@leafage/toolkit';
import { InjectContext } from './injectContext';

class Listener {
  constructor(server) {
    this.app = server.app;
    this.host = server.host;
    this.port = server.port;
    this.injectContext = new InjectContext(server);

    this.instance = null;
  }

  get listening() {
    return !!this.instance?.listening;
  }

  async close() {
    // Destroy server by forcing every connection to be closed
    if (this.listening) {
      await this.instance.destroy();
    }

    this.instance.removeAllListeners();
    this.instance = null;
  }

  async listen() {
    if (this.listening) return;

    this.instance = http.createServer((req, res) => {
      runWithContext(
        this.injectContext,
        () => this.app(req, res, finalhandler(req, res)),
      );
    });

    // Call server.listen
    try {
      await new Promise((resolve, reject) => {
        this.instance.once('error', reject);
        this.instance.listen(this.port, this.host, (error) => {
          this.instance.off('error', reject);

          if (error) {
            reject(error);
          } else {
            resolve(this.instance);
          }
        });
      });
    } catch (error) {
      throw new ServerError(error);
    }

    // Enable destroy support
    enableDestroy(this.instance);
    this.instance.destroy = utils.promisify(this.instance?.destroy);
  }
}

export { Listener };
