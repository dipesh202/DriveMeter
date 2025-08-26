// Real Vehicle API Service for DriveMeter with FREE API Integration
// This service integrates with free APIs and fallback to paid APIs for vehicle information

import { instantPayService } from './instantPayAPI';
import { freeVehicleAPI } from './freeVehicleAPI';

class RealVehicleAPIService {
  constructor() {
    this.useRealAPI = process.env.REACT_APP_USE_REAL_VEHICLE_API === 'true';
    this.useFreeAPI = process.env.REACT_APP_USE_FREE_API === 'true';
  }

  async getVehicleInfo(registrationNumber) {
    try {
      console.log(`Fetching vehicle info for: ${registrationNumber}`);
      
      // Try free API first if enabled
      if (this.useFreeAPI) {
        try {
          const freeResult = await freeVehicleAPI.getVehicleInfo(registrationNumber);
          if (freeResult.success && freeResult.data) {
            return {
              success: true,
              data: this.transformFreeAPIData(freeResult.data, registrationNumber),
              message: 'Vehicle information retrieved from free API'
            };
          }
        } catch (freeError) {
          console.log('Free API failed, trying paid API:', freeError.message);
        }
      }

      // Try paid API if real API is enabled
      if (this.useRealAPI) {
        try {
          const paidResult = await instantPayService.getVahanInfo(registrationNumber);
          if (paidResult.success && paidResult.data) {
            return {
              success: true,
              data: this.transformPaidAPIData(paidResult.data, registrationNumber),
              message: 'Vehicle information retrieved from paid API'
            };
          }
        } catch (paidError) {
          console.log('Paid API failed:', paidError.message);
        }
      }

      // Fallback to simulated data
      return {
        success: false,
        message: 'Real APIs unavailable, using simulated data',
        data: null
      };

    } catch (error) {
      console.error('Real Vehicle API Error:', error);
      return {
        success: false,
        message: 'Failed to fetch vehicle information',
        data: null
      };
    }
  }

  async getChallanInfo(vehicleNumber) {
    try {
      console.log(`Fetching challan info for: ${vehicleNumber}`);

      // Try free API first
      if (this.useFreeAPI) {
        try {
          const freeResult = await freeVehicleAPI.getChallanInfo(vehicleNumber);
          if (freeResult.success && freeResult.data) {
            return {
              success: true,
              data: freeResult.data.map(challan => ({
                ...challan,
                dataSource: 'free_api'
              })),
              message: 'Challan information retrieved from free API'
            };
          }
        } catch (freeError) {
          console.log('Free API challan failed:', freeError.message);
        }
      }

      // Try paid API
      if (this.useRealAPI) {
        try {
          const paidResult = await instantPayService.getEChallanInfo(vehicleNumber);
          if (paidResult.success && paidResult.data) {
            return {
              success: true,
              data: this.transformChallanData(paidResult.data),
              message: 'Challan information retrieved from paid API'
            };
          }
        } catch (paidError) {
          console.log('Paid API challan failed:', paidError.message);
        }
      }

      return {
        success: false,
        message: 'Real APIs unavailable for challan data',
        data: []
      };

    } catch (error) {
      console.error('Challan API Error:', error);
      return {
        success: false,
        message: 'Failed to fetch challan information',
        data: []
      };
    }
  }

  async getRCInfo(vehicleNumber) {
    try {
      console.log(`Fetching RC info for: ${vehicleNumber}`);

      // Try paid API for RC verification
      if (this.useRealAPI) {
        try {
          const paidResult = await instantPayService.verifyRC(vehicleNumber);
          if (paidResult.success && paidResult.data) {
            return {
              success: true,
              data: this.transformRCData(paidResult.data, vehicleNumber),
              message: 'RC information retrieved from paid API'
            };
          }
        } catch (paidError) {
          console.log('Paid API RC failed:', paidError.message);
        }
      }

      return {
        success: false,
        message: 'Real APIs unavailable for RC data',
        data: null
      };

    } catch (error) {
      console.error('RC API Error:', error);
      return {
        success: false,
        message: 'Failed to fetch RC information',
        data: null
      };
    }
  }

