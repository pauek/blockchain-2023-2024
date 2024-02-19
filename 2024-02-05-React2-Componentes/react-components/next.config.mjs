/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "randomuser.me",
				pathname: "/api/portraits/**",
				port: "",
				protocol: "https",
			},
		],
	},
};

export default nextConfig;
