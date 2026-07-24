"use client";


import { Download } from "lucide-react";


export default function AuditHeader(){

  return (

    <div
      className="
        flex
        items-center
        justify-between
      "
    >

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Audit Logs
        </h1>


        <p
          className="
            mt-2
            text-slate-500
          "
        >
          Historique des actions et événements de sécurité.
        </p>


      </div>




      <button
        className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-blue-600
          px-4
          py-2
          text-white
          hover:bg-blue-700
        "
      >

        <Download size={18}/>

        Exporter

      </button>



    </div>

  );

}