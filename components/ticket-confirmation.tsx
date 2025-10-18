"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Download, Mail, Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"
import { Order } from "@/types/order"
import { downloadTicket } from "@/lib/ticket"

export function TicketConfirmation({ data, order }: { data: Record<string, string>, order: Order }) {
  const [showAnimation, setShowAnimation] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    setShowAnimation(true)
  }, [])

  const handleDownload = async (orderNo: string) => {
    setIsDownloading(true)

    try {
      const result = await downloadTicket(orderNo)

      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to download ticket")
      }

      // Convert base64 to blob
      const byteCharacters = atob(result.data)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: result.contentType || 'application/pdf' })

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = result.filename || `Tickets-${orderNo}.pdf`
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download ticket. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Success Animation */}
        <div
          className={`text-center transition-all duration-1000 ${
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-surface border-4 border-neon-magenta mb-6 relative">
            <CheckCircle2 className="w-12 h-12 text-neon-magenta" />
            <div className="absolute inset-0 rounded-full border-4 border-neon-magenta animate-ping opacity-75" />
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold uppercase mb-4 neon-text"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Ticket {data.payment_status}!
          </h1>
          <p className="text-xl text-muted-grey">Your tickets have been successfully booked</p>
        </div>

        {/* Ticket Card */}
        <Card
          className={`bg-surface border-electric-purple/30 overflow-hidden transition-all duration-1000 delay-300 ${
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-neon-magenta via-electric-purple to-electric-blue p-6">
            <h2 className="text-3xl font-bold text-white uppercase" style={{ fontFamily: "var(--font-anton)" }}>
                2ofus - Dream Beyond Borders
            </h2>
          </div>

          <div className="p-8 space-y-6">
            {/* Event Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-neon-magenta mt-1" />
                  <div>
                    <p className="text-muted-grey text-sm uppercase tracking-wider">Date</p>
                    <p className="text-white font-bold">7th November 2025</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-electric-blue mt-1" />
                  <div>
                    <p className="text-muted-grey text-sm uppercase tracking-wider">Time</p>
                    <p className="text-white font-bold">8:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyber-cyan mt-1" />
                  <div>
                    <p className="text-muted-grey text-sm uppercase tracking-wider">Venue</p>
                    <p className="text-white font-bold">
                      Stage 1 Theatre, Petaling Jaya Performing Arts Centre (PJPAC)
                    </p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center bg-background rounded-lg p-6">
                <QRCodeSVG
                  value={`https://dreambeyondborders.com/ticket/${order.id}`}
                  size={180}
                  level="H"
                  includeMargin
                  fgColor="#FF3AF2"
                  bgColor="#0B0B10"
                />
                <p className="text-muted-grey text-xs mt-2 uppercase tracking-wider">Scan at venue entrance</p>
              </div>
            </div>

            {/* Order Details */}
            <div className="border-t border-electric-purple/30 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white uppercase" style={{ fontFamily: "var(--font-anton)" }}>
                  Order Details
                </h3>
                <span className="text-muted-grey text-sm">Order #{order.order_no}</span>
              </div>

              <div className="space-y-3 mb-4">
                {order.tickets && order.tickets.map((ticket) => (
                  <div key={ticket.id} className="flex justify-between items-center bg-background rounded p-3">
                    <div>
                      <p className="text-white font-bold">
                        Seat {ticket.seat!.seat_no} - Section {ticket.seat!.section}
                      </p>
                      <p className="text-muted-grey text-sm">{ticket.seat!.category.category}</p>
                      <p className="text-muted-grey text-xs mt-1">Ticket: {ticket.ticket_no}</p>
                    </div>
                    <p className="text-neon-magenta font-bold">MYR {ticket.seat!.category.price}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-electric-purple/30 pt-4">
                <div className="flex justify-between text-white text-xl font-bold">
                  <span>Total Paid</span>
                  <span className="text-neon-magenta">MYR {Number(order.total_price)}</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            {order && (
              <div className="border-t border-electric-purple/30 pt-6">
                <h3 className="text-xl font-bold text-white uppercase mb-4" style={{ fontFamily: "var(--font-anton)" }}>
                  Ticket Holder
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-grey uppercase tracking-wider mb-1">Name</p>
                    <p className="text-white font-medium">{order.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-muted-grey uppercase tracking-wider mb-1">Email</p>
                    <p className="text-white font-medium">{order.customer_email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button
            onClick={() => handleDownload(order.order_no)}
            disabled={isDownloading}
            className="flex-1 bg-neon-magenta hover:bg-hot-pink text-white font-bold py-6 rounded-lg neon-glow transition-all duration-300 hover:scale-105 uppercase tracking-wide gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isDownloading ? (
              <>
                <Download className="w-5 h-5 animate-pulse" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Ticket
              </>
            )}
          </Button>

          <Button
            onClick={() => {
              // Implement email functionality
              console.log('Email ticket to:', order.customer_email)
            }}
            variant="outline"
            className="flex-1 border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-background font-bold py-6 rounded-lg transition-all duration-300 hover:scale-105 uppercase tracking-wide gap-2 bg-transparent"
          >
            <Mail className="w-5 h-5" />
            Email Ticket
          </Button>
        </div>

        {/* Info Message */}
        <Card className="bg-surface border-electric-purple/30 p-6">
          <h4 className="text-white font-bold mb-2 uppercase text-sm">Important Information</h4>
          <ul className="space-y-2 text-muted-grey text-sm">
            <li>• Please arrive at least 30 minutes before the show starts</li>
            <li>• Bring a valid ID matching the ticket holder name</li>
            <li>• Your QR code will be scanned at the entrance</li>
            <li>• A confirmation email has been sent to {order.customer_email}</li>
          </ul>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-muted-grey hover:text-white uppercase tracking-wide transition-all duration-300"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
