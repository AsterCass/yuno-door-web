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
            meta: {
                title: 'AsterCasc Home'
            },
        },
        {
            path: "/article",
            children: [
                {
                    path: 'detail',
                    name: "adminArticleDetail",
                    component: AdminArticleDetail,
                    meta: {
                        title: '技术备录'
                    },
                    props: ($route) => ({
                        articleId: $route.query.articleId,
                    })
                },
                {
                    path: 'list',
                    name: "adminArticleList",
                    component: AdminArticleList,
                    meta: {
                        title: '技术备录'
                    },
                }
            ]
        },
        {
            path: '/essay/list',
            name: "adminEssayList",
            component: AdminEssayList,
            meta: {
                title: '生活题记'
            },
        },
        {
            path: "/:catchAll(.*)",
            name: "notFound",
            component: NotFound
        },
    ],
});


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

router.afterEach(() => {
    window.scrollTo(0, 0)
})

export default router;
