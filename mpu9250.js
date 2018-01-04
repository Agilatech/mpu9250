const mpu9250 = require('mpu9250');

module.exports = class Mpu9250 {

  constructor(bus, addr, rate) {

    this.name = "MPU9250";
    this.type = "accelerometer";
    this.bus  = bus  || '/dev/i2c-2';
    this.addr = addr || 0x68;

    // We are periodically just loading all values so that they will all be
    // available whenever a particular value index is requested.
    // The rate then is the period in which all 9 values are requested from
    // the mpu.  A reasonable default is 1/2 second.
    this.rate = rate || 500;
    
    this.valueNames  = ["accelx", "accely", "accelz", "gyrox", "gyroy", "gyroz", "magx", "magy", "magz"];
    this.valueTypes  = ["integer", "integer", "integer", "integer", "integer", "integer", "integer", "integer", "integer"];
    
    // Instantiate and initialize the unit
    this.mpu = new mpu9250({
      device: this.bus,
      address: this.addr,

      // Enable/Disable magnetometer data (default false) 
      UpMagneto: true,

      // If true, all values returned will be scaled to actual units (default false). 
      // If false, the raw values from the device will be returned. 
      scaleValues: false,

      // Enable/Disable debug mode (default false) 
      DEBUG: false,

      // ak8963 (magnetometer / compass) address (default is 0x0C) 
      ak_address: 0x0C,

      // Set the Gyroscope sensitivity (default 0), where: 
      //      0 => 250 degrees / second 
      //      1 => 500 degrees / second 
      //      2 => 1000 degrees / second 
      //      3 => 2000 degrees / second 
      GYRO_FS: 0,

      // Set the Accelerometer sensitivity (default 2), where: 
      //      0 => +/- 2 g 
      //      1 => +/- 4 g 
      //      2 => +/- 8 g 
      //      3 => +/- 16 g 
      ACCEL_FS: 2

    });

    this.callbacks   = [];
    
    if (this.mpu.initialize()) {
      this.values = this.mpu.getMotion9();
      this.active = true;
      this.getAllValuesPeriodically();
    }
    else {
      this.active = false;
    }

  }

  // We want to just load all the values at once so that various get commands are not
  // being called individually whenever a particular value index is requested.
  getAllValuesPeriodically() {
    const self = this;
    setInterval(function() {
      self.values = self.mpu.getMotion9();
      console.log(self.values);
    }, this.rate);
  }

  deviceName() {
    return this.name;
  }

  deviceType() {
    return this.type;
  }

  deviceVersion() {
    return "1.0.0";
  }

  deviceNumValues() {
    return this.valueNames.length;
  }

  typeAtIndex(index) {
    if ((index < 0) || (index > this.valueTypes.length)) {
      return "none";
    }
    else {
      return this.valueTypes[index];
    }
  }

  nameAtIndex(index) {
    if ((index < 0) || (index > this.valueNames.length)) {
      return "none";
      }
      else {
      return this.valueNames[index];
    }
  }
    
  deviceActive() {
    return this.active;
  }
    
  valueAtIndexSync(index) {
    if ((index < 0) || (index > this.values.length)) {
      return "none";
    }
    else {
      return this.values[index];
    }
  }
    
  valueAtIndex(index, callback) {
    var err = null;
    var val = 0;
  
    if ((index < 0) || (index > this.values.length)) {
      err = "Value Index Out Of Range";
    }
    else {
      val = this.values[index];
    }
  
    callback(err, val);
  }

  watchValueAtIndex(index, callback) {
    this.callbacks[index] = callback;
  }

}

