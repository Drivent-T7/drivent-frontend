import Splash from '../../../components/Splash';
import useTicket from '../../../hooks/api/useTicket';
import useEnrollment from '../../../hooks/api/useEnrollment';
import NoTicket from './NoTicket';
import HasReservedTicket from './HasReservedTicket';
import NoEnrollment from './NoEnrollment';

export default function Payment() {
  const { ticket, ticketLoading, getTicket } = useTicket();
  const { enrollment } = useEnrollment();

  if (!enrollment) {
    return <NoEnrollment />;
  }

  if (ticketLoading) {
    return <Splash loading />;
  }
  if (ticket) {
    return <HasReservedTicket ticket={ticket} getTicket={getTicket} />;
  }

  return <NoTicket getTicket={getTicket} />;
}
