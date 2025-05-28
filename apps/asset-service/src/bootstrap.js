import Vue from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import router from './router';

Vue.config.productionTip = false;

// Function untuk mount aplikasi
export const mount = (element, { initialPath, onParentNavigation }) => {
  const vueRouter = router;
  
  // Set initial path jika ada
  if (initialPath) {
    vueRouter.push(initialPath);
  }

  const app = new Vue({
    router: vueRouter,
    render: h => h(App)
  });

  app.$mount(element);

  // Return function untuk komunikasi dengan parent
  return {
    onParentNavigation: ({ pathname }) => {
      const currentPath = vueRouter.currentRoute.path;
      if (currentPath !== pathname) {
        vueRouter.push(pathname);
      }
    },
    unmount: () => {
      appInstance.$destroy();
      if (element instanceof Element) {
        element.innerHTML = '';
      }
    }
  };
};

// Jika berjalan standalone
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#remote');
  if (devRoot) {
    mount(devRoot, {});
  }
}