import axios from 'axios'

export async function fetchDashboardData() {
    try {
        const hotelData = await axios.get("https://interview-booking-api.herokuapp.com/api/booking-snapshot");
        return hotelData;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchBookingData() {
    try {
        const bookings = await axios.get("https://interview-booking-api.herokuapp.com/api/bookings");
       return bookings;
    } catch (error) {
        console.error(error);
    }
}
