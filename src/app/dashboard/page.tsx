import FlowLogo from "/public/FlowLogo.png";
import Image from 'next/image';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(
    async function Dashboard() {
    const user = await getSession();
    return (
        <div id="dashboard container" className="flex flex-col">
            <div className="flex flex-row justify-center items-center">
                <Image src={FlowLogo} alt="Flow Logo" className="size-1/6 justify-center" />
                <a href="/api/auth/logout" className="">Sign Out</a>
            </div>

            <div className="flex flex-row justify-center items-center gap-12">
                <a href="/kanban">KANBAN</a>
                <a href="/meeting">MEETING</a>
            </div>

        </div>
    );
  }, { returnTo: 'login' })
