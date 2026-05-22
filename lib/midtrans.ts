import crypto from 'crypto'

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || ''
const MIDTRANS_IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === 'true'
const MIDTRANS_API_URL = MIDTRANS_IS_PRODUCTION
  ? 'https://app.midtrans.com/snap/v1'
  : 'https://app.sandbox.midtrans.com/snap/v1'

interface CreatePaymentParams {
  orderId: string
  amount: number
  customerDetails: {
    first_name: string
    email: string
    phone: string
  }
  itemDetails: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
}

export class MidtransService {
  private static getAuthHeader() {
    const serverKey = MIDTRANS_SERVER_KEY
    const encoded = Buffer.from(serverKey + ':').toString('base64')
    return `Basic ${encoded}`
  }

  // Create payment transaction
  static async createTransaction(params: CreatePaymentParams) {
    const { orderId, amount, customerDetails, itemDetails } = params

    const payload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      customer_details: customerDetails,
      item_details: itemDetails,
      enabled_payments: [
        'qris',
        'gopay',
        'shopeepay',
        'other_qris',
        'bca_va',
        'bni_va',
        'bri_va',
        'permata_va',
      ],
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_APP_URL}/payment/finish`,
        error: `${process.env.NEXT_PUBLIC_APP_URL}/payment/error`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/payment/pending`,
      }
    }

    try {
      const response = await fetch(`${MIDTRANS_API_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthHeader(),
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error_messages?.[0] || 'Midtrans error')
      }

      const data = await response.json()
      return {
        token: data.token,
        redirectUrl: data.redirect_url,
      }
    } catch (error: any) {
      console.error('Midtrans create transaction error:', error)
      throw error
    }
  }

  // Get transaction status
  static async getTransactionStatus(orderId: string) {
    try {
      const response = await fetch(
        `${MIDTRANS_API_URL.replace('/snap/v1', '/v2')}/${orderId}/status`,
        {
          method: 'GET',
          headers: {
            'Authorization': this.getAuthHeader(),
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to get transaction status')
      }

      return await response.json()
    } catch (error: any) {
      console.error('Midtrans get status error:', error)
      throw error
    }
  }

  // Verify notification signature
  static verifySignature(notification: any): boolean {
    const { order_id, status_code, gross_amount, signature_key } = notification
    const serverKey = MIDTRANS_SERVER_KEY

    const hash = crypto
      .createHash('sha512')
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest('hex')

    return hash === signature_key
  }

  // Map Midtrans status to our status
  static mapStatus(transactionStatus: string, fraudStatus?: string): string {
    if (transactionStatus === 'capture') {
      if (fraudStatus === 'accept') {
        return 'SUCCESS'
      } else if (fraudStatus === 'challenge') {
        return 'PENDING'
      }
      return 'FAILED'
    } else if (transactionStatus === 'settlement') {
      return 'SUCCESS'
    } else if (transactionStatus === 'pending') {
      return 'PENDING'
    } else if (
      transactionStatus === 'deny' ||
      transactionStatus === 'expire' ||
      transactionStatus === 'cancel'
    ) {
      if (transactionStatus === 'expire') {
        return 'EXPIRED'
      }
      return 'FAILED'
    }
    return 'PENDING'
  }
}
