import type { StorybookConfig } from '@storybook/react-vite'
import tailwind from '@tailwindcss/vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Tailwind runs in Storybook only. It is what turns the `@theme inline` block
  // in tokens.css into real utilities, which is how we verify that the preset
  // consumers depend on actually generates the documented class vocabulary.
  viteFinal: async (viteConfig) => {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwind()]
    return viteConfig
  },
}

export default config
