import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 bg-[#1a1a1a] z-50 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4">
        <Link href="/" className="flex items-center">
          <Image 
            src="/mando.png"
            alt="Free Games Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>

        <nav>
          <ul className="flex gap-6">
            <li>
              <Link 
                href="/blog" 
                className="text-white relative group transition-colors duration-200 hover:text-red-600"
              >
                <span className="relative">
                  Blog
                  <span className="absolute left-0 right-0 bottom-[-4px] h-0.5 bg-red-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </span>
              </Link>
            </li>
            <li>
              <Link 
                href="/nosaltres" 
                className="text-white relative group transition-colors duration-200 hover:text-red-600"
              >
                <span className="relative">
                  Nosaltres
                  <span className="absolute left-0 right-0 bottom-[-4px] h-0.5 bg-red-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </span>
              </Link>
            </li>
            <li>
              <Link 
                href="/contacte" 
                className="text-white relative group transition-colors duration-200 hover:text-red-600"
              >
                <span className="relative">
                  Contacta'ns
                  <span className="absolute left-0 right-0 bottom-[-4px] h-0.5 bg-red-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    );
}