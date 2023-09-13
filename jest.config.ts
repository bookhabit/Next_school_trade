export {};

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Jest 설정 옵션 추가
  testEnvironment: 'jest-environment-jsdom',
};

export default config;
