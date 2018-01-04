## Node addon for hardware MPU9250 sensor

##### This addon should work on any Linux platform, and has been thoroughly tested on BBB

### Install

```
npm install @agilatech/mpu9250
```
OR
```
git clone https://github.com/Agilatech/mpu9250.git
node-gyp configure build
```

### Usage


##### Load the module and create an instance
```
const addon = require('@agilatech/mpu9250');

// create an instance on the /dev/i2c-2 bus device file
const mpu9250 = new addon.Mpu8250('/dev/i2c-2');
```


##### Get basic device info
```
const name = mpu9250.deviceName();  // returns string with name of device
const type = mpu9250.deviceType();  // returns string with type of device
const version = mpu9250.deviceVersion(); // returns this software version
const active = mpu9250.deviceActive(); // true if active, false if inactive
const numVals =  mpu9250.deviceNumValues(); // returns the number of paramters sensed
```


#### Get parameter info and values
```
const paramName0 = mpu9250.nameAtIndex(0);
const paramType0 = mpu9250.typeAtIndex(0);
const paramVal0  = mpu9250.valueAtIndexSync(0);
// ...
const paramName8 = mpu9250.nameAtIndex(8);
const paramType8 = mpu9250.typeAtIndex(8);
const paramVal8  = mpu9250.valueAtIndexSync(8);
```
#### Asynchronous value collection is also available
```
mpu9250.valueAtIndex(0, function(err, val) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Asynchronous call return: ${val}`);
    }
});
```

### Operation Notes
This is a good example of wrapping the core functionality of an existing module to match the expeced API of the VersaLink device driver.  All the real work is the mpu9250 module, and this module just tweaks things a bit to make them work for the end use.


### Dependencies
* mpu9250


### Copyright
Copyright © 2018 [Agilatech®](https://agilatech.com). All Rights Reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

