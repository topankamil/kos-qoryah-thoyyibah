export function formatWhatsAppMessage(roomName?: string): string {
  const baseMessage = "Halo, saya tertarik dengan Kost Kost Ibu Wawan.";
  
  if (roomName) {
    return `${baseMessage} Saya ingin tanya tentang ${roomName}.`;
  }
  
  return `${baseMessage} Mohon info lebih lanjut.`;
}

export function getWhatsAppLink(phone: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
}
