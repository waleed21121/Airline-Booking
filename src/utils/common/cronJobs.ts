import { schedule } from "node-cron";
import { BookingService } from '../../services'

export default function scheduleCron () {
    schedule('*/5 * * * * *', async () => {
        const bookings = await BookingService.cancelOldBookings();
    })
}