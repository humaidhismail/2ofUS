import { TicketConfirmation } from "@/components/ticket-confirmation"
import { verifyPayment } from "@/lib/payment"

export default async function ConfirmationPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }>}) {
    const transactionId = (await searchParams).transactionId
    if (!transactionId) {
        return null
    }
    const verification = await verifyPayment(transactionId)

    return (
        <main className="min-h-screen bg-background">
         <TicketConfirmation paymentStatus={verification.data}/>
        </main>
    )
}
