import { Button, Checkbox, Input } from "antd";
import React from "react";
import { useQuery } from "urql";
import { user_by_pk } from "../../data/user";
import './account.css'

export default function Account(){
    const [result] = useQuery({
        query: user_by_pk,
        variables: {id : localStorage.userId}
      });

      const { data, fetching, error } = result;

      if (fetching) return <p>Loading...</p>;
      if (error) return <p>Oh no... {error.message}</p>;


    return <div id="account">
        <h1>
            {data.user_by_pk.username.toUpperCase()}
        </h1>
        <div id="share">
            <Input placeholder="Je souhaite partager mes recettes avec"/>
            <div>
                <Checkbox>Permettre les modifications</Checkbox>
                <Checkbox>Permettre de voir les listes de courses</Checkbox>
            </div>
            <Button type="primary" block>Rechercher</Button>
        </div>
        <div id="resume">
            <div>
                {data.user_by_pk.sharedBy.length > 0 && 
                <>
                    <p>Ils ont partagé leurs recettes avec vous : </p>
                    {data.user_by_pk.sharedBy.map(person => (
                        <p key={person.id}>{person.sharedBy.username.toUpperCase()}</p>
                    ))}
                </>
                }
            </div>
            <div>
                {data.user_by_pk.sharingWith.length > 0 && 
                    <>
                        <p>Vos recettes sont partagées avec : </p>
                    {data.user_by_pk.sharingWith.map(person => (
                        <p key={person.id}>{person.sharedTo.username.toUpperCase()}</p>
                    ))}
                </>
                }
            </div>
        </div>
        <div id='logout-container'>
            <Button type="primary" block id="logout">Déconnexion</Button>
        </div>
    </div>
}