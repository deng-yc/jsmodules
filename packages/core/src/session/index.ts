import di from '@jsmodules/di';
import { kvManager } from '@jsmodules/storage';

import { idgenerator } from '../idgenerator';
import { Pipeline } from '../pipeline';
import { Task } from '../tasks';
import { LoginMethodOptions, TokenService } from '../token';

type UserPart = {
  [key: string]: any;
};

const interceptors = {
  getUser: new Pipeline<UserPart>(),
  getLoginedUser: new Pipeline<any>(),
  getStorageKey: new Pipeline<string>(),
};

export class SessionService {
  static diOptions = di.options({
    name: 'SessionService',
  });

  static get interceptors() {
    return interceptors;
  }

  private get sessionStore() {
    return kvManager.get('SessionService', { encrypted: false });
  }

  private get tokenService() {
    return di.getInstance(TokenService);
  }

  isAuthenticated: boolean = null;

  _key = idgenerator.nextId();

  user: any = null;

  private get storageKey() {
    return interceptors.getStorageKey.execSync() || 'current_user';
  }

  getLoginedUser<T>(): Promise<T> {
    return this.initAsync().then(() => {
      return this.user;
    });
  }

  loginAsync(options: LoginMethodOptions) {
    return this.tokenService
      .login(options)
      .then(() => {
        return this.updateAsync();
      })
      .then(() => {
        this.isAuthenticated = true;
      })
      .catch(err => {
        this.user = null;
        this.isAuthenticated = false;
        return Promise.reject(err);
      });
  }

  getStorageUser() {
    return this.sessionStore.getAsync(this.storageKey);
  }

  logoutAsync() {
    return this.tokenService
      .logout()
      .then(() => {
        return this.sessionStore.removeAsync(this.storageKey);
      })
      .then(() => {
        this.user = null;
        this.isAuthenticated = false;
      });
  }

  updateAsync() {
    return Task.throttleAsync('update-xv7uhjzhq', () => {
      return interceptors.getUser.exec().then(user => {
        this.user = interceptors.getLoginedUser.execSync(user);
        return this.sessionStore.setAsync(this.storageKey, user);
      });
    });
  }

  initAsync() {
    return Task.onceAsync(`init-wdy7i7sqp`, async () => {
      try {
        const access_token = await this.tokenService.getAccessToken();
        if (!access_token) {
          this.isAuthenticated = false;
          return;
        }
        const user = await interceptors.getUser.exec();
        this.user = interceptors.getLoginedUser.execSync(user);
        this.isAuthenticated = true;
      } catch (ex) {
        this.isAuthenticated = false;
        this.user = null;
        console.error(ex);
      }
    });
  }
}
