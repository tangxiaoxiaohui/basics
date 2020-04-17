import {mapGetters} from 'vuex'

const SHOW_TYPE = {
};

export default {
  data() {
    return {
      // 全部展示类型
      SHOW_TYPE,
      // 当前展示类型
      showType: SHOW_TYPE.account,
    }
  },
  async created() {
    await accountService.init();
    await deviceService.initDeviceList();

    // 创建 webSocket 连接
    webSocket.connect()
  },
  computed: {
    ...mapGetters([
      'account', // 当前帐号
    ])
  },
  methods: {
    // 改变展示的类型
    updateShowType(type) {
      this.showType = type;
    }
  }
}
