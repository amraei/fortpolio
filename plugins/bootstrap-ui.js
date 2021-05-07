/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Vue from "vue";
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {
  BCalendar,
  BDropdown,
  BFormRadioGroup,
  BModal,
  BTime,
  ModalPlugin
} from "bootstrap-vue";

Vue.component("BCalendar", BCalendar);
Vue.component("BDropdown", BDropdown);
Vue.component("BFormRadioGroup", BFormRadioGroup);
Vue.component("BModal", BModal);
Vue.component("BTime", BTime);

Vue.use(ModalPlugin);
