/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem'
      }
    },
    extend: {}
  },
  plugins: [
    require('tailwind-saasblocks')({
      gradients: {
        ...defaultGradients, // remove this if you don't want to use our default gradients

        // add your own gradients here
        // you can use this gradient with this class: "gradient-my-stuff"
        'my-stuff': {
          light: {
            from: '#fff',
            via: 'red', // optional
            to: '#000'
          },
          dark: {
            from: '#fff',
            via: 'red', // optional
            to: '#000'
          }
        }
      }
    })
  ]
};
