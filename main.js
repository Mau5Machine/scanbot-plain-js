const results = [];
let barcodeScanner, scanbotSDK;

window.onload = async () => {
  Utils.getElementByClassName('barcode-scanner-button').onclick = async () => {
    const barcodeFormats = ['PDF_417', 'QR_CODE'];
    const config = {
      containerId: Config.barcodeScannerContainerId(),
      barcodeFormats: barcodeFormats,
      onBarcodesDetected: onBarcodesDetected,
      onError: onScannerError,
    };

    try {
      barcodeScanner = await scanbotSDK.createBarcodeScanner(config);
    } catch (e) {
      console.log(e.name + ': ' + e.message);
      alert(e.name + ': ' + e.message);
      Utils.getElementByClassName('barcode-scanner-controller').style.display =
        'none';
    }
  };

  // Initializing Scanbot instance.
  scanbotSDK = await ScanbotSDK.initialize({ licenseKey: Config.license() });
};

// Function to control what happens with barcode content when detected.
async function onBarcodesDetected(e) {
  console.log('detected');
  let text = '';
  e.barcodes.forEach((barcode) => {
    text += ' ' + barcode.text + ' (' + barcode.format + '),';
  });
  console.log(text);
}

// Function to handle error when using barcode scanner.
async function onScannerError(e) {
  console.log('Error:', e);
}
