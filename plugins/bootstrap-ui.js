/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Vue from "vue";
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import { BFormRadioGroup, BModal, ModalPlugin } from "bootstrap-vue";

Vue.component("BFormRadioGroup", BFormRadioGroup);
Vue.component("BModal", BModal);

Vue.use(ModalPlugin);
