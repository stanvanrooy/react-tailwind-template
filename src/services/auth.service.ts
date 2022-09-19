import { AuthenticationContext } from "@elfsquad/authentication";
import { User } from "../models/user";
import { authenticationOptions } from "../config/authentication";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getUser = async (): Promise<User> => {
  const userStore = UserStore.getInstance();

  while (!userStore.user) {
    await delay(100);
  }

  return userStore.user;
}

export const initAuthenticationContext = () => {
  const authenticationContext = ContextStore.getInstance().context;
  const userStore = UserStore.getInstance();

  authenticationContext
    .onSignIn()
    .then(() => authenticationContext.getAccessToken())
    .then(token => {
      const user = JSON.parse(atob(token.split('.')[1]));
      userStore.user = {
        name: user.name,
      };
    })
}

export const login = () => {
  const authenticationContext = ContextStore.getInstance().context;
  authenticationContext
    .isSignedIn()
    .then(isSignedIn => {
      if (!isSignedIn) {
        authenticationContext.signIn()
      }
    });
}

export const getToken = () => {
  const authenticationContext = ContextStore.getInstance().context;
  return authenticationContext.getAccessToken();
}


class ContextStore {
  private static instance: ContextStore;
  private _context: AuthenticationContext;

  private constructor() {
    this._context = new AuthenticationContext(authenticationOptions);
  }

  public static getInstance(): ContextStore {
    if (!ContextStore.instance) {
      ContextStore.instance = new ContextStore();
    }

    return ContextStore.instance;
  }

  public get context(): AuthenticationContext {
    return this._context;
  }
}

class UserStore {
  private static instance: UserStore;
  private _user: User;

  private constructor() {}

  public static getInstance(): UserStore {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }

    return UserStore.instance;
  }

  public get user(): User {
    return this._user;
  }

  public set user(user: User) {
    this._user = user;
  }
}

