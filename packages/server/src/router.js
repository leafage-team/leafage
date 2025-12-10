import http from 'node:http';
import ServerRouter from 'router';
import finalhandler from 'finalhandler';
import enableDestroy from 'server-destroy';
import { error, utils } from '@leafage/toolkit';

class Router extends ServerRouter {
  #listener = null;

  constructor(options) {
    super(options);

    this.stack = [];
  }

  get listening() {
    return !!this.#listener?.listening;
  }

  async listen(...args) {
    if (this.listening) return;

    this.#listener = http.createServer((req, res) => this.handle(req, res, finalhandler(req, res)));

    // listen
    try {
      await new Promise((resolve, reject) => {
        this.#listener.once('error', reject);
        this.#listener.listen(...args, (err) => {
          this.#listener.off('error', reject);

          if (err) {
            reject(err);
          } else {
            resolve(this.#listener);
          }
        });
      });
    } catch (err) {
      throw new error.ServerError(err);
    }

    // Enable destroy support
    enableDestroy(this.#listener);
    this.#listener.destroy = utils.promisify(this.#listener?.destroy);
  }

  async close() {
    if (this.listening) {
      await this.#listener.destroy();
    }

    this.stack = [];
    this.#listener.removeAllListeners();
    this.#listener = null;
  }
}

export { Router };
