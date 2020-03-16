/**
 * 将异步包装为异步加载组件
 *
 * @export
 * @param {{ loading: VueComponent, error: VueComponent, delay: number, timeout: number }} option
 *
 */
export default function Loadable(loaderFun, option) {
  return () => ({
    component: loaderFun(),
    // A component to use while the async component is loading
    // loading: LoadingComponent,
    // A component to use if the load fails
    // error: ErrorComponent,
    // Delay before showing the loading component. Default: 200ms.
    // delay: 200,
    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: Infinity.
    // timeout: 3000
    ...option,
  });
}
