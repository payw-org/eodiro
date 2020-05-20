/**
 * Post a message to the React Native WebView
 */
export const reactNativeWebViewPostMessage = (
  message: any,
  /**
   * @default `protocol://host`
   */
  targetOrigin?: string,
  transfer?: Transferable[]
) => {
  if ('ReactNativeWebView' in window) {
    const reactNativeWebView = (window as any).ReactNativeWebView as Window

    reactNativeWebView.postMessage(
      message,
      targetOrigin || location.protocol + '//' + location.host,
      transfer
    )
  }
}
