/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'dev' | 'test' | 'production'
    REACT_APP_MAP_TILE_URL: string
  }
}
