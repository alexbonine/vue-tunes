import Vue from 'vue';

Vue.filter('yesNo', (bool = false) => {
  return bool ? 'Yes' : 'No';
});
