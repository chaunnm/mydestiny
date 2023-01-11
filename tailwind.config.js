module.exports = {
  content: ["App.js", "./screens//*.{html,js}", "./components//*.{html,js}"],
  assets: ["./assets/fonts"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["NunitoSans-Regular"],
        nunitoBold: ["NunitoSans-Bold"],
        nunitoSemiBold: ["NunitoSans-SemiBold"],
        nunitoExtraBold: ["NunitoSans-ExtraBold"],
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      "gray-d9": "#d9d9d9",
      "purple-other": "#3d3b73",
      blue: "#1da1f2",
      green: "#70d7a6",
      yellow: "#fbbc05",
      orange: "#f59124",
      pink: {
        primary: "#ff85a2",
        region1: "#ff9eb5",
        region2: "#ffb8c9",
        region3: "#ffd1dc",
        region4: "#ffebef",
        dark: "#ff2e60",
      },
      black: {
        normal: "#09101d",
        light: "#616161",
      },
      red: {
        something: "#990024",
        important: "#da251d",
      },
    },
        primary: "#FF85A2",
        others: "#3D3B73",
        lightText: "#616161",
      height: {
        62: "244px",
      },
      width: {
        42: "164px",
      },
    },
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
  safelist: [
    {
      pattern:
        /(bg|text|border)-pink-(primary|region1|region2|region3|region4|dark)/,
    },
    {
      pattern: /(bg|text|border)-black-(normal|light)/,
    },
    {
      pattern: /(bg|text|border)-red-(something|important)/,
    },
    {
      pattern:
        /(bg|text|border)-(gray-d9|purple-other|blue|green|yellow|orange)/,
    },
  ],
};
