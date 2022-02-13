import { useEffect, useState } from "react";
import { usePerson } from "../hooks/usePerson";

export const Home = () => {
  const { person, getPersonById } = usePerson();

  useEffect(() => {
    getPersonById();
  }, [getPersonById])
  
  return (
    <div>Teste</div>
  )
};


