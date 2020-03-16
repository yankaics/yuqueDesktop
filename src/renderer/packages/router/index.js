import Vue from 'vue'
import VueRouter from 'vue-router'
import Loadable from 'helper/Loadable';

Vue.use(VueRouter)

const __DEV__ = process.env.NODE_ENV === 'development';
let routerCreated = false;
const routes = [];
const requireComponent = require.context(
  // Look for files in the current directory
  '@/pages',
  // Do not look in subdirectories
  true,
  // Only include "_base-" prefixed .vue files
  /\/_route\.js$/
);

function registerSingleRoute(config, pageName) {
  if (__DEV__ && !config.name) {
    throw new Error(`name is undefined, please set name for route ${pageName}`);
  }

  registerRoute(config.name, Loadable(config.component), config);
}


// For each matching file name...
requireComponent.keys().forEach(fileName => {
  // Get the component config
  const routeConfig = requireComponent(fileName).default;
  let match = fileName.match(/^\.\/([\w-]+?)\//);

  if (!match) {
    throw new Error(`页面文件夹只允许使用 "-" 作为分割符`);
  }

  const pageName = match[1];
  // 生产环境不打包私有路由
  if ((routeConfig.private || pageName.toLowerCase() === 'local') && !__DEV__) return;

  if (Object.prototype.toString.call(routeConfig) === '[object Array]') {
    routeConfig.forEach(config => registerSingleRoute(config, pageName));
  } else {
    registerSingleRoute(routeConfig, pageName);
  }
});


export function registerRoute(name, component, config) {
  if (__DEV__ && routerCreated) {
    throw new Error('请在 createRouter 前调用 registerRoute 注册路由');
  }

  let routeName = name;
  let parent = routes;
  if (Object.prototype.toString.call(name) === '[object Array]') {
    const names = name.slice();
    routeName = names.pop();

    while (names.length) {
      const parentName = names.shift();
      parent = parent.find(route => route.name === parentName);
      if (!parent) {
        throw new Error(`找不到父路由 ${parentName}. ${name.join('>')}`);
      }

      if (!parent.children) {
        parent.children = [];
      }
      parent = parent.children;
    }
  }

  registerChildRoute(
    {
      ...config,
      component,
      name: routeName,
    },
    parent
  );
}

function registerChildRoute(route, parent) {
  parent.push(route);
}





// export default createRouter({
//   mode: 'history',
// });



export default new VueRouter({
  // mode: 'history',
  mode: 'hash',
  routes,
});


// export default new VueRouter({
//   routes: [
//     {
//       path: '/',
//       name: 'login',
//       // component: require('@/pages/Login').default,
//       component: () => import(/* webpackChunkName: "Login" */ '@/pages/Login')
//     },
//     {
//       path: '*',
//       redirect: '/'
//     }
//   ]
// })
