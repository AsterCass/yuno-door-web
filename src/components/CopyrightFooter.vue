<template>
  <div class="footer">
    <ul class="copyright">
      <li>&copy; 2020-2023 astercasc.com 版权所有 互联网ICP备案：
        <a target="_blank" href="https://beian.miit.gov.cn/">浙ICP备2022023127号</a>
      </li>
      <li>
        <q-icon name="fa-brands fa-weibo"/>
        新浪微博: <a target="_blank" href="https://weibo.com/u/5177219464">AsterCass</a>
      </li>
      <li>
        <q-icon name="eva-github"/>
        Github: <a target="_blank" href="https://github.com/AsterCass?tab=repositories">AsterCass</a>
      </li>
      <li>
        <q-icon name="fa-brands fa-qq"/>
        QQ: 404919617
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CopyrightFooter"
}
</script>

<style lang="scss" scoped>
@import "@/styles/cask.sass";

.footer {
  //background: $cask_dune;
  background-color: $cask_dark_jungle_green;
  padding: 0.5em 0 1.5em 0;

  a {
    color: inherit;
  }

  .copyright {
    color: #bbb;
    font-size: 0.9em;
    margin: 2em 0 0 0;
    padding: 0;
    text-align: center;
  }

  .copyright li {
    border-left: solid 1px rgba(144, 144, 144, 0.25);
    display: inline-block;
    list-style: none;
    margin-left: 1.5em;
    padding-left: 1.5em;
  }

  .copyright li:first-child {
    border-left: 0;
    margin-left: 0;
    padding-left: 0;
  }

  .icons a {
    color: #bbb;
  }
}

</style>