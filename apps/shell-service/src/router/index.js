import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/NotFound.vue";
import Dashboard from "../views/Dashboard.vue";
import AssetList from "../views/AssetList.vue";
import Transactions from "../views/Transactions.vue";
import { Checkpoints } from "commons/Utils";
import ReportList from "../views/ReportList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: Checkpoints.homePage,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: Checkpoints.assets,
    name: "Assets",
    component: AssetList,
  },
  {
    path: Checkpoints.transactions,
    name: "Transactions",
    component: Transactions,
  },
    {
    path: Checkpoints.reports,
    name: "Reports",
    component: ReportList,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
