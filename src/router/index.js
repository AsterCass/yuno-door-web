import {createRouter, createWebHistory} from "vue-router";
import AdminIndex from "@/pages/AdminIndex.vue";
import AdminArticleList from "@/pages/AdminArticleList.vue";
import AdminArticleDetail from "@/pages/AdminArticleDetail.vue";
import AdminEssayList from "@/pages/AdminEssayList.vue";
import NotFound from "@/pages/NotFound.vue";
import AdminPrivacyPolicy from "@/pages/AdminPrivacyPolicy.vue";
import AdminSpace from "@/pages/AdminSpace.vue";
import NotLogin from "@/pages/NotLogin.vue";
import CaskVideoCollection from "@/views/CaskVideoCollection.vue";
import CaskVideoPlay from "@/views/CaskVideoPlay.vue";
import AdminVideo from "@/pages/AdminVideo.vue";
import NotAuth from "@/pages/NotAuth.vue";
import AdminTest from "@/pages/AdminTest.vue";
import AdminProfile from "@/pages/AdminProfile.vue";
import AdminSteamSearch from "@/pages/AdminSteamSearch.vue";
import AdminCodeGenerator from "@/pages/AdminCodeGenerator.vue";

const router = createRouter({
    // history: createWebHashHistory(process.env.BASE_URL),
    history: createWebHistory(process.env.BASE_URL),
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
            path: "/steam",
            children: [
                {
                    path: 'search',
                    name: "adminSteamSearch",
                    component: AdminSteamSearch,
                    meta: {
                        title: 'Steam游戏检索'
                    },
                },
            ]
        },
        {
            path: '/code/generator',
            name: 'adminCodeGenerator',
            component: AdminCodeGenerator,
            meta: {
                title: '代码生成'
            }
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
            path: '/privacy',
            name: 'adminPrivacyPolicy',
            component: AdminPrivacyPolicy,
            meta: {
                title: '隐私政策'
            }
        },
        {
            path: '/profile',
            name: 'adminProfile',
            component: AdminProfile,
            meta: {
                title: '网站简介'
            }
        },
        {
            path: '/space',
            name: 'adminSpace',
            component: AdminSpace,
            meta: {
                title: '个人中心'
            }
        },
        {
            path: '/video',
            name: 'adminVideo',
            component: AdminVideo,
            children: [
                {
                    path: 'collection',
                    name: 'caskVideoCollection',
                    component: CaskVideoCollection,
                    meta: {
                        title: '视频库'
                    },
                    props: ($route) => ({
                        isSearch: Number($route.query.isSearch),
                        videoColNameLike: $route.query.videoColNameLike,
                    }),
                },
                {
                    path: 'play',
                    name: 'caskVideoPlay',
                    component: CaskVideoPlay,
                    meta: {
                        title: '视频播放'
                    },
                    props: ($route) => ({
                        colId: $route.query.colId,
                        vdoId: $route.query.vdoId,
                    }),
                }
            ]

        },
        {
            path: "/test",
            name: 'test',
            component: AdminTest
        },
        {
            path: "/404",
            name: '404',
            component: NotFound
        },
        {
            path: "/notLogin",
            name: 'notLogin',
            component: NotLogin
        },
        {
            path: "/noAuth",
            name: 'noAuth',
            component: NotAuth
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
