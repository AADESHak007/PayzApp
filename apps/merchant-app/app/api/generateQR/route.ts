import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(req: NextRequest) {
  const url = "https://netbanking.hdfcbank.com/netbanking/"; // Replace 
  try {
    const qrCodeUrl = await QRCode.toDataURL(url);
    return NextResponse.json({ qrCodeUrl });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 });
  }
}