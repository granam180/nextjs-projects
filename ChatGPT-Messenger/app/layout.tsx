import { SessionProvider } from "../components/SessionProvider";
import SideBar from "../components/SideBar";
import { getServerSession } from "next-auth";
import "../styles/globals.css"; // global tailwind-css
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import ClientProvider from "../components/ClientProvider";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	console.log(session);  // view session of who's been logging into my app!!
	return (
		<html lang="en">
			<head />
			<body>
				<SessionProvider session={session}>
					{/* if there is NO session */}
					{!session ? (  // remove '!' to show ChatGPT prompt without signing in first
						<Login />  // show the login if there is no session provided
					) : (
						<div className="flex">
							<div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
								<SideBar />
							</div>

							{/* ClientProvider - Notifications*/}
							<ClientProvider />
							{/* flex-1 since main div is using flexbox */}
							<div className="bg-[#343541] flex-1">
								{children}
							</div>
						</div>
					)}
				</SessionProvider>
			</body>
		</html>
	);
}
