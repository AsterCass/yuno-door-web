import {createRouter, createWebHistory} from "vue-router";
import AdminDoc from "@/pages/AdminDoc.vue";
import AdminIndex from "@/pages/AdminIndex.vue";
import AdminWx from "@/pages/AdminWx.vue";
import AdminArticle from "@/pages/AdminArticle.vue";

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
        {
            path: "/wx",
            name: "adminWx",
            component: AdminWx,
        },
        {
            path: "/article",
            name: "adminArticle",
            component: AdminArticle,
        },
    ],
});

export default router;
