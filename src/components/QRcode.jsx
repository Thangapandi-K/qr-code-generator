import { useState } from "react";
import Button from "./Button.jsx";
import "./QRcode.css";

const QRcode = () => {

    const [qrImg, setQrImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQRData] = useState("example");
    const [qrSize, setQRSize] = useState(400);
    
    const generateQR = async() => {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;

            setQrImg(url);

        } catch (error) {
            console.log("Error loading QR Image", error.message);
        } finally {
            
            setLoading(false);

        }
    };

    const downloadQR = () => {
        fetch(qrImg)
        .then(response => response.blob())
        .then((blob) => {
            console.log(blob)
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => {
            console.log("Error downloading QR Image", error.message);
        })
    };

  return (
    <div className="container">
      <header>
        <h1>QR Code Generator</h1>
      </header>
      {loading && <p>Please wait...</p>}
      {qrImg && <img src={qrImg} alt="QRimage" className="QRimage" />}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR Code :
        </label>
        <input
          type="text"
          id="dataInput"
          placeholder="Enter data for QR code"
          onChange={(e) => setQRData(e.target.value)}
        />

        <label htmlFor="sizeInput" className="input-label">
          Image Size (e.g., 200) :
        </label>
        <input 
            type="number" 
            id="sizeInput" 
            placeholder="Enter size"
            onChange={(e) => setQRSize(e.target.value)}
        />

        <Button classText="generate-button" btnText='Generate QR Code' handleClick={generateQR} isDisabled={loading}/>
        <Button classText="download-button" btnText="Download QR Code" handleClick={downloadQR}/>
      </div>
      <footer>Design by Thangapandi K</footer>
    </div>
  );
};

export default QRcode;
