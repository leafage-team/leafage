import http from 'node:http';
import finalhandler from 'finalhandler';
import enableDestroy from 'server-destroy';
import util from 'node:util';
import { ServerError, utils } from '@leafage/toolkit';

class Listener {
  constructor({ app, host, port }) {
    this.app = app;
    this.host = host;
    this.port = port;

    this.server = null;
  }

  get listening() {
    return !!this.server?.listening;
  }

  async close() {
    // Destroy server by forcing every connection to be closed
    if (this.listening) {
      await this.server.destroy();
    }

    this.server.removeAllListeners();
    this.server = null;
  }

  async listen() {
    if (this.listening) return;

    this.server = http.createServer((req, res) => this.app(req, res, finalhandler(req, res)));

    // Call server.listen
    try {
      await new Promise((resolve, reject) => {
        this.server.once('error', reject);
        this.server.listen(this.port, this.host, (error) => {
          this.server.off('error', reject);

          if (error) {
            reject(error);
          } else {
            resolve(this.server);
          }
        });
      });
    } catch (error) {
      throw new ServerError(error);
    }

    // Enable destroy support
    enableDestroy(this.server);
    this.server.destroy = util.promisify(this.server?.destroy || utils.emptyFn);
  }
}

export { Listener };
