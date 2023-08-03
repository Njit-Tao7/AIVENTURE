import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/layouts/layout";

export default function NewAdventure() {
  const { status } = useSession();
  const router = useRouter();

  const [adventureName, setAdventureName] = useState("");
  const [characterName, setCharacterName] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/");
    }
  }, [status, router]);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    console.log(adventureName);
    console.log(characterName);
  };

  let content;

  if (status === "loading") {
    content = <h1>Loading...</h1>;
  } else if (status === "authenticated") {
    content = (
      <div className="p-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">
          New Adventure
        </h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="adventureName">Adventure Name</label>
            <input
              type="text"
              name="adventureName"
              className="w-fit border-2 border-slate-300 bg-gray-100 p-2"
              onChange={(evt) => {
                setAdventureName(evt.target.value);
              }}
            />
          </div>
          <br />
          <div className="flex flex-col">
            <label htmlFor="characterName">Character Name</label>
            <input
              type="text"
              name="characterName"
              className="w-fit border-2 border-slate-300 bg-gray-100 p-2"
              onChange={(evt) => {
                setCharacterName(evt.target.value);
              }}
            />
          </div>
          <br />
          <button
            type="submit"
            className="rounded-full bg-slate-300 px-10 py-3 font-bold text-gray-800 no-underline transition hover:bg-slate-300/80"
          >
            Create
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AIVenture | Adventures</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>{content}</Layout>
    </>
  );
}
