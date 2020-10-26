import Vue from 'vue';
import App from './components/pages/App.vue';
import store from './js/store';
import styles from './scss/reset.scss';

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    styles,
    store,
    render(h) {
      return h(App);
    },
  });
  app.$mount('#app');
});
