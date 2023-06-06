import Link from "next/link";
import Login from "./Login";
import Logged from "./Loged";
import {getServerSession} from "next-auth/next"
import { authOptions } from '../../pages/api/auth/[...nextauth]'

export default async function Nav() {
    // get server session from the next auth
    const session = await getServerSession(authOptions)
    
    return(
    <nav className="flex justify-between items-center py-8">
            <Link href={"/"}>
                <h1 className="font-bold text-lg">send it</h1>
            </Link>
            <ul className="flex items-center gap-6">
                {/* check if user exists. if not render to login */}
                {!session?.user ? <Login/> : <Logged image={session.user?.image}/>}
            </ul>
    </nav>
    )
}