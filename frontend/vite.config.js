import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: ['**/*.js', '**/*.jsx'], // Aceita JSX em .js
    }),
  ],
});