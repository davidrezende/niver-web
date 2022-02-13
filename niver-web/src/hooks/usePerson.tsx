import { useCallback, useState } from "react"
import { PersonService } from "../services/PersonService"
import IPersonData from "../shared/types/Person";

export const usePerson = () => {
  const[person, setPerson] = useState<IPersonData>();
  const getPersonById = useCallback(
    async () => {
      const { status, data } = await PersonService.getPersonById();
      
      if(status != 200) throw new Error();
      
      setPerson(data)
    },
    [],
  )

  return {
    person,
    getPersonById
  };
};