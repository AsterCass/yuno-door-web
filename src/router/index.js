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
import AdminMessageBoard from "@/pages/AdminMessageBoard.vue";
import CaskSteamSearchList from "@/views/CaskSteamSearchList.vue";
import CaskSqlKotlinGenerator from "@/views/CaskSqlKotlinGenerator.vue";
import AdminToolsTabPanel from "@/pages/AdminToolsTabPanel.vue";
import CaskTimestampConverter from "@/views/CaskTimestampConverter.vue";
import CaskQrcodeGenerator from "@/views/CaskQrcodeGenerator.vue";
import CaskMd5Encrypt from "@/views/CaskMd5Encrypt.vue";
import CaskImgBase64Converter from "@/views/CaskImgBase64Converter.vue";

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
                        title: 'AsterCasc-技术备录'
                    },
                    props: ($route) => ({
                        articleId: $route.query.articleId,
                    }),
                },
                {
                    path: 'list',
                    name: "adminArticleList",
                    component: AdminArticleList,
                    meta: {
                        title: 'AsterCasc-技术备录'
                    },
                    props: ($route) => ({
                        authorId: $route.query.author,
                    }),
                }
            ]
        },
        {
            path: '/tools',
            name: 'adminToolsTabPanel',
            component: AdminToolsTabPanel,
            children: [
                {
                    path: 'imgBase64',
                    name: 'caskImgBase64Converter',
                    component: CaskImgBase64Converter,
                    meta: {
                        title: 'AsterCasc-Base64图片转换'
                    },
                },
                {
                    path: 'md5',
                    name: 'caskMd5Encrypt',
                    component: CaskMd5Encrypt,
                    meta: {
                        title: 'AsterCasc-在线MD5加密'
                    },
                },
                {
                    path: 'qrCode',
                    name: 'caskQrcodeGenerator',
                    component: CaskQrcodeGenerator,
                    meta: {
                        title: 'AsterCasc-在线生成二维码工具'
                    },
                },
                {
                    path: 'timestamp',
                    name: 'caskTimestampConverter',
                    component: CaskTimestampConverter,
                    meta: {
                        title: 'AsterCasc-在线时间戳转换工具'
                    },
                },
                {
                    path: 'code/sql2kotlin',
                    name: 'caskSqlKotlinGenerator',
                    component: CaskSqlKotlinGenerator,
                    meta: {
                        title: 'AsterCasc-SQL转Kotlin类'
                    },
                },
                {
                    path: 'steam/search',
                    name: 'caskSteamSearchList',
                    component: CaskSteamSearchList,
                    meta: {
                        title: 'AsterCasc-Steam史低查询工具'
                    },
                    // props: ($route) => ({
                    //     gameKey: $route.query.gameKey,
                    // }),
                }
            ]
        },
        {
            path: '/essay/list',
            name: "adminEssayList",
            component: AdminEssayList,
            meta: {
                title: 'AsterCasc-生活题记'
            },
            props: ($route) => ({
                authorId: $route.query.author,
            }),
        },
        {
            path: '/privacy',
            name: 'adminPrivacyPolicy',
            component: AdminPrivacyPolicy,
            meta: {
                title: 'AsterCasc-隐私政策'
            }
        },
        {
            path: '/profile',
            name: 'adminProfile',
            component: AdminProfile,
            meta: {
                title: 'AsterCasc-网站简介'
            }
        },
        {
            path: '/space',
            name: 'adminSpace',
            component: AdminSpace,
            meta: {
                title: 'AsterCasc-个人中心'
            },
            props: ($route) => ({
                userId: $route.query.id,
            })
        },
        {
            path: '/board',
            name: 'messageBoard',
            component: AdminMessageBoard,
            meta: {
                title: 'AsterCasc-留言板'
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
                        title: 'AsterCasc-视频库'
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
                        title: 'AsterCasc-视频播放'
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
