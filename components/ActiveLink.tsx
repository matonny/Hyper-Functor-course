import { useRouter } from 'next/router'
import  Link  from 'next/link'

interface ActiveLinkProps{
    label: string;
    href: string
}
export const ActiveLink = ({label, href}: ActiveLinkProps) => {
    const baseClasses = "";
    const router = useRouter();
    return (
        <Link href ={href}>
            <a 
            className= {router.route === href ? "text-blue-500" : ""}
            >{label}</a>
        </Link>
    )
}