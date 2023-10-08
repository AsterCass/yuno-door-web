<template>

  <q-dialog v-model="gameDetailShow" position="left" maximized>


    <div class="game-detail-out">
      <div class="game-detail-main" :style="`height: ${gameDetailHeight};width:${gameDetailWidth};`">

        <q-scroll-area delay="100" :style="`height: ${gameDetailMainHeight};width:${gameDetailMainWidth};`">
          <h1>
            {{ gameDetailData.gameName }}
          </h1>
          <p>
            {{ gameDetailData.gameShortDesc }}
          </p>

          <div class="steam-game-desc">

            <q-carousel
                animated
                v-model="gameDetailCurPic"
                arrows
                navigation
                infinite
            >

              <q-carousel-slide v-for="(item, index) in gameDetailData.gameScreenshots" :key="item"
                                :name="index" :img-src="item"/>
            </q-carousel>

            <q-chip v-for="item in gameDetailData.gameCategories" :key="item"
                    square class="glossy shadow-3 q-my-lg" color="grey-10" text-color="grey-4"
                    style="font-weight: 500;">
              {{ item }}
            </q-chip>

            <div class="steam-game-desc-title">
              游戏详情
            </div>
            <div v-html="gameDetailData.gameDesc"></div>
            <div class="steam-game-desc-title">
              语言支持
            </div>
            <div v-html="gameDetailData.supportLang"></div>
            <div class="steam-game-desc-title">
              推荐配置
            </div>
            <div v-html="gameDetailData.gameReq.recommended"></div>
            <div class="steam-game-desc-title">
              最低配置
            </div>
            <div v-html="gameDetailData.gameReq.minimum"></div>
            <div class="row justify-end">
              <h6>
                游戏发行日期：{{ gameDetailData.gameReleaseTime }}
              </h6>
            </div>

          </div>

        </q-scroll-area>

      </div>
    </div>
  </q-dialog>


  <div class="row" style="padding: 5%">
    <div class="col-12 row justify-center">

      <CaskSteamGameCard v-show="!inLoadData" class="col-7 justify-center" style="margin: 0 0 4rem 0;"
                         v-for="item in curGameList" :key="item"
                         :gameIntro="item">
      </CaskSteamGameCard>


      <div v-show="inLoadData" class="col-12 row">
        <div class="col-12 row justify-center q-mb-xl" style="height: 8rem">
          <q-spinner-cube size="8rem" color="black"/>
        </div>
        <div class="col-12 row justify-center text-h5">
          数据查询中...
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>

import {onMounted, onUnmounted, ref} from "vue";
import CaskSteamGameCard from "@/views/CaskSteamGameCard.vue";
import {getPopularGames, searchGames} from "@/api/steam";
import emitter from "@/utils/bus";

let topGameList = ref([])
let curGameList = ref([])
let inLoadData = ref(false)

let gameDetailShow = ref(false)
let gameDetailHeight = ref("0px")
let gameDetailWidth = ref("0px")
let gameDetailMainHeight = ref("0px")
let gameDetailMainWidth = ref("0px")
let gameDetailCurPic = ref(0)

