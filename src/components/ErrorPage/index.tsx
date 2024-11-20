import { useErrorBoundary } from "react-error-boundary";

type Props = {
    status?: string;
    reason?: string;
    message?: string;
}
const ErrorPage = ({ 
    status= '404',
    reason="网络错误",
    message="页面丢失"
}: Props) => { 
    const { resetBoundary } = useErrorBoundary();
    const resetError = () => { 
        resetBoundary();
    }
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl">{status}</h1>
                    <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">{reason}</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{message}</p>
                    <button type="button" onClick={resetError} className="text-red-600 border-2 p-2">重置错误</button>
                </div>
            </div>
        </section>
    )
}
export default ErrorPage;