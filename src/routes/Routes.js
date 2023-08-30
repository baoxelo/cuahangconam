/** @format */

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import config from '~/configs';
import Cart from '~/pages/Cart';
import Store from '~/pages/Store';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.cart, component: Cart },
];
const privateRoutes = [{ path: config.routes.store, component: Store }];
export { publicRoutes, privateRoutes };
