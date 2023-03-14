import {createRouter, createWebHistory} from "vue-router";
import AdminDoc from "@/pages/AdminDoc.vue";
import AdminIndex from "@/pages/AdminIndex.vue";
import AdminWx from "@/pages/AdminWx.vue";
import AdminArticleList from "@/pages/AdminArticleList.vue";
import AdminArticleDetail from "@/pages/AdminArticleDetail.vue";
import AdminFlexBox from "@/pages/AdminFlexBox.vue";

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
            children: [
                {
                    path: 'detail',
                    name: "adminArticleDetail",
                    component: AdminArticleDetail
                },
                {
                    path: 'list',
                    name: "adminArticleList",
                    component: AdminArticleList
                }
            ]
        },
        {
            path: "/flexBox",
            name: "flexBox",
            component: AdminFlexBox
        },

    ],
});

export default router;
