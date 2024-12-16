// vite.config.mjs
import { defineConfig, loadEnv } from "file:///D:/webql/webquanlyphong/client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/webql/webquanlyphong/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "node:path";
import autoprefixer from "file:///D:/webql/webquanlyphong/client/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "D:\\webql\\webquanlyphong\\client";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    base: "./",
    build: {
      outDir: "build"
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({})
          // add options if needed
        ]
      }
    },
    esbuild: {
      loader: "jsx",
      include: /src\/.*\.jsx?$/,
      exclude: []
    },
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        loader: {
          ".js": "jsx"
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: "src/",
          replacement: `${path.resolve(__vite_injected_original_dirname, "src")}/`
        }
      ],
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".scss"]
    },
    server: {
      port: 3e3,
      proxy: {}
    },
    assetsInclude: ["**/*.doc", "**/*.docx"]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcd2VicWxcXFxcd2VicXVhbmx5cGhvbmdcXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3ZWJxbFxcXFx3ZWJxdWFubHlwaG9uZ1xcXFxjbGllbnRcXFxcdml0ZS5jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93ZWJxbC93ZWJxdWFubHlwaG9uZy9jbGllbnQvdml0ZS5jb25maWcubWpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgYmFzZTogJy4vJyxcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiAnYnVpbGQnLFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwb3N0Y3NzOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICBhdXRvcHJlZml4ZXIoe30pLCAvLyBhZGQgb3B0aW9ucyBpZiBuZWVkZWRcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBlc2J1aWxkOiB7XG4gICAgICBsb2FkZXI6ICdqc3gnLFxuICAgICAgaW5jbHVkZTogL3NyY1xcLy4qXFwuanN4PyQvLFxuICAgICAgZXhjbHVkZTogW10sXG4gICAgfSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGZvcmNlOiB0cnVlLFxuICAgICAgZXNidWlsZE9wdGlvbnM6IHtcbiAgICAgICAgbG9hZGVyOiB7XG4gICAgICAgICAgJy5qcyc6ICdqc3gnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczogW1xuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJ3NyYy8nLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBgJHtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyl9L2AsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgZXh0ZW5zaW9uczogWycubWpzJywgJy5qcycsICcudHMnLCAnLmpzeCcsICcudHN4JywgJy5qc29uJywgJy5zY3NzJ10sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IDMwMDAsXG4gICAgICBwcm94eToge1xuICAgICAgfSxcbiAgICB9LFxuICAgIGFzc2V0c0luY2x1ZGU6IFsnKiovKi5kb2MnLCAnKiovKi5kb2N4J11cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1IsU0FBUyxjQUFjLGVBQWU7QUFDNVQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGtCQUFrQjtBQUh6QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLFFBQ1AsU0FBUztBQUFBLFVBQ1AsYUFBYSxDQUFDLENBQUM7QUFBQTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFNBQVMsQ0FBQztBQUFBLElBQ1o7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLE9BQU87QUFBQSxNQUNQLGdCQUFnQjtBQUFBLFFBQ2QsUUFBUTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLElBQ2pCLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLEdBQUcsS0FBSyxRQUFRLGtDQUFXLEtBQUssQ0FBQztBQUFBLFFBQ2hEO0FBQUEsTUFDRjtBQUFBLE1BQ0EsWUFBWSxDQUFDLFFBQVEsT0FBTyxPQUFPLFFBQVEsUUFBUSxTQUFTLE9BQU87QUFBQSxJQUNyRTtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTyxDQUNQO0FBQUEsSUFDRjtBQUFBLElBQ0EsZUFBZSxDQUFDLFlBQVksV0FBVztBQUFBLEVBQ3pDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
