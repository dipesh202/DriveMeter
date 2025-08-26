// InstantPay API Integration for Real Indian Government Vehicle Data
// This service provides direct access to Vahan database, e-Challan, and other official sources

class InstantPayService {
  constructor() {
    this.config = {
      apiKey: process.env.REACT_APP_INSTANTPAY_API_KEY || '',
      accountId: process.env.REACT_APP_INSTANTPAY_ACCOUNT_ID || '',
      baseUrl: process.env.REACT_APP_INSTANTPAY_BASE_URL || 'https://api.instantpay.in',
      timeout: 30000
    };
  }

  async makeAPIRequest(endpoint, payload) {
    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this.config.apiKey,
          'X-ACCOUNT-ID': this.config.accountId
        },
        body: JSON.stringify(payload),
        timeout: this.config.timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('InstantPay API Error:', error);
      throw error;
    }
  }

  async getVahanInfo(registrationNumber) {
    try {
      const payload = {
        number: registrationNumber.replace(/\s+/g, '').toUpperCase(),
        consent: 'Y',
        consent_text: 'I hereby declare my consent agreement for fetching my information via VAHAN'
      };

      const response = await this.makeAPIRequest('/v1/vahan_rc', payload);

      if (response.status && response.data) {
        return {
          success: true,
          data: response.data,
          message: response.message || 'Vehicle information retrieved successfully',
          txnId: response.txn_id
        };
      } else {
        return {
          success: false,
          data: null,
          message: response.message || 'Failed to retrieve vehicle information',
          txnId: response.txn_id
        };
      }
    } catch (error) {
      console.error('Vahan API Error:', error);
      return {
        success: false,
        data: null,
        message: 'API request failed: ' + error.message,
        txnId: null
      };
    }
  }

  async getEChallanInfo(vehicleNumber) {
    try {
      const payload = {
        vehicle_number: vehicleNumber.replace(/\s+/g, '').toUpperCase(),
        consent: 'Y',
        consent_text: 'I hereby declare my consent agreement for fetching my information via e-Challan'
      };

      const response = await this.makeAPIRequest('/v1/echallan', payload);

      if (response.status && response.data) {
        return {
          success: true,
          data: Array.isArray(response.data) ? response.data : [response.data],
          message: response.message || 'Challan information retrieved successfully',
          txnId: response.txn_id
        };
      } else {
        return {
          success: false,
          data: [],
          message: response.message || 'No challans found or API error',
          txnId: response.txn_id
        };
      }
    } catch (error) {
      console.error('e-Challan API Error:', error);
      return {
        success: false,
        data: [],
        message: 'API request failed: ' + error.message,
        txnId: null
      };
    }
  }

  async verifyRC(vehicleNumber) {
    try {
      const payload = {
        vehicle_number: vehicleNumber.replace(/\s+/g, '').toUpperCase(),
        consent: 'Y',
        consent_text: 'I hereby declare my consent agreement for fetching my information via RC verification'
      };

      const response = await this.makeAPIRequest('/v1/rc_verification', payload);

      if (response.status && response.data) {
        return {
          success: true,
          data: response.data,
          message: response.message || 'RC verification completed successfully',
          txnId: response.txn_id
        };
      } else {
        return {
          success: false,
          data: null,
          message: response.message || 'RC verification failed',
          txnId: response.txn_id
        };
      }
    } catch (error) {
      console.error('RC Verification API Error:', error);
      return {
        success: false,
        data: null,
        message: 'API request failed: ' + error.message,
        txnId: null
      };
    }
  }

  async getFastag(vehicleNumber) {
    try {
      const payload = {
        vehicle_number: vehicleNumber.replace(/\s+/g, '').toUpperCase(),
        consent: 'Y'
      };

      const response = await this.makeAPIRequest('/v1/fastag', payload);

      if (response.status && response.data) {
        return {
          success: true,
          data: response.data,
          message: response.message || 'FASTag information retrieved successfully',
          txnId: response.txn_id
        };
      } else {
        return {
          success: false,
          data: null,
          message: response.message || 'FASTag information not found',
          txnId: response.txn_id
        };
      }
    } catch (error) {
      console.error('FASTag API Error:', error);
      return {
        success: false,
        data: null,
        message: 'API request failed: ' + error.message,
        txnId: null
      };
    }
  }

  async getDrivingLicense(licenseNumber, dateOfBirth) {
    try {
      const payload = {
        license_number: licenseNumber.replace(/\s+/g, '').toUpperCase(),
        date_of_birth: dateOfBirth, // Format: YYYY-MM-DD
        consent: 'Y',
        consent_text: 'I hereby declare my consent agreement for fetching my information via Driving License verification'
      };

      const response = await this.makeAPIRequest('/v1/driving_license', payload);

      if (response.status && response.data) {
        return {
          success: true,
          data: response.data,
          message: response.message || 'Driving license information retrieved successfully',
          txnId: response.txn_id
        };
      } else {
        return {
          success: false,
          data: null,
          message: response.message || 'Driving license verification failed',
          txnId: response.txn_id
        };
      }
    } catch (error) {
      console.error('Driving License API Error:', error);
      return {
        success: false,
        data: null,
        message: 'API request failed: ' + error.message,
        txnId: null
      };
    }
  }

  // Utility method to check API balance
  async checkBalance() {
    try {
      const response = await this.makeAPIRequest('/v1/balance', {});

      if (response.status) {
        return {
          success: true,
          balance: response.data.balance,
          message: 'Balance retrieved successfully'
        };
      } else {
        return {
          success: false,
          balance: 0,
          message: response.message || 'Failed to retrieve balance'
        };
      }
    } catch (error) {
      console.error('Balance Check Error:', error);
      return {
        success: false,
        balance: 0,
        message: 'API request failed: ' + error.message
      };
    }
  }

  // Utility method to get transaction status
  async getTransactionStatus(txnId) {
    try {
      const payload = { txn_id: txnId };
      const response = await this.makeAPIRequest('/v1/transaction_status', payload);

      return {
        success: response.status,
        data: response.data,
        message: response.message || 'Transaction status retrieved'
      };
    } catch (error) {
      console.error('Transaction Status Error:', error);
      return {
        success: false,
        data: null,
        message: 'Failed to get transaction status'
      };
    }
  }
}

export const instantPayService = new InstantPayService();
export default instantPayService;
