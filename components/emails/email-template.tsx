import type React from "react"
import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from "@react-email/components"
import { format, parseISO } from "date-fns"

interface EmailTemplateProps {
  firstName: string
  showTitle: string
  showDate: string
  quantity: string
  venue: string
  isPreview?: boolean
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  showTitle,
  showDate,
  quantity,
  venue,
  isPreview = false,
}) => {
  // const formattedDate = showDate ? format(parseISO(showDate), "MMMM d, yyyy") : "N/A"
  //const formattedTime = showDate ? format(parseISO(showDate), "h:mm a") : ""

  return (
    <Html>
      <Head />
      <Preview>Your tickets from Records On The Wall</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src="https://recordsonthewall.co/rotw-logo-512.jpg"
              width="125"
              height="125"
              alt="Records On The Wall"
              style={logo}
            />
          </Section>

          {isPreview && (
            <Section style={previewWarning}>
              <Text style={previewText}>⚠️ This is a test email from a preview environment</Text>
            </Section>
          )}

          <Section style={content}>
            <Text style={greeting}>Hi, {firstName}</Text>

            <Heading style={heading}>Thanks for your purchase from Records On The Wall!</Heading>

            <Text style={paragraph}>Here are the ticket details to your upcoming show:</Text>

            <Section style={ticketInfo}>
              <Heading as="h2" style={showTitleStyle}>
                {showTitle}
              </Heading>

              <Section style={detailsContainer}>
                <Section style={detailItem}>
                  <Text style={detailLabel}>Venue</Text>
                  <Text style={detailValue}>{venue}</Text>
                </Section>

                <Section style={detailItem}>
                  <Text style={detailLabel}>Date</Text>
                  <Text style={detailValue}>{showDate ? format(parseISO(showDate), 'EEE, MMM d') : 'N/A'}</Text>
                </Section>

                <Section style={detailItem}>
                  <Text style={detailLabel}>Quantity</Text>
                  <Text style={detailValue}>{quantity}</Text>
                </Section>
              </Section>
            </Section>

            <Text style={paragraph}>
              Your tickets will be waiting for you at the venue door under your name. In the event that you need to transfer the tickets to someone else or have a general question, please contact us {" "}
              <Link href="https://recordsonthewall.co" style={{ color: "#1a73e8", textDecoration: "underline" }}>
                here.
              </Link>
            </Text>

            <Text style={paragraph}>We hope you have a great show!</Text>

            <Text style={signature}>— Ticket Team</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>© {new Date().getFullYear()} Records On The Wall. All rights reserved.</Text>
            <Text style={footerText}>
              <Link href="https://recordsonthewall.co" style={footerLink}>
                Visit our website
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: "20px 0",
}

const container = {
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "560px",
}

const header = {
  marginBottom: "32px",
  textAlign: "center" as const,
}

const logo = {
  margin: "0 auto", // Center horizontally
  display: "block", // Ensure block-level for margin auto to work
}

const previewWarning = {
  backgroundColor: "#ffdddd",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ff0000",
  borderRadius: "4px",
}

const previewText = {
  fontSize: "14px",
  color: "#cc0000",
  margin: "0",
  textAlign: "center" as const,
}

const content = {
  padding: "0",
}

const greeting = {
  fontSize: "16px",
  lineHeight: "1.4",
  color: "#444444",
  marginBottom: "8px",
}

const heading = {
  fontSize: "20px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#000000",
  marginTop: "0",
  marginBottom: "24px",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#444444",
  margin: "0 0 24px",
}

const ticketInfo = {
  marginBottom: "24px",
}

const showTitleStyle = {
  fontSize: "20px",
  lineHeight: "1.4",
  fontWeight: "600",
  color: "#000000",
  margin: "0 0 16px",
}

const detailsContainer = {
  display: "flex",
  flexDirection: "column" as const,
}

const detailItem = {
  marginBottom: "14px",
}

const detailLabel = {
  fontSize: "12px",
  lineHeight: "1.4",
  color: "#666666",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "0 0 2px",
}

const detailValue = {
  fontSize: "16px",
  lineHeight: "1.4",
  color: "#000000",
  fontWeight: "500",
  margin: "0",
}

const signature = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#444444",
  fontStyle: "italic",
  margin: "0 0 32px",
}

const footer = {
  borderTop: "1px solid #e6e6e6",
  paddingTop: "24px",
}

const footerText = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#666666",
  margin: "0 0 8px",
  textAlign: "center" as const,
}

const footerLink = {
  color: "#666666",
  textDecoration: "underline",
}
