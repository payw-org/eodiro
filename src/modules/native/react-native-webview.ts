/**
 * Post a message to the React Native WebView
 */
export const reactNativeWebViewPostMessage = (
  data: Record<string, unknown>
): void => {
  if (typeof window !== undefined && 'ReactNativeWebView' in window) {
    const reactNativeWebView = (window as any).ReactNativeWebView

    reactNativeWebView.postMessage(JSON.stringify(data))
  }
}
