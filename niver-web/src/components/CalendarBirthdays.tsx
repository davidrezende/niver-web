import * as React from 'react';
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PickersDay from '@mui/lab/PickersDay';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import { CalendarPicker, StaticDatePicker } from '@mui/lab';
import { ptBR } from "date-fns/locale";
import { Box, Tooltip } from '@mui/material';
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


function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date: Date, { signal }: { signal: AbortSignal }) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = getDaysInMonth(date);
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

const initialValue = new Date();

export default function ServerRequestDatePicker() {
  const requestAbortController = React.useRef<AbortController | null>(null);
  const { user } = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15, 16]);
  const [birthdaysMonth, setBirthdaysMonth] = React.useState<ICalendarMemberBirthdayData[]>([]);
  const [niver2, setNiver2] = React.useState(
    [
      {
        day: 2,
        name: "aaa"
      },
      {
        day: 4,
        name: "bbb"
      },
      {
        day: 11,
        name: "ccc"
      }
    ]);
  const [value, setValue] = React.useState<Date | null>(initialValue);
  const [date, setDate] = React.useState<Date | null>(new Date());


  const fetchHighlightedDays = async (dateParam: Date) => {
    console.log('procurando aniversariantes da data:', dateParam, ' do mês:', dateParam.getMonth())
    await CalendarService.getBirthdaysOfMonthFromAllGroupsByPerson(dateParam.getMonth() + 1, user!).then((response) => {
      console.log(response)
      setBirthdaysMonth(response.data)
    }).catch((error) => {
      console.log(error)
      setBirthdaysMonth([])
    })
    // const controller = new AbortController();
    // fakeFetch(date, {
    //   signal: controller.signal,
    // })
    //   .then(({ daysToHighlight }) => {
    //     setHighlightedDays(daysToHighlight);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     // ignore the error if it's caused by `controller.abort`
    //     if (error.name !== 'AbortError') {
    //       throw error;
    //     }
    // });

    // requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(new Date());
    // // abort request on unmount
    // return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (nextMonth: Date) => {
    console.log('data ao mudar o mes no calendario', nextMonth.getMonth(), 'dataquechegouaomudar:', nextMonth)
    setBirthdaysMonth([])
    if (requestAbortController.current) {

      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(nextMonth);

  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <Box sx={{ display:'table', maxWidth: '100%', color: 'white', backgroundColor: 'rgb(0 82 151)'}}>
      <CalendarPicker
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
                    birthday.name : birthday.name + ", "
                  ) :
                birthdaysMonth.map((birthday) => birthday.name)
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
    </LocalizationProvider>
  );
}
