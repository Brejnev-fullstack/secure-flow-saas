"use client";

import { AlertTriangle, X } from "lucide-react";


type Team = {
  id: number;
  name: string;
};



type Props = {
  open: boolean;
  team?: Team;
  onClose: () => void;
};



export default function DeleteTeamModal({
  open,
  team,
  onClose,
}: Props) {


  if (!open || !team) {
    return null;
  }





  function handleDelete() {

    console.log(
      "Suppression équipe",
      team
    );


    onClose();

  }






  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
      "
    >



      {/* Overlay */}

      <div

        onClick={onClose}

        className="
          absolute
          inset-0
          bg-black/40
        "

      />







      {/* Modal */}

      <div
        className="
          relative
          w-full
          max-w-md
          rounded-xl
          bg-white
          p-6
          shadow-xl
          dark:bg-slate-900
        "
      >






        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
          "
        >


          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Supprimer équipe
          </h2>




          <button

            onClick={onClose}

            className="
              rounded-lg
              p-2
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "

          >

            <X size={20}/>

          </button>


        </div>








        {/* Contenu */}

        <div
          className="
            mt-6
            space-y-4
          "
        >


          <div
            className="
              flex
              items-center
              gap-3
              rounded-lg
              bg-red-50
              p-4
              text-red-700
              dark:bg-red-950/30
            "
          >

            <AlertTriangle size={24}/>


            <p
              className="
                text-sm
              "
            >

              Cette action est irréversible.

            </p>


          </div>





          <p
            className="
              text-sm
              text-slate-600
              dark:text-slate-400
            "
          >

            Voulez-vous vraiment supprimer équipe{" "}

            <span
              className="
                font-semibold
              "
            >
              {team.name}
            </span>

            ?

          </p>



        </div>








        {/* Actions */}

        <div
          className="
            mt-6
            flex
            justify-end
            gap-3
          "
        >


          <button

            onClick={onClose}

            className="
              rounded-lg
              border
              px-4
              py-2
            "

          >

            Annuler

          </button>





          <button

            onClick={handleDelete}

            className="
              rounded-lg
              bg-red-600
              px-4
              py-2
              text-white
              hover:bg-red-700
            "

          >

            Supprimer

          </button>



        </div>




      </div>


    </div>

  );

}