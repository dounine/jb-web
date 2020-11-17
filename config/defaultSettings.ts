import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  "navTheme": "dark",
  "primaryColor": "#52C41A",
  "layout": "side",
  "contentWidth": "Fluid",
  "fixedHeader": true,
  "fixSiderbar": true,
  "menu": {
    "locale": true
  },
  "title": "Ant Design Pro",
  "pwa": false,
  "iconfontUrl": "",
  "splitMenus": false
} as LayoutSettings & {
  pwa: boolean;
};
