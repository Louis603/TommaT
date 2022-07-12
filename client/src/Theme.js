import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    fonts: {
      heading: 'Arial',
      body: 'Arial'
    },
    styles: {
      global: {
        body: {
          bg: 'gray.50',
          color: 'gray.900',
        },
        h1: {
          fontSize: '3xl',
          fontWeight: 'bold',
        },
        h2: {
          fontSize: '2xl',
          fontWeight: 'bold',
        },
        h3: {
          fontSize: 'lg'
        },
        h4: {
          fontSize: 'md'
        },
        p: {
            fontSize: '15px'
        },
        div: {
            
        }
      }
    },
    // colors: {
    //   transparent: 'transparent',
    //   black: '#000',
    //   white: '#fff',
    //   teal: {
    //     50: '#f7fafc',
    //     // ...
    //     900: '#171923',
    //   },
    //   // ...
    // },
  });


export default theme;