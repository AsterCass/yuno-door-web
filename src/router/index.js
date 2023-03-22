import {createRouter, createWebHashHistory} from "vue-router";
import AdminIndex from "@/pages/AdminIndex.vue";
import AdminArticleList from "@/pages/AdminArticleList.vue";
import AdminArticleDetail from "@/pages/AdminArticleDetail.vue";
import AdminEssayList from "@/pages/AdminEssayList.vue";
import NotFound from "@/pages/NotFound.vue";

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "adminIndex",
            component: AdminIndex,
        },
        {
            path: "/article",
            children: [
                {
                    path: 'detail',
                    name: "adminArticleDetail",
                    component: AdminArticleDetail,
                    props: ($route) => ({
                        articleId: $route.query.articleId,
                    })
                },
                {
                    path: 'list',
                    name: "adminArticleList",
                    component: AdminArticleList
                }
            ]
        },
        {
            path: '/essay/list',
            name: "adminEssayList",
            component: AdminEssayList
        },
        {
            path: "/:catchAll(.*)",
            name: "notFound",
            component: NotFound
        },
    ],
});

router.afterEach(() => {
    window.scrollTo(0, 0)
})

export default router;
