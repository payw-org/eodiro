import ApiHost from '../api-host'

/**
 * Post a message to the React Native WebView
 */
export const reactNativeWebViewPostMessage = (
  message: Record<string, unknown>
): void => {
  if (typeof window !== undefined && 'ReactNativeWebView' in window) {
    const reactNativeWebView = (window as any).ReactNativeWebView

    reactNativeWebView.postMessage(
      JSON.stringify({
        apiHost: ApiHost.getHost(),
        ...message,
      })
    )
  }
}
