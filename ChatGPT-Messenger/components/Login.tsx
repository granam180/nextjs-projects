"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
	return (
		<div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center sm:text-large">
			<Image
				src="https://links.papareact.com/2i6" // need to PS out the bg-color
				width={400}
				height={400}
				alt="logo"
				className=""
			/>

			{/* Responsive Button */}
			<button
				onClick={() => signIn("google")}
				className="text-white font-bold text-4xl animate-pulse py-3 px-6">
				Sign In to use BaddGPT
			</button>
		</div>
	);
}

export default Login;
