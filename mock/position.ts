export default {
  'GET /api/position/virtual/list': (req: Request, res: Response) => {
    res.send({
      status: 'ok',
      data: [
        {
          key: '1',
          name: 'btc',
          status: 'enable',
          directions: ['buy', 'sell'],
          contractTypes: ['quarter', 'next_quarter', 'this_week', 'next_week']
        },
        {
          key: '2',
          name: 'eth',
          status: 'enable',
          directions: ['buy', 'sell'],
          contractTypes: ['quarter', 'next_quarter', 'this_week', 'next_week']
        },
        {
          key: '3',
          name: 'etc',
          status: 'disable',
          directions: ['buy', 'sell'],
          contractTypes: ['quarter', 'next_quarter', 'this_week', 'next_week']
        },
      ]
    });
  },
  'GET /api/position/huobi/list': (req: Request, res: Response) => {
    res.send({
      status: 'ok',
      data: [
        {
          key: '1',
          name: 'btc',
          status: 'enable',
          directions: ['buy', 'sell'],
          contractTypes: ['quarter', 'next_quarter', 'this_week', 'next_week']
        }
      ]
    });
  },
  'GET  /api/profile/advanced': (req: Request, res: Response) => {
    const advancedOperation1 = [
      {
        key: 'op1',
        type: '订购关系生效',
        name: '曲丽丽',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        memo: '-',
      },
      {
        key: 'op2',
        type: '财务复审',
        name: '付小小',
        status: 'reject',
        updatedAt: '2017-10-03  19:23:12',
        memo: '不通过原因',
      },
      {
        key: 'op3',
        type: '部门初审',
        name: '周毛毛',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        memo: '-',
      },
      {
        key: 'op4',
        type: '提交订单',
        name: '林东东',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        memo: '很棒',
      },
      {
        key: 'op5',
        type: '创建订单',
        name: '汗牙牙',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        memo: '-',
      },
    ];

    const advancedOperation2 = [
      {
        key: 'op1',
        type: '订购关系生效',
        name: '曲丽丽',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        memo: '-',
      },
    ];

    const advancedOperation3 = [
      {
        key: 'op1',
        type: '创建订单',
        name: '汗牙牙',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        memo: '-',
      },
    ];

    const getProfileAdvancedData = {
      advancedOperation1,
      advancedOperation2,
      advancedOperation3,
    };
    res.send({
      status: 'ok',
      data: getProfileAdvancedData
    });
  }
};