  transformFreeAPIData(freeData, registrationNumber) {
    return {
      registrationNumber: registrationNumber.toUpperCase(),
      ownerName: freeData.owner_name || 'N/A',
      fatherName: freeData.father_name || 'N/A',
      address: freeData.address || 'N/A',
      vehicleClass: freeData.vehicle_class || 'Motor Car',
      makerModel: freeData.maker_model || 'N/A',
      fuelType: freeData.fuel_type || 'Petrol',
      manufacturingDate: freeData.manufacturing_date || '2020-01-01',
      registrationDate: freeData.registration_date || '2020-01-01',
      chassisNumber: freeData.chassis_number || 'N/A',
      engineNumber: freeData.engine_number || 'N/A',
      rtoCode: freeData.rto_code || registrationNumber.substring(0, 4),
      rtoName: freeData.rto_name || 'Regional Transport Office',
      insuranceValidity: freeData.insurance_validity || '2024-12-31',
      pucValidity: freeData.puc_validity || '2024-06-30',
      taxValidity: freeData.tax_validity || '2024-12-31',
      fitnessValidity: freeData.fitness_validity,
      dataSource: 'free_api'
    };
  }

  transformPaidAPIData(paidData, registrationNumber) {
    return {
      registrationNumber: registrationNumber.toUpperCase(),
      ownerName: paidData.owner_name || 'N/A',
      fatherName: paidData.father_name || 'N/A',
      address: paidData.permanent_address || 'N/A',
      vehicleClass: paidData.vehicle_class_desc || 'Motor Car',
      makerModel: paidData.maker_model || 'N/A',
      fuelType: paidData.fuel_type || 'Petrol',
      manufacturingDate: paidData.manufacturing_date || '2020-01-01',
      registrationDate: paidData.registration_date || '2020-01-01',
      chassisNumber: paidData.chassis_number || 'N/A',
      engineNumber: paidData.engine_number || 'N/A',
      rtoCode: paidData.rto_code || registrationNumber.substring(0, 4),
      rtoName: paidData.rto_name || 'Regional Transport Office',
      insuranceValidity: paidData.insurance_upto || '2024-12-31',
      pucValidity: paidData.puc_upto || '2024-06-30',
      taxValidity: paidData.tax_upto || '2024-12-31',
      fitnessValidity: paidData.fitness_upto,
      dataSource: 'paid_api'
    };
  }

  transformChallanData(challanData) {
    if (!Array.isArray(challanData)) {
      return [];
    }

    return challanData.map(challan => ({
      challanNumber: challan.challan_number || `CH${Date.now()}`,
      vehicleNumber: challan.vehicle_number || 'N/A',
      violationDate: challan.violation_date || new Date().toISOString().split('T')[0],
      violationType: challan.violation_type || 'Traffic Violation',
      fineAmount: challan.fine_amount || 500,
      status: challan.status || 'UNPAID',
      location: challan.location || 'N/A',
      dataSource: 'paid_api'
    }));
  }

  transformRCData(rcData, vehicleNumber) {
    return {
      registrationNumber: vehicleNumber.toUpperCase(),
      ownerName: rcData.owner_name || 'N/A',
      vehicleClass: rcData.vehicle_class || 'Motor Car',
      makerModel: rcData.maker_model || 'N/A',
      manufacturingDate: rcData.manufacturing_date || '2020-01-01',
      registrationDate: rcData.registration_date || '2020-01-01',
      chassisNumber: rcData.chassis_number || 'N/A',
      engineNumber: rcData.engine_number || 'N/A',
      rtoName: rcData.rto_name || 'Regional Transport Office',
      fitnessUpto: rcData.fitness_upto,
      dataSource: 'paid_api'
    };
  }
}

export const realVehicleAPI = new RealVehicleAPIService();
export default realVehicleAPI;
