import { createApp } from "vue";
import App from "./components/App.vue";
import Components from "./components";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

const app = createApp(App);

for (const [key, value] of Object.entries(Components)) {
	app.component(key, value);
}

app.use(store).use(router).mount("#app");
