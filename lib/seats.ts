"use server"

const API_URL = process.env.API_URL!;

export async function getSeats()
{
   try {
        const response = await fetch(`${API_URL}/api/seats`, {
            method: "GET",
        });

        if (!response.ok){
            return { success: false, message: "Unable to retrieve the seats. Please try again later"}
        }

        const seats = await response.json()

        return { success: true, response: seats }
   } catch ( error ) {
        console.log(`Error Fetching Seats: ${error}`)
        return { success: false, message: "Failed to Fetch Seats"}
   }
}
