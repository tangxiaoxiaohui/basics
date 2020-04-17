// webSocket 请求事件
const _REQUEST = {
  // 采集作品
  CMD_GATHER_PRODUCTION: 'CmdCaijizuopin',
  // 采集用户
  CMD_GATHER_USER: 'CmdCaijiyonghu',
  // 采集粉丝
  CMD_GATHER_FANS: 'CmdCaijifensi',
  // 采集作品评论
  CMD_GATHER_PRODUCTION_COMMENT: 'CmdZuopinpinglun',
  // 采集用户作品
  CMD_USER_PRODUCTION: 'CmdYonghuzuopin',
  // 模拟操作
  CMD_SIMULATION_OPERATION: 'CmdMonicaozuo',
};

// webSocket 回调事件
const _RESPONSE = {
  // 采集作品
  CMD_GATHER_PRODUCTION_RESULT: 'CmdCaijizuopinResult',
  // 采集用户
  CMD_GATHER_USER_RESULT: 'CmdCaijiyonghuResult',
  // 采集粉丝
  CMD_GATHER_FANS_RESULT: 'CmdCaijifensiResult',
  // 采集作品评论
  CMD_GATHER_PRODUCTION_COMMENT_RESULT: 'CmdZuopinpinglunResult',
  // 采集用户作品
  CMD_USER_PRODUCTION_RESULT: 'CmdYonghuzuopinResult',
  // 模拟操作
  CMD_SIMULATION_OPERATION_RESULT: 'CmdMonicaozuoResult',
  // 通用反馈处理
  CMD_COMMON_ASYNC_TASK_RESULT: 'CmdCommonAyncTaskResult',
};

export const REQUEST = _REQUEST;
export const RESPONSE = _RESPONSE;
