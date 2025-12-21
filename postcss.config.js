import tailwindcss from '@tailwindcss/Postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcssPostcss(),
    autoprefixer()
  ]
};
