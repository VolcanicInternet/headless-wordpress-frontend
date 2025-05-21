import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center py-4 mt-auto">
      <p className="mt-8">
        &copy; {new Date().getFullYear()} Videojocs news. Tutorial By Adrià Molina.
      </p>
    </footer>
  );
}
