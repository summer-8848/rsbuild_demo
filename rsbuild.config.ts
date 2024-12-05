import { defineConfig } from '@rsbuild/core';
import { pluginAssetsRetry } from '@rsbuild/plugin-assets-retry';
import { pluginBabel } from '@rsbuild/plugin-babel';
import type { PluginCheckSyntaxOptions } from '@rsbuild/plugin-check-syntax';
import { pluginCheckSyntax } from '@rsbuild/plugin-check-syntax';
import { pluginCssMinimizer } from '@rsbuild/plugin-css-minimizer';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';
import type { PluginRemOptions } from '@rsbuild/plugin-rem';
import { pluginRem } from '@rsbuild/plugin-rem';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx';
import { VantResolver } from '@vant/auto-import-resolver';
import Components from 'unplugin-vue-components/rspack';

/** 浏览器高级语法兼容参数 */
const checkSyntaxOptions: PluginCheckSyntaxOptions = {
  targets: ['chrome >= 87']
};

const vueJsxOptions = {
  transformOn: true,
  optimizeOn: true,
  mergeProps: true
};

const remOptions: PluginRemOptions = {
  enableRuntime: true,
  inlineRuntime: true,
  rootFontSize: 75,
  maxRootFontSize: 75,
  widthQueryKey: 'w',
  screenWidth: 750, // ui设计图宽度
  excludeEntries: [], // 如果有需要排除的入口文件，可以在数组中指定
  supportLandscape: false, // 横屏使用height计算rem
  useRootFontSizeBeyondMax: false,
  pxtorem: {
    rootValue: (({ file }) =>
      file.includes('vant') ? 37.5 : 75) as unknown as number,
    unitPrecision: 5,
    propList: ['*'],
    minPixelValue: 1,
    selectorBlackList: [] // 如果有需要排除的选择器，可以在数组中指定
  }
};
const assetsCdn = {
  js: [process.env.ESHIMIN_JS_SDK, process.env.UMENG_JS_SDK],
  css: []
};

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  plugins: [
    pluginVue(),
    pluginCheckSyntax(checkSyntaxOptions),
    pluginCssMinimizer(),
    pluginSass(),
    pluginBabel({
      // swc配置
      include: /\.(?:jsx|tsx|js)$/,
      exclude: /[\\/]node_modules[\\/]/
    }),
    pluginVueJsx({ vueJsxOptions: vueJsxOptions }), // 开启vue-jsx支持
    pluginAssetsRetry(), // 静态资源加载失败重载
    pluginTypeCheck({
      // 开发环境检查ts类型
      enable: isDev,
      tsCheckerOptions: {
        typescript: {
          memoryLimit: 16384
        }
      }
    }),
    pluginImageCompress([
      { use: 'jpeg', test: /\.(?:jpg|jpeg|jpe)$/ },
      'pngLossless',
      'ico'
    ]), // 静态资源压缩
    pluginRem(remOptions)
  ],

  resolve: {
    alias: {
      '@/*': './src/*',
      '@styles': './src/styles',
      '@stores': './src/stores',
      '@types': './src/@types',
      '@images': './src/assets/images',
      '@directive': './src/assets/directive'
    }
  },
  server: {
    port: 8020,
    htmlFallback: 'index',
    proxy: {
      [process.env.PUBLIC_BASE_PREFIX + '']: {
        target: process.env.PUBLIC_BASE_API,
        pathRewrite: { '^/api': '/api' },
        ws: false // 是否代理websocket请求
      }
    }
  },
  tools: {
    lightningcssLoader: false,
    rspack(config, { addRules, prependPlugins }) {
      addRules([
        {
          test: /\.pdf$/,
          // 将资源转换为单独的文件，并且导出产物地址
          type: 'assets/resource'
        }
      ]);
      prependPlugins(
        Components({
          resolvers: [VantResolver()]
        })
      );
    }
  },
  dev: {
    assetPrefix: process.env.PUBLIC_ASSETS_PREFIX
  },
  output: {
    sourceMap: {
      js: isDev ? 'eval' : false
    },
    assetPrefix: process.env.PUBLIC_ASSETS_PREFIX
  },
  html: {
    template: './public/index.html',
    favicon: './public/favicon.svg',
    meta: {
      charset: {
        charset: 'UTF-8'
      },
      viewport:
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, minimum-scale=1.0, viewport-fit=cover'
    },
    title: '新星办公平台',
    templateParameters: {
      cdn: assetsCdn
    }
  },
  performance: {
    removeConsole: Boolean(process.env.PUBLIC_REMOVE_CONSOLE) // 生产环境构建移除所有console
  }
});
