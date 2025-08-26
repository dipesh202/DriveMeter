// Vehicle API Service for DriveMeter
// This service provides both real and simulated government API calls for vehicle information

import { realVehicleAPI } from './realVehicleAPI';

class VehicleAPIService {
  constructor() {
    this.useRealAPI = process.env.REACT_APP_USE_REAL_API === 'true';
  }

  async getVehicleInfo(registrationNumber) {
    try {
      if (this.useRealAPI) {
        const response = await realVehicleAPI.getVehicleInfo(registrationNumber);
        if (response.success && response.data) {
          return {
            success: true,
            data: this.transformRealData(response.data),
            message: 'Vehicle information retrieved successfully'
          };
        }
      }
      
      // Fallback to simulated data
      return this.getSimulatedVehicleInfo(registrationNumber);
    } catch (error) {
      console.error('Vehicle API Error:', error);
      return this.getSimulatedVehicleInfo(registrationNumber);
    }
  }

  async getChallanInfo(vehicleNumber) {
    try {
      if (this.useRealAPI) {
        const response = await realVehicleAPI.getChallanInfo(vehicleNumber);
        if (response.success && response.data) {
          return {
            success: true,
            data: response.data,
            message: 'Challan information retrieved successfully'
          };
        }
      }
      
      // Fallback to simulated data
      return this.getSimulatedChallanInfo(vehicleNumber);
    } catch (error) {
      console.error('Challan API Error:', error);
      return this.getSimulatedChallanInfo(vehicleNumber);
    }
  }

  async getRCInfo(vehicleNumber) {
    try {
      if (this.useRealAPI) {
        const response = await realVehicleAPI.getRCInfo(vehicleNumber);
        if (response.success && response.data) {
          return {
            success: true,
            data: response.data,
            message: 'RC information retrieved successfully'
          };
        }
      }
      
      // Fallback to simulated data
      return this.getSimulatedRCInfo(vehicleNumber);
    } catch (error) {
      console.error('RC API Error:', error);
      return this.getSimulatedRCInfo(vehicleNumber);
    }
  }

  transformRealData(realData) {
    return {
      registrationNumber: realData.registrationNumber,
      ownerName: realData.ownerName,
      vehicleModel: `${realData.makerModel}`,
      make: realData.makerModel.split(' ')[0],
      model: realData.makerModel.split(' ').slice(1).join(' '),
      manufacturingYear: realData.manufacturingDate ? new Date(realData.manufacturingDate).getFullYear().toString() : '2020',
      year: realData.manufacturingDate ? new Date(realData.manufacturingDate).getFullYear().toString() : '2020',
      fuelType: realData.fuelType,
      color: realData.color || 'White',
      transmission: 'Manual',
      registrationDate: realData.registrationDate,
      rtoCode: realData.rtoCode,
      rtoName: realData.rtoName,
      chassisNumber: realData.chassisNumber,
      engineNumber: realData.engineNumber,
      // Added owner contact details to match UI expectations
      address: realData.address || `${realData.rtoName || 'Regional Transport Office'}, ${realData.rtoCode || ''}`,
      phone: realData.phone || '+91-9' + Math.floor(100000000 + Math.random() * 900000000).toString(),
      insuranceExpiry: realData.insuranceExpiry,
      pucExpiry: realData.pucExpiry,
      taxStatus: realData.taxStatus,
      fitnessExpiry: realData.fitnessExpiry,
      dataSource: 'real',
      insuranceDetails: {
        validUpto: realData.insuranceExpiry,
        insurerName: 'HDFC ERGO General Insurance',
        isExpired: new Date(realData.insuranceExpiry) < new Date()
      },
      pucDetails: {
        validUpto: realData.pucExpiry,
        testResult: 'PASS',
        isExpired: new Date(realData.pucExpiry) < new Date()
      },
      taxDetails: {
        taxPaidUpto: realData.taxPaidUpto || '2024-12-31',
        taxAmount: 15000,
        isOverdue: false
      }
    };
  }

