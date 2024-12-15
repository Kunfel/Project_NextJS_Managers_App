import { columns } from "@/app/challenges/columns";
import {DataTable} from "@/components/ui/data-table";
import getUsers from "@/app/challenges/index";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";

export default async function Home() {
  const data = await getUsers();

  return (
    <div>
      <Navbar />
      <div className="space-x-5 ">
      <h1 className="font-bold text-3xl m-5">Your Challenges</h1>
      <Link href={"/challengeForm"}>
        <Button className="bg-purple-800 hover:bg-purple-700">New Challenge</Button>
      </Link>
      </div>
      <main className="flex h-screen flex-col justify-between p-24">
        <DataTable columns={columns} data={data} />
      </main>
    </div>
  );
}