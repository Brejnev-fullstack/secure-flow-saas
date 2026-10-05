"use client";

import { useState } from "react";

import TeamStatusBadge from "./TeamStatusBadge";
import TeamActions from "./TeamActions";
import TeamProfileDrawer from "./TeamProfileDrawer";
import TeamEditForm from "./TeamEditForm";
import DeleteTeamModal from "./DeleteTeamModal";


type TeamStatus = "ACTIVE" | "INACTIVE";


type Team = {
  id: number;
  name: string;
  description: string;
  members: number;
  status: TeamStatus;
};



const teams: Team[] = [

  {
    id: 1,
    name: "Development",
    description: "Equipe développeurs produit",
    members: 8,
    status: "ACTIVE",
  },


  {
    id: 2,
    name: "Security",
    description: "Equipe sécurité plateforme",
    members: 5,
    status: "ACTIVE",
  },


  {
    id: 3,
    name: "Marketing",
    description: "Communication et acquisition",
    members: 12,
    status: "INACTIVE",
  },

];




export default function TeamsTable() {


  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);


  const [drawerOpen, setDrawerOpen] = useState(false);


  const [editOpen, setEditOpen] = useState(false);


  const [deleteOpen, setDeleteOpen] = useState(false);





  return (

    <>


      <div
        className="
          overflow-hidden
          rounded-xl
          border
          bg-white
          dark:bg-slate-900
          dark:border-slate-800
        "
      >


        <div
          className="
            overflow-x-auto
          "
        >


          <table className="w-full text-sm">


            <thead
              className="
                border-b
                bg-slate-50
                dark:bg-slate-800
                dark:border-slate-700
              "
            >

              <tr>

                <th className="px-6 py-4 text-left">
                  Équipe
                </th>


                <th className="px-6 py-4 text-left">
                  Description
                </th>


                <th className="px-6 py-4 text-left">
                  Membres
                </th>


                <th className="px-6 py-4 text-left">
                  Statut
                </th>


                <th className="px-6 py-4 text-right">
                  Actions
                </th>

              </tr>

            </thead>





            <tbody>


              {teams.map((team)=>(


                <tr

                  key={team.id}

                  className="
                    border-b
                    last:border-none
                    hover:bg-slate-50
                    dark:border-slate-800
                    dark:hover:bg-slate-800
                  "

                >



                  {/* Nom équipe */}

                  <td className="px-6 py-4">


                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          bg-blue-600
                          font-bold
                          text-white
                        "
                      >

                        {team.name.charAt(0)}

                      </div>



                      <div>

                        <div className="font-medium">

                          {team.name}

                        </div>


                        <div
                          className="
                            text-xs
                            text-slate-500
                          "
                        >

                          ID #{team.id}

                        </div>


                      </div>


                    </div>


                  </td>





                  {/* Description */}

                  <td
                    className="
                      px-6
                      py-4
                      text-slate-500
                    "
                  >

                    {team.description}

                  </td>





                  {/* Membres */}

                  <td className="px-6 py-4">

                    {team.members}

                  </td>





                  {/* Statut */}

                  <td className="px-6 py-4">

                    <TeamStatusBadge
                      status={team.status}
                    />

                  </td>






                  {/* Actions */}

                  <td className="px-6 py-4">


                    <TeamActions


                      onView={()=>{

                        setSelectedTeam(team);

                        setDrawerOpen(true);

                      }}



                      onEdit={()=>{

                        setSelectedTeam(team);

                        setEditOpen(true);

                      }}




                      onDelete={()=>{

                        setSelectedTeam(team);

                        setDeleteOpen(true);

                      }}


                    />


                  </td>




                </tr>


              ))}



            </tbody>


          </table>



        </div>


      </div>









      {/* Drawer Profil */}


      <TeamProfileDrawer

        open={drawerOpen}

        team={selectedTeam ?? undefined}

        onClose={()=>{

          setDrawerOpen(false);

          setSelectedTeam(null);

        }}

      />







      {/* Modification */}


      <TeamEditForm

        open={editOpen}

        team={selectedTeam ?? undefined}

        onClose={()=>{

          setEditOpen(false);

          setSelectedTeam(null);

        }}

      />








      {/* Suppression */}


      <DeleteTeamModal

        open={deleteOpen}

        team={selectedTeam ?? undefined}

        onClose={()=>{

          setDeleteOpen(false);

          setSelectedTeam(null);

        }}

      />



    </>

  );

}