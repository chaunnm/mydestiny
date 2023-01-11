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
      primary: "#FF85A2",
      others: "#3D3B73",
      lightText: "#616161",
    },
    height: {
      62: "244px",
    },
    width: {
      42: "164px",
    },
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
