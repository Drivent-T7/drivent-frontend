import Splash from '../../../components/Splash';
import useTicket from '../../../hooks/api/useTicket';
import NoTicket from './NoTicket';
import HasReservedTicket from './HasReservedTicket';

export default function Payment() {
  const { ticket, ticketLoading, getTicket } = useTicket();

  if (ticketLoading) {
    return <Splash loading />;
  }
  if (ticket) {
    return <HasReservedTicket ticket={ticket} getTicket={getTicket} />;
  }

  return <NoTicket getTicket={getTicket} />;
}
