import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import jsconfigPaths from "vite-jsconfig-paths";


export default defineConfig({
  plugins: [react()
						//, jsconfigPaths()
					 ],
	server:{
		proxy: {
      '/api': {
        target: "https://webfull-stack-courses.herokuapp.com",
        changeOrigin: true,
        secure: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
		host:"0.0.0.0",
		port: 2023,
		usePolling: true
	}
		
});