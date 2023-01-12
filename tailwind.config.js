module.exports = {
  content: ["App.js", "./screens//*.{html,js}", "./components//*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["NunitoSans-Regular"],
        nunitoBold: ["NunitoSans-Bold"],
        nunitoSemiBold: ["NunitoSans-SemiBold"],
        nunitoExtraBold: ["NunitoSans-ExtraBold"],
      },
      colors: {
        primary: "#FF85A2",
        others: "#3D3B73",
        lightText: "#616161",
        something: "#990024",
      },
      inset: {
        "2/5": "40%",
        15: "60px",
        90: "22rem",
      },
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
};
