
import { testAsync } from '@api/test';
import { useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import init,{ fibonacci } from '@/wasm/fibonacci';

const power:Array<string> =[
    '全局Loading',
    'ErrorBoundary',
    '异步接口',
    'webWorker(comlink)',
    '支持wasm',
    '还有一些特性....'

];
const Home = () => {
    const { showBoundary } = useErrorBoundary();

    const showPower = async (po: string) => {
        if (po === '全局Loading') {
            window.ajaxStatus = 'pending';
            setTimeout(() => {
                window.ajaxStatus = 'resolved';
            }, 2000);
        }
        if (po === 'ErrorBoundary') {
            showBoundary(new Error('自定义Error'));
        }
        if (po === '异步接口') {
            const asyncData = await testAsync();
            // console.log(asyncData);
            console.log('%O', asyncData);
            // const data = await axios.get('/api/posts/1');
        }
        if (po === 'webWorker(comlink)') {
            if (ComlinkWorker !== undefined) {
                const instance = new ComlinkWorker<typeof import("../../worker/fibonacciWorker")>(
                    new URL("../../worker/fibonacciWorker", import.meta.url),
                );
                const result = await instance.fibonacci(10);
                console.log(result);
            } else { 
                alert("rsbuild 天然支持web worker")
            }
        }
        if (po === '支持wasm') {
           await init();
            const result = fibonacci(10);
            console.log(`fibonacci(10)的结果为${result}`);
        }
    };
    return (
        <section className="h-screen w-screen overflow-auto flex justify-center items-center">
            <section className="flex ">
                我拥有的能力
            </section>
            <section className="flex-1 flex flex-col">
                {power
                    .map((item) => (
                        <div
                            key={item}
                            className="w-fit rounded-lg  opacity-100 border-white/40  border flex justify-start  items-center  bg-white-rgba h-[38px] mt-[10px] mr-[10px] hover:cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600"
                            onClick={() => showPower(item)}
                        >
                            <div className="p-4">{item}</div>
                        </div>
                    ))}
            </section>
        </section>
    );
};

export default Home;