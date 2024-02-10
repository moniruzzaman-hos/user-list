import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-4xl font-bold mt-8">Welcome to the Users Site</p>
      <p className="text-2xl mt-4">
        This is a site for users to see and interact with content
      </p>
      <Link href="/users" className="">
        <button className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Users
        </button>
      </Link>
    </div>
  );
}
