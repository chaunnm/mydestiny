module.exports = {
  content: [
    "App.js",
    "StackNavigator.js",
    "./screens//*.{html,js}",
    "./components//*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito"],
        nunitoBold: ["NunitoBold"],
        nunitoSemiBold: ["NunitoSemiBold"],
        nunitoExtraBold: ["NunitoExtraBold"],
      },
      colors: {
        primary: "#FF85A2",
        others: "#3D3B73",
        lightText: "#616161",
        something: "#990024",
        chat: "#E6E8EB",
        region3: "#FFD1DC",
      },
      inset: {
        "2/5": "40%",
        15: "60px",
        90: "22rem",
      },
      height: {
        15: "3.8rem",
        62: "244px",
      },
      width: {
        15: "3.8rem",
        22: "88px",
        42: "164px",
        43: "170px",
        "78/100": "78%",
      },
    },
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
