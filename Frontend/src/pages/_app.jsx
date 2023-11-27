import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "../redux/store";

const theme = {
  list: {
    defaultProps: {
      ripple: true,
      className: "",
    },
    styles: {
      base: {
        list: {
          display: "flex",
          flexDirection: "flex-col",
          gap: "gap-1",
          minWidth: "min-w-[240px]",
          p: "p-2",
          fontFamily: "font-sans",
          fontSize: "text-base",
          fontWeight: "font-normal",
          color: "text-blue-gray-700",
        },
        item: {
          initial: {
            display: "flex",
            alignItems: "items-center",
            width: "w-full",
            padding: "p-3",
            borderRadius: "rounded-lg",
            textAlign: "text-start",
            lightHeight: "leading-tight",
            transition: "transition-all",
            bg: "hover:bg-blue-gray-50 hover:bg-opacity-80 active:bg-blue-gray-50 active:bg-opacity-80",
            color: "hover:text-blue-gray-900 focus:text-white active:text-blue-gray-900",
            outline: "outline-none",
          },
          selected: {
            bg: "bg-[#918876]",
            color: "text-white",
          },
          disabled: {
            opacity: "opacity-100",
            cursor: "cursor-not-allowed",
            pointerEvents: "pointer-events-none",
            userSelect: "select-none",
            bg: "hover:bg-transparent focus:bg-transparent active:bg-transparent",
            color: "text-blue-gray-700 focus:text-blue-gray-700 active:text-blue-gray-700",
          },
        },
        itemPrefix: {
          display: "grid",
          placeItems: "place-items-center",
          marginRight: "mr-4",
        },
        itemSuffix: {
          display: "grid",
          placeItems: "place-items-center",
          marginRight: "ml-auto justify-self-end",
        },
      },
    },
  },
};

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider value={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
