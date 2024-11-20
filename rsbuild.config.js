import { pluginSass } from '@rsbuild/plugin-sass';
import { defineConfig,loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';
import { codeInspectorPlugin } from 'code-inspector-plugin';

const isProduction = env => env === 'production';

export default defineConfig(({ envMode }) => { 
    // 这里使用loadEnv 获取env 的信息，是有可能，我们需要在dev环境使用test环境的接口
    const {parsed} = loadEnv({ prefixes: ['VITE_'] });
    return {
   
        plugins: [pluginReact(), pluginImageCompress(), pluginSass()],
        dev: {
            lazyCompilation: true,
        },
        server: {
            host: 'localhost',
            port: '3005',
            open: true,
            cors: true,
            proxy: {
                '/api': {
                    target: parsed.VITE_API_BASE_URL,
                    pathRewrite: { '^/api': '' },
                },
            },
        },
        html: {
            template: './index.html',
        },
        source: {
            entry: {
                index: './src/main.tsx',
            },
        },
        tools: {
            rspack: {
                plugins: [
                    codeInspectorPlugin({
                        bundler: 'rspack',
                    }),
                ],
                module: {
                    rules: [
                        {
                            resourceQuery: /raw/,
                            type: 'asset/source',
                        },
                    ],
                },
            },
        },
        output: {
            assetPrefix: '/',
            distPath: {
                root: 'dist',
                html: './',
                js: './',
                jsAsync: './',
                css: 'assets',
                cssAsync: 'assets',
                svg: 'assets',
                font: 'assets',
                image: 'assets',
                media: 'assets',
            },
            sourceMap: {
                js: isProduction(envMode) ? 'source-map' : 'cheap-module-source-map',
                css: true,
            },
        },
    }
})
