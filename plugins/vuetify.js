import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
  theme: {
    primary: colors.green.base,
    secondary: colors.grey.lighten5,
    accent: colors.purple.base,
    error: colors.red.base,
    warning: colors.yellow.base,
    info: colors.blue.base,
    success: colors.green.base
  },
});
