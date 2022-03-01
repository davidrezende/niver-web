import * as React from 'react';
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PickersDay from '@mui/lab/PickersDay';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import { CalendarPicker, StaticDatePicker } from '@mui/lab';
import { ptBR } from "date-fns/locale";
import { Box, CircularProgress, Tooltip } from '@mui/material';
import IMemberData from '../shared/types/Member';
import { CalendarService } from '../services/CalendarService';
import AuthContext from '../context/auth';
import ICalendarMemberBirthdayData from '../shared/types/CalendarMemberBirthday';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const initialValue = new Date();

export default function ServerRequestDatePicker() {
  const { user } = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15, 16]);
  const [birthdaysMonth, setBirthdaysMonth] = React.useState<ICalendarMemberBirthdayData[]>([]);
  const [value, setValue] = React.useState<Date | null>(initialValue);
  const [date, setDate] = React.useState<Date | null>(new Date());


  const fetchHighlightedDays = async (dateParam: Date) => {
    console.log('procurando aniversariantes da data:', dateParam, ' do mês:', dateParam.getMonth())
    setIsLoading(true)
    await delay(2000)
    await CalendarService.getBirthdaysOfMonthFromAllGroupsByPerson(dateParam.getMonth() + 1, user!).then((response) => {
      console.log(response)
      setBirthdaysMonth(response.data)
      setIsLoading(false)
    }).catch((error) => {
      console.log(error)
      setBirthdaysMonth([])
    })
  };

  React.useEffect(() => {
    fetchHighlightedDays(new Date());
  }, []);


  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  const handleMonthChange = (nextMonth: Date) => {
    console.log('data ao mudar o mes no calendario', nextMonth.getMonth(), 'dataquechegouaomudar:', nextMonth)
    setBirthdaysMonth([])
    setHighlightedDays([]);
    fetchHighlightedDays(nextMonth);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <Box sx={{ display: 'table', maxWidth: '100%', color: 'white',}}>

        {
          isLoading ?

            <Box sx={{ m: 5, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress color='secondary' disableShrink />
            </Box>

            :

            ""
        }
        <Box sx={{ display: isLoading ? 'none' : 'block' }}>
          <CalendarPicker
            disabled={isLoading}
            key={1}
            date={date}
            readOnly
            onChange={(newDate) => setDate(newDate)}
            onMonthChange={handleMonthChange}
            renderDay={(day, _value, DayComponentProps) => {
              const isSelected =
                !DayComponentProps.outsideCurrentMonth
                && birthdaysMonth.filter((member) => member.day === day.getDate()).length > 0;
              // && highlightedDays.indexOf(day.getDate()) > 0;

              return (
                <Tooltip title={isSelected ?
                  birthdaysMonth!
                    .filter((member) => member.day === day.getDate()).length > 1 ?
                    birthdaysMonth
                      .map((birthday, index) => index === birthdaysMonth.length - 1 ?
                        birthday.idPerson === user ? 'Você' : birthday.name
                        : birthday.idPerson === user ?
                          'Você' : birthday.name + ", "
                      ) :
                    birthdaysMonth.filter((member) => member.day === day.getDate()).map(
                      (birthday) =>
                        birthday.idPerson === user ? 'Você' : birthday.name)
                  : ""}
                  key={day.getDay()}
                  placement="top-start" >
                  <Badge
                    key={day.toString()}
                    overlap="circular"
                    aria-label="teste"
                    color={isSelected ? 'error' : 'default'}
                    badgeContent={isSelected ? '🎉' : undefined}
                    variant='dot'
                  >
                    <PickersDay {...DayComponentProps} />
                  </Badge>
                </Tooltip>
              );
            }} />


          {
            birthdaysMonth.length !== 0 ?
              <>

                <TableContainer component={Paper} >
                  <Table sx={{ minWidth: 100, backgroundColor: 'rgb(000 000 007%)' }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Dia</TableCell>
                        <TableCell align="left">Nome</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {birthdaysMonth.map((row) => (
                        <TableRow
                          key={row.idPerson}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="left">{row.day}</TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
              :
              ""
          }
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