let gameDetailData = ref(
    {
      steamId: "123",
      gameName: "赛博朋克 2077",
      gameDesc: '<h1>《赛博朋克 2077：往日之影》捆绑包</h1><p><a href="https://store.steampowered.com/bundle/32470" target="_blank" rel=""  ><img src="https://cdn.akamai.steamstatic.com/steam/apps/1091500/extras/CP2077_EP1_PhL_PackageBannerSteam_v01_616x670_ZHS.png?t=1695308476" /></a></p><br><h1>看看 CD PROJEKT RED 出品的其他游戏吧</h1><p><a href="https://store.steampowered.com/app/2138330" target="_blank" rel=""  id="dynamiclink_0" >https://store.steampowered.com/app/2138330</a><br><a href="https://store.steampowered.com/app/292030" target="_blank" rel=""  id="dynamiclink_1" >https://store.steampowered.com/app/292030</a><br><a href="https://store.steampowered.com/app/1284410" target="_blank" rel=""  id="dynamiclink_2" >https://store.steampowered.com/app/1284410</a></p><br><h1>关于游戏</h1><img src="https://cdn.akamai.steamstatic.com/steam/apps/1091500/extras/UPDATE_2.0_600x225_ZHS.jpg?t=1695308476" /><br><br>《赛博朋克 2077》的舞台位于大都会夜之城，是一款在开放世界动作冒险角色扮演游戏。您扮演一位赛博朋克雇佣兵, 身陷绝地求生、不成功便成仁的险境。经过改进的同时更有全新免费额外内容加入。接受任务、累积声望、解锁升级，自定义您的人物和玩法。玩家经营的人际关系和做出的选择将会改变剧情的走向和身边的世界。这里是传奇诞生的地方。您的传奇又在哪里？<br><br><img src="https://cdn.akamai.steamstatic.com/steam/apps/1091500/extras/UPDATE_2.0_empty_600x225.jpg?t=1695308476" /><br><br>探索 2.0 更新<br>体验全新和彻底改动的游戏机制，满足你最狂野的赛博朋克幻想。免费 2.0 更新将带给你全新玩法的《赛博朋克 2077》，包括完全重做的专长和义体系统、刺激的载具战斗和车辆追逐、改善后的警察系统、强化敌人AI等更多新内容。<br><br><img src="https://cdn.akamai.steamstatic.com/steam/apps/1091500/extras/NGU_CREATE_YOUR_OWN_CYBERPUNK_ZHS.png?t=1695308476" /><br><br>创造属于你的赛博朋克<br>装备赛博增强科技，化身城市法外之徒，在夜之城的街头谱写属于你的传奇。<br><br><img src="https://cdn.akamai.steamstatic.com/steam/apps/1091500/extras/NGU_EXPLORE_THE_CITY_OF_FUTURE_ZHS.png?t=1695308476" /><br><br>探索未来都市<br>夜之城充斥着丰富的活动，看不完的风景，以及各式各样的人。去哪里，什么时候去，怎么去，全都取决于你自己。<br><br><img src="https://cdn.akamai.steamstatic.com/steam/apps/1091500/extras/NGU_BUILD_YOUR_LEGEND_ZHS.png?t=1695308476" /><br><br>打造您的传奇<br>展开大胆的冒险，和令人难忘的角色起建立亲密关系。您作出的选择决定了他们最终的命运。<br><br><img src="https://cdn.akamai.steamstatic.com/steam/apps/1091500/extras/NGU_EQUIPPED_WITH_IMPROVEMENTS_ZHS.png?t=1695308476" /><br><br>推出改良内容<br>体验《赛博朋克 2077》在游戏性、经济系统、城市、地图使用等方面的大量改良内容。<br><br><img src="https://cdn.akamai.steamstatic.com/steam/apps/1091500/extras/NGU_INCLUDES_FREE_ADDITIONAL_CONTENT_ZHS.png?t=1695308476" /><br><br>领取专属道具<br>由CD PROJEKT RED游戏激发灵感而来的游戏内好物及数字奖励，此为“我的奖励”的一部分。<br><br>前往 <a href="https://steamcommunity.com/linkfilter/?url=http://CYBERPUNK.NET" target="_blank" rel=" noopener"  >CYBERPUNK.NET</a><br><br><img src="https://cdn.akamai.steamstatic.com/steam/apps/1091500/extras/06._Social-Media_ZHS.png?t=1695308476" />',
      gameShortDesc: "《赛博朋克 2077》是一款开放世界动作冒险 RPG 游戏。故事发生在暗黑未来的夜之城，一座五光十色、危机四伏的超级大都会，权力更迭和无尽的身体改造是这里不变的主题。",
      supportLang: '英语<strong>*</strong>, 法语<strong>*</strong>, 意大利语<strong>*</strong>, 德语<strong>*</strong>, 西班牙语 - 西班牙<strong>*</strong>, 阿拉伯语, 捷克语, 匈牙利语, 日语<strong>*</strong>, 韩语<strong>*</strong>, 波兰语<strong>*</strong>, 葡萄牙语 - 巴西<strong>*</strong>, 俄语<strong>*</strong>, 简体中文<strong>*</strong>, 西班牙语 - 拉丁美洲, 泰语, 繁体中文, 土耳其语, 乌克兰语<br><strong>*</strong>具有完全音频支持的语言',
      gameReq: {
        minimum: '<strong>最低配置:</strong><br><ul class="bb_ul"><li>需要 64 位处理器和操作系统<br></li><li><strong>操作系统:</strong> 64-bit Windows 10<br></li><li><strong>处理器:</strong> Core i7-6700 or Ryzen 5 1600<br></li><li><strong>内存:</strong> 12 GB RAM<br></li><li><strong>显卡:</strong> GeForce GTX 1060 6GB or Radeon RX 580 8GB or Arc A380<br></li><li><strong>DirectX 版本:</strong> 12<br></li><li><strong>存储空间:</strong> 需要 70 GB 可用空间<br></li><li><strong>附注事项:</strong> SSD required. Attention: In this game you will encounter a variety of visual effects that may provide seizures or loss of consciousness in a minority of people. If you or someone you know experiences any of the above symptoms while playing, stop and seek medical attention immediately.</li></ul>',
        recommended: '<strong>推荐配置:</strong><br><ul class="bb_ul"><li>需要 64 位处理器和操作系统<br></li><li><strong>操作系统:</strong> 64-bit Windows 10<br></li><li><strong>处理器:</strong> Core i7-12700 or Ryzen 7 7800X3D<br></li><li><strong>内存:</strong> 16 GB RAM<br></li><li><strong>显卡:</strong> GeForce RTX 2060 SUPER or Radeon RX 5700 XT or Arc A770<br></li><li><strong>DirectX 版本:</strong> 12<br></li><li><strong>存储空间:</strong> 需要 70 GB 可用空间<br></li><li><strong>附注事项:</strong> SSD required.</li></ul>',
      },
      gameCategories: ["单人", "Steam 成就", "Steam 集换式卡牌", "部分支持控制器", "Steam 云", "角色扮演"],
      gameGenres: ["角色扮演"],
      gameScreenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_b529b0abc43f55fc23fe8058eddb6e37c9629a6a.600x338.jpg?t=1695308476",
        "https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_8640d9db74f7cad714f6ecfb0e1aceaa3f887e58.600x338.jpg?t=1695308476",
        "https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_9284d1c5b248726760233a933dbb83757d7d5d95.600x338.jpg?t=1695308476",
        "https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_4bda6f67580d94832ed2d5814e41ebe018ba1d9e.600x338.jpg?t=1695308476",],
      gameMovies: [
        {
          thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/256904576/movie.293x165.jpg?t=1662480328",
          url: "http://cdn.akamai.steamstatic.com/steam/apps/256904576/movie480.mp4?t=1662480328",
        },
        {
          thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/256876053/movie.293x165.jpg?t=1646231493",
          url: "http://cdn.akamai.steamstatic.com/steam/apps/256876053/movie480.mp4?t=1646231493",
        },
      ],
      gameReleaseTime: "2020 年 12 月 9 日",
    },
)

