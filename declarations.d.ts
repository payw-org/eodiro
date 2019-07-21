declare namespace NodeJS {
  interface Process {
    server: boolean
    client: boolean
  }
}

declare module '*.html' {
  const value: string
  export default value
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
