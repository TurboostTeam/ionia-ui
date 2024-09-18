export default process.env.NODE_ENV === "production"
  ? {}
  : {
      plugins: {
        "postcss-import": {},
        tailwindcss: {},
        autoprefixer: {},
      },
    };
