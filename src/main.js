import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import uviewPlus, { setConfig } from 'uview-plus'
import {createPinia} from "pinia";
export function createApp() {
	const app = createSSRApp(App);
	const pinia = createPinia();
	app.use(pinia);
	app.use(uviewPlus)
	return {
		app,
	};
}
