import Splash from '../../../components/Splash';
import useTicket from '../../../hooks/api/useTicket';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicketTypes from '../../../hooks/api/useTicketType';
import HasReservedTicket from '../../../components/TicketPayment';
import NoEnrollment from '../../../components/Ticket/UnathorizedWarning';
import NoTicket from '../../../components/Ticket';

export default function Payment() {
  const { ticket, ticketLoading, getTicket } = useTicket();
  const { enrollment, enrollmentLoading } = useEnrollment();
  const { ticketTypes, ticketTypesLoading } = useTicketTypes();
  
  if (enrollmentLoading || ticketLoading || ticketTypesLoading) {
    return <Splash loading />;
  }

  if (!enrollment) {
    return <NoEnrollment />;
  }

  if (ticket) {
    return <HasReservedTicket ticket={ticket} getTicket={getTicket} />;
  }

  return <NoTicket getTicket={getTicket} ticketTypes={ticketTypes} />;
}
