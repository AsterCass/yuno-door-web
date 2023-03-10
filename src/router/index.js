import {createRouter, createWebHistory} from "vue-router";
import AdminDoc from "@/pages/AdminDoc.vue";
import AdminIndex from "@/pages/AdminIndex.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "adminIndex",
            component: AdminIndex,
        },
        {
            path: "/doc",
            name: "adminDoc",
            component: AdminDoc,
        },
    ],
});

export default router;