function searchPopularGameMethod() {
  getPopularGames().then(res => {
    if (200 === res.status) {
      topGameList.value.push(...res.data.data)
      curGameList.value.splice(0, curGameList.value.length)
      curGameList.value.push(...res.data.data)
    }
  })
}

function searchGameListMethod(searchGameKeyword) {
  inLoadData.value = true
  curGameList.value.splice(0, curGameList.value.length)
  if (!searchGameKeyword) {
    curGameList.value.push(...topGameList.value)
    inLoadData.value = false
    return
  }
  let param = {name: searchGameKeyword}
  searchGames(param).then(res => {
    if (200 === res.status) {
      curGameList.value.push(...res.data.data)
      inLoadData.value = false
    }
  })
}

function showGameDetailMethod(steamId) {
  console.log(steamId)
  console.log(gameDetailData.value)
  gameDetailShow.value = true
}

function setBaseData() {
  gameDetailHeight.value = Math.round(0.8 * document.documentElement.clientHeight) + 'px'
  gameDetailWidth.value = Math.round(0.55 * document.documentElement.clientWidth) + 'px'
  gameDetailMainHeight.value = Math.round(0.75 * document.documentElement.clientHeight) + 'px'
  gameDetailMainWidth.value = Math.round(0.55 * document.documentElement.clientWidth) + 'px'
}

onMounted(() => {
  setBaseData()
  emitter.on('searchArticleList', searchGameListMethod)
  emitter.on('showGameDetail', showGameDetailMethod)
  searchPopularGameMethod()

})

onUnmounted(() => {
  emitter.off('searchArticleList', searchGameListMethod)
  emitter.off('showGameDetail', showGameDetailMethod)
})

</script>

<style lang="scss" scoped>
@import "@/styles/game.html.css";
@import "@/styles/cask-primary-style.scss";

.game-detail-out {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;

  .game-detail-main {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: inset 0 0 1px 1px rgba(254, 254, 254, 0.9), 0 20px 27px 0 rgba(0, 0, 0, 0.05);
    backdrop-filter: saturate(200%) blur(30px);
    opacity: 0.95;

    h1 {
      font-size: 1.875rem;
      line-height: 1.375;
      font-weight: 600;
      color: $cask_dark_jungle_green;
      margin-bottom: 1rem;
      margin-top: 0;
      font-family: Roboto Slab, sans-serif;
      text-transform: unset;
      text-align: center;
    }

  }

}

</style>