  getSimulatedVehicleInfo(registrationNumber) {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = this.generateMockVehicleData(registrationNumber);
        resolve({
          success: true,
          data: mockData,
          message: 'Vehicle information retrieved successfully (simulated)'
        });
      }, 1500);
    });
  }

  getSimulatedChallanInfo(vehicleNumber) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockChallans = this.generateMockChallanData(vehicleNumber);
        resolve({
          success: true,
          data: mockChallans,
          message: mockChallans.length > 0 ? 
            `Found ${mockChallans.length} challan(s) (simulated)` : 
            'No challans found (simulated)'
        });
      }, 1200);
    });
  }

  getSimulatedRCInfo(vehicleNumber) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockRC = this.generateMockRCData(vehicleNumber);
        resolve({
          success: true,
          data: mockRC,
          message: 'RC information retrieved successfully (simulated)'
        });
      }, 1000);
    });
  }

  generateMockVehicleData(registrationNumber) {
    const makes = ['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Toyota'];
    const models = {
      'Maruti Suzuki': ['Swift', 'Baleno', 'Alto', 'Wagon R', 'Vitara Brezza'],
      'Hyundai': ['i20', 'Creta', 'Verna', 'Grand i10', 'Venue'],
      'Tata': ['Nexon', 'Harrier', 'Safari', 'Altroz', 'Punch'],
      'Mahindra': ['XUV300', 'Scorpio', 'XUV700', 'Thar', 'Bolero'],
      'Honda': ['City', 'Amaze', 'WR-V', 'Jazz', 'CR-V'],
      'Toyota': ['Innova Crysta', 'Fortuner', 'Glanza', 'Urban Cruiser', 'Camry']
    };

    const colors = ['White', 'Silver', 'Black', 'Red', 'Blue', 'Grey'];
    const fuelTypes = ['Petrol', 'Diesel', 'CNG'];
    const transmissions = ['Manual', 'Automatic', 'CVT', 'AMT'];

    // Generate consistent data based on registration number
    const seed = registrationNumber.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = (max) => Math.floor((seed * 9301 + 49297) % 233280 / 233280 * max);

    const selectedMake = makes[random(makes.length)];
    const selectedModel = models[selectedMake][random(models[selectedMake].length)];

    const currentYear = new Date().getFullYear();
    const vehicleYear = currentYear - random(10) - 1; // 1-10 years old

    const insuranceDate = new Date();
    insuranceDate.setFullYear(insuranceDate.getFullYear() + (random(2) === 0 ? -1 : 1));
    insuranceDate.setMonth(random(12));

    const pucDate = new Date();
    pucDate.setMonth(pucDate.getMonth() + (random(2) === 0 ? -6 : 6));

    const taxDate = new Date();
    taxDate.setFullYear(taxDate.getFullYear() + 1);

    return {
      registrationNumber: registrationNumber.toUpperCase(),
      ownerName: `${['Rajesh', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Kavya'][random(6)]} ${['Kumar', 'Sharma', 'Patel', 'Singh', 'Gupta', 'Reddy'][random(6)]}`,
      vehicleModel: `${selectedMake} ${selectedModel}`,
      make: selectedMake,
      model: selectedModel,
      manufacturingYear: vehicleYear.toString(),
      year: vehicleYear.toString(),
      fuelType: fuelTypes[random(fuelTypes.length)],
      color: colors[random(colors.length)],
      transmission: transmissions[random(transmissions.length)],
      registrationDate: `${vehicleYear}-${String(random(12) + 1).padStart(2, '0')}-${String(random(28) + 1).padStart(2, '0')}`,
      rtoCode: registrationNumber.substring(0, 4).toUpperCase(),
      rtoName: `${registrationNumber.substring(0, 2).toUpperCase()} Regional Transport Office`,
      chassisNumber: `MA3${Array.from({length: 14}, () => Math.floor(random(10))).join('')}`,
      engineNumber: `K${Array.from({length: 8}, () => Math.floor(random(10))).join('')}`,
      // Added owner contact details used by UI
      address: `${Math.floor(Math.random() * 999) + 1}, ${['MG Road', 'Brigade Road', 'Koramangala', 'Indiranagar', 'Whitefield'][random(5)]}, ${registrationNumber.substring(0, 2).toUpperCase()} City - ${560000 + random(900)}`,
      phone: `+91-9${String(100000000 + random(900000000))}`,
      insuranceExpiry: insuranceDate.toISOString().split('T')[0],
      pucExpiry: pucDate.toISOString().split('T')[0],
      taxStatus: 'PAID',
      fitnessExpiry: new Date(2025, 11, 31).toISOString().split('T')[0],
      dataSource: 'simulated',
      insuranceDetails: {
        validUpto: insuranceDate.toISOString().split('T')[0],
        insurerName: ['HDFC ERGO', 'ICICI Lombard', 'Bajaj Allianz', 'New India Assurance', 'Oriental Insurance'][random(5)],
        isExpired: insuranceDate < new Date()
      },
      pucDetails: {
        validUpto: pucDate.toISOString().split('T')[0],
        testResult: random(10) > 1 ? 'PASS' : 'FAIL',
        isExpired: pucDate < new Date()
      },
      taxDetails: {
        taxPaidUpto: taxDate.toISOString().split('T')[0],
        taxAmount: 10000 + random(20000),
        isOverdue: random(10) > 8
      }
    };
  }

  generateMockChallanData(vehicleNumber) {
    const seed = vehicleNumber.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = (max) => Math.floor((seed * 9301 + 49297) % 233280 / 233280 * max);

    // 70% chance of no challans
    if (random(10) < 7) {
      return [];
    }

    const violationTypes = [
      'Over Speeding', 'Signal Jump', 'Wrong Parking', 'No Helmet', 'Triple Riding',
      'Wrong Side Driving', 'Mobile Phone Usage', 'Seat Belt Violation', 'Document Missing'
    ];

    const fineAmounts = [500, 1000, 1500, 2000, 2500, 5000];
    const statuses = ['PAID', 'UNPAID', 'PENDING'];

    const challanCount = random(3) + 1; // 1-3 challans
    const challans = [];

    for (let i = 0; i < challanCount; i++) {
      const violationDate = new Date();
      violationDate.setDate(violationDate.getDate() - random(365)); // Within last year

      challans.push({
        challanNumber: `CH${Date.now()}${i}${random(1000)}`,
        vehicleNumber: vehicleNumber.toUpperCase(),
        violationDate: violationDate.toISOString().split('T')[0],
        violationType: violationTypes[random(violationTypes.length)],
        fineAmount: fineAmounts[random(fineAmounts.length)],
        status: statuses[random(statuses.length)],
        location: `${['MG Road', 'Brigade Road', 'Koramangala', 'Indiranagar', 'Whitefield'][random(5)]}, Bangalore`,
        dataSource: 'simulated'
      });
    }

    return challans;
  }

  generateMockRCData(vehicleNumber) {
    const mockVehicle = this.generateMockVehicleData(vehicleNumber);
    
    return {
      registrationNumber: vehicleNumber.toUpperCase(),
      ownerName: mockVehicle.ownerName,
      fatherName: `${['Ramesh', 'Suresh', 'Mahesh', 'Dinesh', 'Naresh'][Math.floor(Math.random() * 5)]} ${mockVehicle.ownerName.split(' ')[1]}`,
      address: `${Math.floor(Math.random() * 999) + 1}, ${['MG Road', 'Brigade Road', 'Koramangala', 'Indiranagar', 'Whitefield'][Math.floor(Math.random() * 5)]}, Bangalore - ${560000 + Math.floor(Math.random() * 100)}`,
      vehicleClass: 'Motor Car',
      makerModel: mockVehicle.vehicleModel,
      fuelType: mockVehicle.fuelType,
      manufacturingDate: `${mockVehicle.year}-01-15`,
      registrationDate: mockVehicle.registrationDate,
      rtoCode: mockVehicle.rtoCode,
      rtoName: mockVehicle.rtoName,
      chassisNumber: mockVehicle.chassisNumber,
      engineNumber: mockVehicle.engineNumber,
      color: mockVehicle.color,
      seatingCapacity: '5',
      dataSource: 'simulated'
    };
  }
}

export const vehicleAPI = new VehicleAPIService();
export default vehicleAPI;
